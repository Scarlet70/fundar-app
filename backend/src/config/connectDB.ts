import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.0.0.1"]);

import { env } from "./env.js";
import mongoose from "mongoose";
import asyncErrorHandler from "../controllers/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import type { Request, Response, NextFunction } from "express";

//MongoDB Connection

export const connectToMongoDB = async () => {
    try {
        if (!env.MONGO_URI) {
            throw new Error("Invalid Connection String");
        }
        await mongoose.connect(env.MONGO_URI);
        console.log(`Database Connection Successful`);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            process.exit(1);
        } else {
            console.log("Mongo Commection Failedd with unknown error");
            process.exit(1);
        }
    }
};
