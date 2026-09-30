import { env } from "../config/env.js";
import User from "../models/userModel.js";
import Settings from "../models/settingsModel.js";
import type { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "./asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import type { CurrentUserType } from "../types/user.js";
import type { CurrentUserSettingsType } from "../types/settings.js";
import { signAccessToken, signRefreshToken } from "../utils/signToken.js";
import { Resend } from "resend";
import crypto from "crypto";
import jwt from "jsonwebtoken";

interface AuthTokenPayload extends jwt.JwtPayload {
    id: string;
    type: "access" | "refresh";
}

const isAuthTokenPayload = (
    payload: string | jwt.JwtPayload,
): payload is AuthTokenPayload => {
    return (
        typeof payload !== "string" &&
        typeof payload.id === "string" &&
        (payload.type === "access" || payload.type === "refresh")
    );
};

const resend = new Resend(env.RESEND_EMAIL_API_KEY);

const createSuccessResponse = (
    user: CurrentUserType,
    settings: CurrentUserSettingsType,
    statusCode: number,
    res: Response,
    message: string,
) => {
    if (!user || !user._id) throw new CustomError("User not found!", 404);

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    const userObject = user.toObject();

    const { password, confirmPassword, ...userWithoutSensitiveData } =
        userObject;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(statusCode).json({
        status: "success",
        message,
        accessToken,
        data: {
            user: userWithoutSensitiveData,
            settings,
        },
    });
};

const signUp = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const newUser = await User.create(req.body);

        const defaultSettings = {
            userId: newUser._id,
            mode: "light",
            theme: "orange",
            allocationMode: "fixed-amount",
            baseCurrency: {
                code: "USD",
                value: "US Dollar",
                symbol: "$",
            },
            defaultAllocations: [
                { name: "Clothing" },
                { name: "Feeding" },
                { name: "Rent" },
                { name: "Transportation" },
            ],
        };

        //create a new setting that matches the id of the new user in the settings document
        const userSettings = await Settings.create(defaultSettings);

        req.user = newUser;

        createSuccessResponse(
            newUser,
            userSettings,
            201,
            res,
            "Account created successfully",
        );
    },
);

const login = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new CustomError(
                "User Email and Password are required",
                400,
            );
            return next(error);
        }

        const user = await User.findOne({
            email,
        }).select("+password");

        if (!user) {
            const error = new CustomError("Invalid user email", 404);
            return next(error);
        }

        const isMatchPassword = await user?.comparePasswordInDb(password);

        if (!isMatchPassword) {
            const error = new CustomError("User Password id is Incorrect", 400);
            return next(error);
        }

        const userSettings = await Settings.findOne({
            userId: user._id,
        });

        if (!userSettings) {
            next(new CustomError("user settings not found", 404));
            return;
        }

        createSuccessResponse(
            user,
            userSettings,
            200,
            res,
            `Welcome back, ${user.firstName}`,
        );
    },
);

const refreshAccessToken = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new CustomError(
                "Refresh Token not found, Please login again",
                401,
            );
        }

        if (!env.JWT_REFRESH_TOKEN_SECRET) {
            throw new CustomError(
                "Invalid refresh token token configuration",
                500,
            );
        }

        const decodedToken = jwt.verify(
            refreshToken,
            env.JWT_REFRESH_TOKEN_SECRET,
        );

        if (!isAuthTokenPayload(decodedToken)) {
            throw new CustomError("Invalid refresh token", 400);
        }

        if (decodedToken.type !== "refresh") {
            throw new CustomError("Invalid Token type", 400);
        }

        const user = await User.findById(decodedToken.id);

        if (!user) {
            throw new CustomError(
                "The user associated with this token no longer exists",
                401,
            );
        }

        const accessToken = signAccessToken(user._id);

        res.status(200).json({
            status: "Success",
            message: "the refresh token logic now works",
            accessToken,
        });
    },
);

// i think this forgot password middleware should be moved to the user controller not the auth controller

const forgotPassword = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({
                status: "fail",
                message: "User email not provided, please login to continue",
            });
            return;
        }

        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            res.status(200).json({
                status: "success",
                message:
                    "If an account exists with this email, a password reset link has been sent.",
            });
            return;
        }

        // create and save the hashed refreshed token in the user document
        const resetToken = user.createResetPwdToken();

        await user.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get("host")}/api/fundar/v1/users/resetpassword/${resetToken}`;

        //send email message here!

        const { error } = await resend.emails.send({
            from: "fundar <onboarding@resend.dev>",
            to: [`${user.email}`],
            subject: "Password Reset Request",
            html: ` <section className="p-6">
                        <h1>Password change request</h1>
                        <hr />
                        <br />
                        <p>Hello, ${user.firstName}</p>
                        <p>We have received a Password reset request from ${user.email}</p>
                        <p>click the link below to reset your password</p>
                         <a href=${resetUrl}>Reset Password</a>
                        <br />
                        <hr />
                        <p>this link will expire in 10mins</p>
                        <p>if this request was not initiated by you, then please kindly ignore<p>
                        </section>`,
        });

        if (error) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;

            await user.save({ validateBeforeSave: false });

            next(new CustomError(error.message, 500));
            return;
        } else {
            res.status(200).json({
                status: "success",
                message:
                    "If an account exists with this email, a password reset link has been sent.",
            });
            return;
        }
    },
);

const resetPassword = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // encrypt token in the db

        const { token } = req.params;

        if (!token || Array.isArray(token)) {
            next(
                new CustomError(
                    "No token found with the request, please send a token with the request parameters",
                    400,
                ),
            );
            return;
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpires: { $gt: Date.now() },
        });

        //validate user
        if (!user) {
            const error = new CustomError(
                "Token is invalid or has expired!",
                400,
            );
            next(error);
            return;
        }

        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.passwordChangedAt = new Date(Date.now());

        await user.save();
    },
);

export { signUp, login, forgotPassword, refreshAccessToken };
