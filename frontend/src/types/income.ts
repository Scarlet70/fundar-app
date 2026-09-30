export interface Allocation {
    _id: string;
    budgetName: string;
    budgetAmount: number;
}

export interface AllocationFormValues {
    budgetName: string;
    budgetAmount: number;
}

export interface EditAllocationFormValues {
    budgetName: string;
    budgetAmount: number;
}

export interface Income {
    id: number;
    source: string;
    grossAmount: number;
    taxApplied: boolean;
    taxPercentage: number;
    taxAmount: number;
    netAmount: number;
    currency: string;
    description?: string;
    allocations: Allocation[];
    allocationStatus: "unallocated" | "partially_allocated" | "fully_allocated";
    dateReceived: string;
    createdAt: string;
    editedAt?: string;
}

export interface IncomeType {
    _id: string;
    source: string;
    grossAmount: number;
    taxApplied: boolean;
    taxPercentage: number;
    taxAmount: number;
    netAmount: number;
    currency: string;
    description?: string;
    allocations: Allocation[];
    allocationStatus: "unallocated" | "partially_allocated" | "fully_allocated";
    dateReceived: string;
    createdAt: string;
    editedAt?: string;
}

export type AllocationSummary = {
    budgetName: string;
    budgetAmount: number;
};

export type IncomeSourceSummary = {
    source: string;
    amount: number;
};

export type AllocationTrend = {
    month: string;
    amount: number;
};

export type MonthlyTaxSummary = {
    month: string;
    taxAmount: number;
};

export type MonthlyGrossNetSummary = {
    month: string;
    grossIncome: number;
    netIncome: number;
};

// New Types for backend request
export type AllocationStatusType =
    | "unallocated"
    | "partially_allocated"
    | "fully_allocated";

export interface IncomeFormDataType {
    source: string;
    grossAmount: number;
    taxApplied: boolean;
    taxPercentage: number;
    taxAmount: number;
    netAmount: number;
    currency: string;
    description?: string;
    allocations: AllocationFormValues[];
    allocationStatus: AllocationStatusType;
    dateReceived: string;
    createdAt: string;
    editedAt?: string;
}
