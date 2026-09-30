import mongoose from "mongoose";
import { type IncomeType } from "../types/income.js";

const allocationSchema = new mongoose.Schema(
    {
        budgetName: {
            type: String,
            required: true,
        },

        budgetAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true },
);

const incomeSchema = new mongoose.Schema<IncomeType>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        source: {
            type: String,
            required: [true, "Please provide an income source!"],
            trim: true,
        },
        grossAmount: {
            type: Number,
            required: [true, "please provide a value for gross amount"],
            min: 0,
        },
        taxApplied: {
            type: Boolean,
            default: false,
        },
        taxPercentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        taxAmount: {
            type: Number,
            min: 0,
            default: 0,
        },
        netAmount: {
            type: Number,
            min: 0,
            default: 0,
        },
        description: {
            type: String,
            trim: true,
        },
        allocations: {
            type: [allocationSchema],
            default: [],
        },
        allocationStatus: {
            type: String,
            enum: ["unallocated", "partially_allocated", "fully_allocated"],
            required: true,
        },
        dateReceived: {
            type: Date,
            required: [true, "Please provide a receive date"],
        },
    },
    { timestamps: true },
);

const Income = mongoose.model("income", incomeSchema);

export default Income;
