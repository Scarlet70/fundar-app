import mongoose from "mongoose";

export interface AllocationType {
    budgetName: string;
    budgetAmount: number;
}

export type AllocationStatusType =
    | "unallocated"
    | "partially_allocated"
    | "fully_allocated";

export interface IncomeType {
    userId: mongoose.Types.ObjectId;
    source: string;
    grossAmount: number;
    taxApplied: boolean;
    taxPercentage: number;
    taxAmount: number;
    netAmount: number;
    description?: string;
    allocations: AllocationType[];
    allocationStatus: AllocationStatusType;
    dateReceived: Date;
}
