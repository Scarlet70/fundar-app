import { Pie, PieChart, Tooltip } from "recharts";
import { useIncomeStore } from "@/stores/incomeStore";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

import type { AllocationSummary } from "@/types/income";

const PIECOLORS = [
    "#f97316",
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
    "#eab308",
    "#ef4444",
];

const AllocationsPieChart = () => {
    const incomes = useIncomeStore((state) => state.incomes);
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);
    const totalNetIncome = useMemo(
        () => incomes.reduce((total, income) => total + income.netAmount, 0),
        [incomes],
    );

    const totalAllocated = incomes.reduce(
        (incomeTotal, income) =>
            incomeTotal +
            income.allocations.reduce(
                (allocationTotal, allocation) =>
                    allocationTotal + allocation.budgetAmount,
                0,
            ),
        0,
    );

    const unallocatedAmount = totalNetIncome - totalAllocated;

    const unallocatedPercentage = (unallocatedAmount / totalNetIncome) * 100;

    const allocationData = useMemo(() => {
        const allocations = incomes.flatMap((income) => income.allocations);

        const grouped = allocations.reduce<Record<string, AllocationSummary>>(
            (result, allocation) => {
                const name = allocation.budgetName.trim();

                if (!result[name]) {
                    result[name] = {
                        budgetName: name,
                        budgetAmount: 0,
                    };
                }

                result[name].budgetAmount += allocation.budgetAmount;

                return result;
            },
            {},
        );

        return Object.values(grouped).map((allocation, index) => ({
            ...allocation,
            fill: PIECOLORS[index % PIECOLORS.length],
        }));
    }, [incomes]);

    const allocationDataToDisplay = allocationData.slice(0, 3);

    return (
        <section className="flex flex-col p-4">
            <h3 className="text-center text-2xl lg:text-lg">
                Allocations this month
            </h3>
            <PieChart
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "60vh",
                    aspectRatio: 1,
                }}
                responsive
            >
                <Pie
                    data={allocationData}
                    innerRadius="50%"
                    outerRadius="80%"
                    // Corner radius is the rounded edge of each pie slice
                    cornerRadius="10%"
                    fill="#00C49F"
                    // padding angle is the gap between each pie slice
                    paddingAngle={2}
                    dataKey="budgetAmount"
                    isAnimationActive={true}
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) {
                            return null;
                        }

                        const data = payload[0].payload;

                        return (
                            <div className="rounded-lg border bg-fundar-surface p-3 shadow-md">
                                <p className="font-medium text-fundar-brand-muted">
                                    {data.budgetName}
                                </p>
                                <p className="text-sm text-fundar-brand">
                                    {baseCurrency?.symbol}
                                    {data.budgetAmount.toLocaleString()}
                                </p>
                            </div>
                        );
                    }}
                />
            </PieChart>
            <div className="space-y-3">
                {allocationDataToDisplay.map((allocation) => {
                    const percentage =
                        totalNetIncome > 0
                            ? (allocation.budgetAmount / totalNetIncome) * 100
                            : 0;

                    return (
                        <div
                            key={allocation.budgetName}
                            className="space-y-1"
                        >
                            {/* Key + percentage */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="h-3 w-3 rounded-full shrink-0"
                                        style={{
                                            backgroundColor: allocation.fill,
                                        }}
                                    />

                                    <span className="font-medium text-xs">
                                        {allocation.budgetName}
                                    </span>
                                </div>

                                <span className="text-xs font-medium">
                                    {percentage.toFixed(1)}%
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                        backgroundColor: allocation.fill,
                                    }}
                                />
                            </div>

                            {/* Amount */}
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                    {baseCurrency?.symbol}
                                    {allocation.budgetAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div className="space-y-2">
                    {/* Key + percentage */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full shrink-0 bg-slate-400" />

                            <span className="font-medium text-xs">
                                Unallocated Funds
                            </span>
                        </div>

                        <span className="text-xs font-medium">
                            {unallocatedPercentage.toFixed(1)}%
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full transition-all bg-slate-400"
                            style={{
                                width: `${Math.min(unallocatedPercentage, 100)}%`,
                            }}
                        />
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                            {baseCurrency?.symbol}
                            {unallocatedAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <Link
                to={"/allocations"}
                className="block mt-6"
            >
                <Button className="p-6 rounded-4xl w-full">
                    View all allocation Stats
                </Button>
            </Link>
        </section>
    );
};

export default AllocationsPieChart;

export const AllocationsPagePieChart = () => {
    const incomes = useIncomeStore((state) => state.incomes);
    const totalNetIncome = useMemo(
        () => incomes.reduce((total, income) => total + income.netAmount, 0),
        [incomes],
    );

    const totalAllocated = incomes.reduce(
        (incomeTotal, income) =>
            incomeTotal +
            income.allocations.reduce(
                (allocationTotal, allocation) =>
                    allocationTotal + allocation.budgetAmount,
                0,
            ),
        0,
    );

    const unallocatedAmount = totalNetIncome - totalAllocated;

    const unallocatedPercentage = (unallocatedAmount / totalNetIncome) * 100;

    const allocationData = useMemo(() => {
        const allocations = incomes.flatMap((income) => income.allocations);

        const grouped = allocations.reduce<Record<string, AllocationSummary>>(
            (result, allocation) => {
                const name = allocation.budgetName.trim();

                if (!result[name]) {
                    result[name] = {
                        budgetName: name,
                        budgetAmount: 0,
                    };
                }

                result[name].budgetAmount += allocation.budgetAmount;

                return result;
            },
            {},
        );

        return Object.values(grouped).map((allocation, index) => ({
            ...allocation,
            fill: PIECOLORS[index % PIECOLORS.length],
        }));
    }, [incomes]);

    return (
        <section className="flex flex-col p-4">
            <h3 className="text-center text-2xl lg:text-lg">
                Allocations this month
            </h3>
            <PieChart
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "60vh",
                    aspectRatio: 1,
                }}
                responsive
            >
                <Pie
                    data={allocationData}
                    innerRadius="50%"
                    outerRadius="80%"
                    // Corner radius is the rounded edge of each pie slice
                    cornerRadius="10%"
                    fill="#00C49F"
                    // padding angle is the gap between each pie slice
                    paddingAngle={2}
                    dataKey="budgetAmount"
                    isAnimationActive={true}
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) {
                            return null;
                        }

                        const data = payload[0].payload;

                        return (
                            <div className="rounded-lg border bg-fundar-surface p-3 shadow-md">
                                <p className="font-medium text-fundar-brand-muted">
                                    {data.budgetName}
                                </p>
                                <p className="text-sm text-fundar-brand">
                                    ${data.budgetAmount.toLocaleString()}
                                </p>
                            </div>
                        );
                    }}
                />
            </PieChart>
            <div className="space-y-3">
                {allocationData.map((allocation) => {
                    const percentage =
                        totalNetIncome > 0
                            ? (allocation.budgetAmount / totalNetIncome) * 100
                            : 0;

                    return (
                        <div
                            key={allocation.budgetName}
                            className="space-y-1"
                        >
                            {/* Key + percentage */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="h-3 w-3 rounded-full shrink-0"
                                        style={{
                                            backgroundColor: allocation.fill,
                                        }}
                                    />

                                    <span className="font-medium text-xs">
                                        {allocation.budgetName}
                                    </span>
                                </div>

                                <span className="text-xs font-medium">
                                    {percentage.toFixed(1)}%
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                        backgroundColor: allocation.fill,
                                    }}
                                />
                            </div>

                            {/* Amount */}
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                    ${allocation.budgetAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div className="space-y-2">
                    {/* Key + percentage */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full shrink-0 bg-slate-400" />

                            <span className="font-medium text-xs">
                                Unallocated Funds
                            </span>
                        </div>

                        <span className="text-xs font-medium">
                            {unallocatedPercentage.toFixed(1)}%
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full transition-all bg-slate-400"
                            style={{
                                width: `${Math.min(unallocatedPercentage, 100)}%`,
                            }}
                        />
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${unallocatedAmount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
