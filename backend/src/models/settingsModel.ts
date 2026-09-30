import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import type { SettingsType } from "../types/settings.js";

const baseCurrencySchema = new Schema(
    {
        code: {
            type: String,
            trim: true,
        },
        value: {
            type: String,
            trim: true,
        },
        symbol: {
            type: String,
            trim: true,
        },
    },
    { _id: false },
);

const defaultAllocationSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
});

const settingsSchema = new Schema<SettingsType>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    mode: {
        type: String,
        default: "light",
    },
    theme: {
        type: String,
        default: "orange",
    },
    allocationMode: {
        type: String,
        default: "fixed-amount",
    },
    baseCurrency: {
        type: baseCurrencySchema,
        default: {
            code: "USD",
            value: "US Dollar",
            symbol: "$",
        },
    },
    defaultAllocations: {
        type: [defaultAllocationSchema],
        default: [],
    },
});

const Settings = model("settings", settingsSchema);

export default Settings;
