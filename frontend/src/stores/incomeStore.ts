import { create } from "zustand";
import type { IncomeType } from "@/types/income";

interface IncomeStore {
    incomes: IncomeType[];
    setIncomes: (incomes: IncomeType[]) => void;
    addIncome: (income: IncomeType) => void;
    updateIncome: (_id: string, income: Partial<IncomeType>) => void;
    deleteIncome: (_id: string) => void;
    getIncomeById: (_id: string) => IncomeType | undefined;
    clearIncomes: () => void;
}

export const useIncomeStore = create<IncomeStore>((set, get) => ({
    incomes: [],

    setIncomes: (incomes) =>
        set({
            incomes,
        }),

    addIncome: (newIncome) =>
        set((state) => ({
            incomes: [...state.incomes, newIncome],
        })),

    updateIncome: (id, updatedIncome) =>
        set((state) => ({
            incomes: state.incomes.map((income) =>
                income._id === id ? { ...income, ...updatedIncome } : income,
            ),
        })),

    deleteIncome: (id) =>
        set((state) => ({
            incomes: state.incomes.filter((income) => income._id !== id),
        })),

    getIncomeById: (id) => get().incomes.find((income) => income._id === id),

    clearIncomes: () =>
        set({
            incomes: [],
        }),
}));
