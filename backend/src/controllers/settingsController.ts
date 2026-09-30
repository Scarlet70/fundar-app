import asyncErrorHandler from "./asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import type { Request, Response, NextFunction } from "express";
import Settings from "../models/settingsModel.js";
import mongoose from "mongoose";

const updateUserCurrencySettings = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new CustomError("Please login to continue", 401);
        }

        const { baseCurrency } = req.body;

        const updatedSettings = await Settings.findOneAndUpdate(
            { userId: req.user._id },
            { $set: { baseCurrency } },
            {
                returnDocument: "after",
                runValidators: true,
            },
        );

        res.status(200).json({
            status: "success",
            message: "Currency settings updated Successfully",
            data: {
                user: req.user,
                settings: updatedSettings,
            },
        });
    },
);

const updateUserDefaultAllocations = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new CustomError("Please login to continue", 401);
        }

        const updatedSettings = await Settings.findOneAndUpdate(
            { userId: req.user._id },
            {
                $push: {
                    defaultAllocations: req.body,
                },
            },
            { returnDocument: "after", runValidators: true },
        );

        res.status(200).json({
            status: "success",
            message: "User allocations have been succesfully updated",
            data: {
                user: req.user,
                settings: updatedSettings,
                payload: req.params.id,
            },
        });
    },
);

const deleteDefaultAllocation = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new CustomError("Please login to continue", 401);
        }

        const { id } = req.params;

        if (typeof id !== "string") {
            throw new CustomError("Invalid allocation ID", 400);
        }

        const allocationId = new mongoose.Types.ObjectId(id);

        const updatedSettings = await Settings.findOneAndUpdate(
            { userId: req.user._id },
            {
                $pull: {
                    defaultAllocations: {
                        _id: allocationId,
                    },
                },
            },
            {
                returnDocument: "after",
            },
        );

        if (!updatedSettings) {
            throw new CustomError("Could not update user settings", 404);
        }

        res.status(200).json({
            status: "success",
            message: "User allocations have been succesfully updated",
            data: {
                user: req.user,
                settings: updatedSettings,
            },
        });
    },
);

export {
    updateUserCurrencySettings,
    updateUserDefaultAllocations,
    deleteDefaultAllocation,
};
