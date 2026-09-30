import type { HydratedDocument } from "mongoose";
import type mongoose from "mongoose";

interface BaseCurrencyType {
    code: string;
    value: string;
    symbol: string;
}

interface DefaultAllocationType {
    name: string;
}

export interface SettingsType {
    userId: mongoose.Types.ObjectId;
    mode: string;
    theme: string;
    allocationMode: string;
    baseCurrency: BaseCurrencyType;
    defaultAllocations: DefaultAllocationType[];
}

export type CurrentUserSettingsType = HydratedDocument<SettingsType>;
