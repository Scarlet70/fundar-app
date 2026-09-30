import { env } from "../config/env.js";
import mongoose from "mongoose";
import CustomError from "./customError.js";
import jwt from "jsonwebtoken";

export const signAccessToken = (userId: mongoose.Types.ObjectId) => {
    if (!env.JWT_ACCESS_TOKEN_SECRET || !env.JWT_ACCESS_EXPIRES_IN) {
        throw new CustomError("Invalid Access token configuration", 500);
    }

    return jwt.sign(
        { id: userId.toString(), type: "access" },
        env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN,
        },
    );
};

export const signRefreshToken = (userId: mongoose.Types.ObjectId) => {
    if (!env.JWT_REFRESH_TOKEN_SECRET || !env.JWT_REFRESH_EXPIRES_IN) {
        throw new CustomError("Invalid Refresh token configuration", 500);
    }

    return jwt.sign(
        { id: userId.toString(), type: "refresh" },
        env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        },
    );
};
