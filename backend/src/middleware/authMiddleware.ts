import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import type { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError.js";
import asyncErrorHandler from "../controllers/asyncErrorHandler.js";

interface AuthTokenPayload extends jwt.JwtPayload {
    id: string;
}

const isAuthTokenPayload = (
    payload: string | jwt.JwtPayload,
): payload is AuthTokenPayload => {
    return typeof payload !== "string" && typeof payload.id === "string";
};

const protect = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers?.authorization?.startsWith("Bearer")) {
            const error = new CustomError("Invalid Token Signature", 400);
            return next(error);
        }

        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            const error = new CustomError("Please login to continue", 401);
            return next(error);
        }

        if (!env.JWT_ACCESS_TOKEN_SECRET) {
            const error = new CustomError(
                "Invalid Secret Decryption key provided",
                500,
            );
            return next(error);
        }

        const decodedToken = jwt.verify(
            accessToken,
            env.JWT_ACCESS_TOKEN_SECRET,
        );

        if (!isAuthTokenPayload(decodedToken)) {
            return next(new CustomError("Invalid token", 401));
        }

        const currentUser = await User.findById(decodedToken.id);

        if (!currentUser) {
            return next(new CustomError("User not Found!", 404));
        }

        req.user = currentUser;

        next();
    },
);

const restrictAccess = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new CustomError("Please log in to continue", 401);
        }

        if (req.user.role !== "admin") {
            throw new CustomError(
                "You are not authorized to carry out this operation",
                409,
            );
        }

        next();
    },
);

export { protect, restrictAccess };
