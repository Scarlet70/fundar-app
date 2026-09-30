import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

interface AppError extends Error {
    statusCode?: number;
    status?: string;
    isOperational?: boolean;

    code?: number;

    keyValue?: Record<string, unknown>;

    errorResponse?: {
        code?: number;
        keyValue?: Record<string, unknown>;
    };

    path?: string;
    value?: unknown;
}

const processError = (err: AppError): AppError => {
    if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.status = "fail";
    }

    //MongoServerError
    const errorCode = err.code ?? err.errorResponse?.code;
    if (errorCode === 11000) {
        err.statusCode = 400;
        err.status = "fail";
        const keyValue = err.keyValue ?? err.errorResponse?.keyValue;

        if (keyValue) {
            const field = Object.keys(keyValue)[0];

            if (field) {
                const value = keyValue[field];

                err.message = `${field}: "${value}" already exists!`;
            }
        }
    }

    if (err.name === "CastError") {
        err.statusCode = 400;
        err.status = "fail";
        err.message = `Invalid value for ${err.path}, received: ${err.value}`;
    }

    if (err.name === "ReferenceError") {
        err.statusCode = 500;
        err.status = "error";
        console.log(`${err.name}: ${err.message}`);
    }

    if (err.name === "TokenExpiredError") {
        err.statusCode = 401;
        err.status = "error";
        err.message =
            process.env.NODE_ENV === "development"
                ? err.message
                : `Token has expired! please login again`;
    }

    if (err.name === "JsonWebTokenError") {
        err.statusCode = 500;
        err.status = "error";
        err.message = "Invalid Token Signature";
    }

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.message = err.message || "Internal Server Error!";

    return err;
};

const prodError = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    processError(error);
    if (error instanceof Error && error.statusCode) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
};

const devError = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    processError(error);
    if (error instanceof Error && error.statusCode) {
        res.status(error.statusCode).json({
            name: error.name,
            status: error.status,
            message: error.message,
            error: error,
            stackTrace: error.stack,
        });
    }
};

let globalErrorHandler = env.NODE_ENV === "production" ? prodError : devError;

export default globalErrorHandler;
