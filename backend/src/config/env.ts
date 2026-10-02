import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config({
    path: "./config.env",
});

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,
    FRONTEND_URL: process.env.FRONTEND_URL,
    MONGO_URI: process.env.MONGO_URI,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_EXPIRES_IN: (process.env.JWT_ACCESS_EXPIRES_IN ||
        "15m") as StringValue,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    JWT_REFRESH_EXPIRES_IN: (process.env.JWT_REFRESH_EXPIRES_IN ||
        "3d") as StringValue,
    RESEND_EMAIL_API_KEY: process.env.RESEND_EMAIL_API_KEY,
};
