import { env } from "../config/env.js";
import User from "../models/userModel.js";
import Settings from "../models/settingsModel.js";
import type { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "./asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import type { CurrentUserType } from "../types/user.js";
import type { CurrentUserSettingsType } from "../types/settings.js";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_EMAIL_API_KEY);

const createSuccessResponse = (
    user: CurrentUserType,
    statusCode: number,
    res: Response,
    message: string,
    userSettings?: CurrentUserSettingsType,
) => {
    const userObject = user.toObject();

    const {
        password,
        confirmPassword,
        passwordResetToken,
        passwordChangedAt,
        passwordResetTokenExpires,
        ...userWithoutSensitiveData
    } = userObject;

    res.status(statusCode).json({
        status: "success",
        message,
        data: {
            user: userWithoutSensitiveData,
        },
    });
};

const editUserData = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const currentUser = req.user;

        if (!currentUser) {
            throw new CustomError(
                "User not found, please login to continue",
                401,
            );
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: currentUser._id },
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            },
        );

        if (!updatedUser) {
            throw new CustomError(
                `User ${currentUser.firstName} does not exist in the database`,
                404,
            );
        }

        const userSettings = await Settings.findOne({
            userId: updatedUser._id,
        });

        if (!userSettings) {
            next(new CustomError("user settings not found", 404));
            return;
        }

        const { error } = await resend.emails.send({
            from: "fundar <onboarding@resend.dev>",
            to: [`${updatedUser.email}`],
            subject: "Profile Update",
            html: ` <section className="p-6">
                        <h1>Password change request</h1>
                        <hr />
                        <br />
                        <p>Hello, ${updatedUser.firstName}</p>
                        <p>You recently updated your profile information</p>
                        <br />
                        <hr />
                        <p>if this updated was not initiated by you, then please contact support.fundar.com<p>
                        </section>`,
        });

        createSuccessResponse(
            updatedUser,
            200,
            res,
            "User details updated successfully",
            userSettings,
        );

        if (error) {
            throw new CustomError("Failed to send email to user email", 500);
        }
    },
);

const deleteUserAccount = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const currentUser = req.user;

        if (!currentUser) {
            throw new CustomError(
                "User not found, please login to continue",
                401,
            );
        }

        const userAccount = await User.findOneAndDelete({
            _id: currentUser._id,
        });

        if (!userAccount) {
            throw new CustomError(
                `User ${currentUser.firstName} does not exist in the database`,
                404,
            );
        }

        createSuccessResponse(userAccount, 200, res, "User Account Deleted");
    },
);

export { editUserData, deleteUserAccount };
