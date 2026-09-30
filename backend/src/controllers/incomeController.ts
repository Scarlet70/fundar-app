import asyncErrorHandler from "./asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import type { Request, Response, NextFunction } from "express";
import Income from "../models/incomeModel.js";
import type { IncomeType } from "../types/income.js";

const createSuccessResponse = (
    statusCode: number,
    res: Response,
    message: string,
    income?: IncomeType,
) => {
    res.status(statusCode).json({
        status: "success",
        message,
        data: {
            income,
        },
    });
};

const getIncomesByUser = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            const error = new CustomError("Please log in to continue", 401);
            return next(error);
        }

        const incomesByUser = await Income.find({ userId: req.user._id });

        res.status(200).json({
            status: "success",
            count: incomesByUser.length,
            data: {
                incomes: incomesByUser,
            },
        });
    },
);

const createNewIncome = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            const error = new CustomError("You're not logged in", 401);
            return next(error);
        }

        const newIncome = await Income.create({
            ...req.body,
            userId: req.user._id,
        });

        createSuccessResponse(
            201,
            res,
            `${newIncome.source} created Successfully`,
            newIncome,
        );
    },
);

const updateIncome = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if (!id) {
            const error = new CustomError("No Income ID found", 404);
            return next(error);
        }

        if (!req.user) {
            const error = new CustomError("You're not logged in", 401);
            return next(error);
        }

        const income = await Income.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            },
        );

        if (!income) {
            return next(new CustomError("Income not Found", 404));
        }

        createSuccessResponse(
            200,
            res,
            `Income ${income.source} updated Successfully`,
            income,
        );
    },
);

const deleteIncome = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new CustomError("Please login to continue", 401));
        }
        const { id } = req.params;

        if (!id) {
            const error = new CustomError("No Income ID found", 404);
            return next(error);
        }

        const income = await Income.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if (!income) {
            return next(new CustomError("No income to delete", 404));
        }

        createSuccessResponse(
            200,
            res,
            `Income ${income.source} deleted Successfully`,
        );
    },
);

//FOR ADMINS ONLY

const bulkCreateIncomes = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new CustomError("Please login to continue", 401);
        }

        if (!Array.isArray(req.body)) {
            throw new CustomError("Incomes must be an array", 400);
        }

        const incomes = [...req.body];

        if (incomes.length === 0) {
            throw new CustomError("Please provide at least one income", 400);
        }

        const incomeDocuments = incomes.map((income: IncomeType) => ({
            ...income,
            userId: req.user!._id,
        }));

        const createdIncomes = await Income.insertMany(incomeDocuments);

        res.status(200).json({
            status: "success",
            message: `${createdIncomes.length} incomes created successfully`,
            data: {
                incomes: createdIncomes,
            },
        });
    },
);

export {
    getIncomesByUser,
    createNewIncome,
    updateIncome,
    deleteIncome,
    bulkCreateIncomes,
};
