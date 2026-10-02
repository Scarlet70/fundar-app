import type { IncomeType } from "@/types/income";
import type { IncomeFormValues } from "@/components/incomeComponents/IncomeWizard";
import type { EditIncomeFormValues } from "@/components/incomeComponents/EditIncomeWizard";
import type { AllocationFormValues } from "@/types/income";
import type { IncomeSourceSummary } from "@/types/income";
import type { AllocationTrend } from "@/types/income";
import type { MonthlyTaxSummary } from "@/types/income";
import type { MonthlyGrossNetSummary } from "@/types/income";

export function getNetIncome(income: IncomeType): number {
    if (!income.taxApplied) return income.grossAmount;

    return (
        income.grossAmount - income.grossAmount * (income.taxPercentage / 100)
    );
}

export function getTaxAmount(income: IncomeType) {
    if (!income.taxApplied) return 0;

    return income.grossAmount * (income.taxPercentage / 100);
}

export const buildIncome = (
    data: IncomeFormValues | EditIncomeFormValues,
    netIncomeAmount: number,
    taxAmount: number,
) => {
    const allocationsTotal = data.allocations.reduce(
        (sum: number, allocation: AllocationFormValues) =>
            sum + (allocation.budgetAmount || 0),
        0,
    );

    const allocationStatus: IncomeType["allocationStatus"] =
        allocationsTotal === 0
            ? "unallocated"
            : allocationsTotal < netIncomeAmount
              ? "partially_allocated"
              : "fully_allocated";

    const newIncome = {
        ...data,
        netAmount: netIncomeAmount,
        taxAmount,
        allocationStatus,
        dateReceived: new Date(data.dateReceived).toISOString(),
    };

    return newIncome;
};

export interface MonthlyIncomeSummary {
    month: string;
    netIncome: number;
    allocated: number;
    unallocated: number;
}

// for monthly comparison of netincome, allocated and unallocated in the analytics page

export const getMonthlyIncomeSummary = (
    incomes: IncomeType[],
): MonthlyIncomeSummary[] => {
    const grouped = incomes.reduce<Record<string, MonthlyIncomeSummary>>(
        (result, income) => {
            const date = new Date(income.dateReceived);

            const month = date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });

            if (!result[month]) {
                result[month] = {
                    month,
                    netIncome: 0,
                    allocated: 0,
                    unallocated: 0,
                };
            }

            const allocated = income.allocations.reduce(
                (total, allocation) => total + allocation.budgetAmount,
                0,
            );

            result[month].netIncome += income.netAmount;
            result[month].allocated += allocated;
            result[month].unallocated += income.netAmount - allocated;

            return result;
        },
        {},
    );

    return Object.values(grouped).sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime(),
    );
};

//simpler monthly comparison chart

export const getMonthlyIncome = (
    incomes: IncomeType[],
    numberOfMonths?: number,
) => {
    // If a numberOfMonths is provided,
    // generate the requested number of recent calendar months.
    if (numberOfMonths) {
        const today = new Date();

        const months = Array.from({ length: numberOfMonths }, (_, index) => {
            const date = new Date(
                today.getFullYear(),
                today.getMonth() - (numberOfMonths - 1 - index),
                1,
            );

            return {
                key: `${date.getFullYear()}-${String(
                    date.getMonth() + 1,
                ).padStart(2, "0")}`,

                label: date.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                }),
            };
        });

        const grouped = incomes.reduce<Record<string, number>>(
            (result, income) => {
                const date = new Date(income.dateReceived);

                const key = `${date.getFullYear()}-${String(
                    date.getMonth() + 1,
                ).padStart(2, "0")}`;

                result[key] = (result[key] || 0) + income.netAmount;

                return result;
            },
            {},
        );

        return months.map((month) => ({
            month: month.label,
            amount: grouped[month.key] || 0,
        }));
    }

    // If numberOfMonths isn't provided,
    // return every month for which income exists.
    const grouped = incomes.reduce<Record<string, number>>((result, income) => {
        const date = new Date(income.dateReceived);

        const key = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
        ).padStart(2, "0")}`;

        result[key] = (result[key] || 0) + income.netAmount;

        return result;
    }, {});

    return Object.entries(grouped)
        .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
        .map(([key, amount]) => {
            const [year, monthNumber] = key.split("-");

            const label = new Date(
                Number(year),
                Number(monthNumber) - 1,
            ).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });

            return {
                month: label,
                amount,
            };
        });
};

//get monthly comparison data

export const getMonthlyIncomeChange = (incomes: IncomeType[]) => {
    const monthlyIncome = getMonthlyIncome(incomes, 2);

    const previous = monthlyIncome[0];
    const current = monthlyIncome[1];

    const previousAmount = previous?.amount ?? 0;
    const currentAmount = current?.amount ?? 0;

    const difference = currentAmount - previousAmount;

    const percentageChange =
        previousAmount === 0
            ? currentAmount > 0
                ? 100
                : 0
            : (difference / previousAmount) * 100;

    return {
        currentMonth: current,
        previousMonth: previous,
        difference,
        percentageChange,
    };
};

//For the Incomes Chart Comparison

export const getIncomeBySource = (
    incomes: IncomeType[],
): IncomeSourceSummary[] => {
    const grouped = incomes.reduce<Record<string, number>>((result, income) => {
        const source = income.source.trim();

        result[source] = (result[source] || 0) + income.netAmount;

        return result;
    }, {});

    return Object.entries(grouped)
        .map(([source, amount]) => ({
            source,
            amount,
        }))
        .sort((a, b) => b.amount - a.amount);
};

// getting the chart data for allocation trens for each month
export const getAllocationTrend = (
    incomes: IncomeType[],
    allocationName: string,
): AllocationTrend[] => {
    const grouped = incomes.reduce<Record<string, AllocationTrend>>(
        (result, income) => {
            const date = new Date(income.dateReceived);

            const key = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
            ).padStart(2, "0")}`;

            const month = date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });

            if (!result[key]) {
                result[key] = {
                    month,
                    amount: 0,
                };
            }

            const allocationAmount = income.allocations
                .filter(
                    (allocation) =>
                        allocation.budgetName.trim().toLowerCase() ===
                        allocationName.trim().toLowerCase(),
                )
                .reduce(
                    (total, allocation) => total + allocation.budgetAmount,
                    0,
                );

            result[key].amount += allocationAmount;

            return result;
        },
        {},
    );

    return Object.entries(grouped)
        .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
        .map(([, summary]) => summary);
};

//to get monthly tax trend
export const getMonthlyTaxSummary = (
    incomes: IncomeType[],
): MonthlyTaxSummary[] => {
    const grouped = incomes.reduce<Record<string, MonthlyTaxSummary>>(
        (result, income) => {
            const date = new Date(income.dateReceived);

            const key = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
            ).padStart(2, "0")}`;

            const month = date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });

            if (!result[key]) {
                result[key] = {
                    month,
                    taxAmount: 0,
                };
            }

            result[key].taxAmount += income.taxAmount;

            return result;
        },
        {},
    );

    return Object.entries(grouped)
        .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
        .map(([, summary]) => summary);
};

// net vs gross income comparison helper
export const getMonthlyGrossNetSummary = (
    incomes: IncomeType[],
): MonthlyGrossNetSummary[] => {
    const grouped = incomes.reduce<Record<string, MonthlyGrossNetSummary>>(
        (result, income) => {
            const date = new Date(income.dateReceived);

            const key = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
            ).padStart(2, "0")}`;

            const month = date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });

            if (!result[key]) {
                result[key] = {
                    month,
                    grossIncome: 0,
                    netIncome: 0,
                };
            }

            result[key].grossIncome += income.grossAmount;
            result[key].netIncome += income.netAmount;

            return result;
        },
        {},
    );

    return Object.entries(grouped)
        .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
        .map(([, summary]) => summary);
};

export const getDashboardKPIMetrics = (incomes: IncomeType[]) => {
    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);

    const previousMonth = previousMonthDate.getMonth();
    const previousYear = previousMonthDate.getFullYear();

    // Current month's incomes
    const currentMonthIncomes = incomes.filter((income) => {
        const incomeDate = new Date(income.dateReceived);

        return (
            incomeDate.getMonth() === currentMonth &&
            incomeDate.getFullYear() === currentYear
        );
    });

    // Previous month's incomes
    const previousMonthIncomes = incomes.filter((income) => {
        const incomeDate = new Date(income.dateReceived);

        return (
            incomeDate.getMonth() === previousMonth &&
            incomeDate.getFullYear() === previousYear
        );
    });

    // =========================
    // CURRENT MONTH TOTAL INCOME
    // =========================

    const currentMonthIncome = currentMonthIncomes.reduce(
        (total, income) => total + income.netAmount,
        0,
    );

    // ==========================
    // PREVIOUS MONTH TOTAL INCOME
    // ==========================

    const previousMonthIncome = previousMonthIncomes.reduce(
        (total, income) => total + income.netAmount,
        0,
    );

    // ======================
    // INCOME PERCENT CHANGE
    // ======================

    const incomePercentageChange =
        previousMonthIncome === 0
            ? 0
            : ((currentMonthIncome - previousMonthIncome) /
                  previousMonthIncome) *
              100;

    // ==================
    // INCOME COUNT CHANGE
    // ==================

    const currentIncomeCount = currentMonthIncomes.length;

    const previousIncomeCount = previousMonthIncomes.length;

    const incomeCountChange = currentIncomeCount - previousIncomeCount;

    // ======================
    // CURRENT MONTH ALLOCATED
    // ======================

    const currentMonthAllocated = currentMonthIncomes.reduce(
        (total, income) => {
            const allocatedAmount = income.allocations.reduce(
                (allocationTotal, allocation) =>
                    allocationTotal + allocation.budgetAmount,
                0,
            );

            return total + allocatedAmount;
        },
        0,
    );

    // =================
    // ALLOCATION RATE
    // =================

    const allocationRate =
        currentMonthIncome === 0
            ? 0
            : (currentMonthAllocated / currentMonthIncome) * 100;

    // =================
    // CASH ON HAND
    // =================

    const currentCashOnHand = currentMonthIncome - currentMonthAllocated;

    // ======================
    // REMAINING INCOME RATE
    // ======================

    const remainingPercentage =
        currentMonthIncome === 0
            ? 0
            : (currentCashOnHand / currentMonthIncome) * 100;

    return {
        monthPercent: incomePercentageChange,
        countDifference: incomeCountChange,
        monthRate: allocationRate,
        monthRemPercent: remainingPercentage,
        previousIncomeCount,
        currentIncomeCount,
    };
};
