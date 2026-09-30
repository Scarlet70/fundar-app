import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    ArrowUpRight,
    Sigma,
    Wallet,
    PiggyBank,
    DollarSign,
    CircleCheck,
    ChartNoAxesCombined,
    Info,
    Wifi,
    Ellipsis,
} from "lucide-react";
import { useIncomeStore } from "@/stores/incomeStore";
import { useAuthStore } from "@/stores/authStore";
import { useMemo } from "react";
import AllocationsPieChart from "@/components/charts/AllocationsPieChart";
import MonthlyIncomesChart from "@/components/charts/MonthlyIncomesChart";
import { getDashboardKPIMetrics } from "@/utils/helpers";
import { getMonthlyIncomeChange } from "@/utils/helpers";
import { Link } from "react-router-dom";

type AllocationSummary = {
    budgetName: string;
    budgetAmount: number;
};

const PIECOLORS = [
    "#f97316",
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
    "#eab308",
    "#ef4444",
];

const Dashboard = () => {
    const incomes = useIncomeStore((state) => state.incomes);
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);
    const currentUser = useAuthStore((state) => state.user);
    const totalNetIncome = incomes.reduce(
        (total, income) => total + income.netAmount,
        0,
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

    const cashOnHand = totalNetIncome - totalAllocated;

    const incomesToDisplay = incomes.slice(0, 5);

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

    const topFiveAllocations = [...allocationData]
        .sort((a, b) => b.budgetAmount - a.budgetAmount)
        .slice(0, 6)
        .filter((item) => item.budgetName.trim().toLowerCase() !== "savings");

    const highestAllocation = topFiveAllocations[0];

    const dateFormat = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    } as const;

    const dateTimeFormat = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    } as const;

    const totalSaved = incomes
        .filter(
            (income) =>
                new Date(income.dateReceived).getMonth() ===
                new Date().getMonth(),
        )
        .reduce(
            (total, income) =>
                total +
                income.allocations
                    .filter(
                        (allocation) =>
                            allocation.budgetName.trim().toLowerCase() ===
                            "savings",
                    )
                    .reduce(
                        (allocationTotal, allocation) =>
                            allocationTotal + allocation.budgetAmount,
                        0,
                    ),
            0,
        );

    const totalPercentageSaved = (totalSaved / totalNetIncome) * 100;

    const percentageAllocated = (totalAllocated / totalNetIncome) * 100;

    const unAllocatedPercentage = (cashOnHand / totalNetIncome) * 100;

    const highestAllocationPercentage =
        (highestAllocation?.budgetAmount / totalNetIncome) * 100;

    const { currentMonth, previousMonth, percentageChange } =
        getMonthlyIncomeChange(incomes);

    const kpiMetrics = getDashboardKPIMetrics(incomes);

    const { monthPercent, countDifference, monthRate, monthRemPercent } =
        kpiMetrics;

    let allIncomesTooltipContent =
        countDifference > 0 ? (
            <section className="p-4 text-sm dark:text-orange-700">
                For this month, you have about{" "}
                {Math.abs(Number(countDifference.toFixed(1)))} incomes more than
                last month
            </section>
        ) : countDifference < 0 ? (
            <section className="p-4 text-sm dark:text-orange-700">
                For this month, you have about{" "}
                {Math.abs(Number(countDifference.toFixed(1)))} incomes less than
                last month
            </section>
        ) : (
            <section className="p-4 text-sm dark:text-orange-700">
                {" "}
                You have the same number of incomes as last month
            </section>
        );

    return (
        <section className="flex flex-col gap-6 dark:bg-transparent p-4">
            <article className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl lg:text-4xl font-bold mb-2">
                        Welcome Back,{" "}
                        <span className="text-fundar-brand">
                            {currentUser?.firstName}
                        </span>
                    </h3>
                    <p className="text-sm">
                        Here's how your budget is doing today
                    </p>
                    <span className="text-[0.7rem] p-1 lg:hidden">
                        {new Date().toLocaleString("en-US", dateFormat)}
                    </span>
                </div>
                <Link to={"/analytics"}>
                    <Button className="p-6 rounded-4xl">
                        View Budget Analytics
                    </Button>
                </Link>
            </article>
            <article className="flex flex-wrap justify-between gap-2">
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface border-3 border-t-fundar-border border-r-fundar-border shadow-xl">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <Sigma className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">TOTAL INCOME AMT.</p>
                        <span className="font-semibold text-lg">
                            {baseCurrency?.symbol}
                            {totalNetIncome.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between rounded-xl items-center bg-fundar-surface-muted px-2 py-4">
                        <Badge
                            variant={
                                monthPercent < 0
                                    ? "destructive"
                                    : monthPercent === 0
                                      ? "secondary"
                                      : "positive"
                            }
                            className="text-[0.6rem] px-2 py-0.5 rounded-xl"
                        >
                            {kpiMetrics.monthPercent.toFixed(1)}%
                        </Badge>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="cursor-help inline-block">
                                    <ArrowUpRight className="size-6 text-fundar-text-subtle" />
                                </div>
                            </TooltipTrigger>

                            <TooltipContent>
                                <section className="p-4 text-sm dark:text-orange-700">
                                    Your current income this month is{" "}
                                    {monthPercent > 0
                                        ? `${Math.abs(Number(monthPercent.toFixed(1)))}% higher when`
                                        : monthPercent < 0
                                          ? `${Math.abs(Number(monthPercent.toFixed(1)))}% lower when`
                                          : "exactly the same as"}{" "}
                                    compared to last month's incomes.
                                </section>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </section>
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface border-3 border-t-fundar-border border-r-fundar-border">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <Wallet className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">ALL INCOMES</p>
                        <span className="font-semibold text-lg">
                            {incomes.length}
                        </span>
                    </div>
                    <div className="flex justify-between rounded-xl shadow-xl items-center bg-fundar-surface-muted px-2 py-4">
                        <Badge
                            variant={
                                countDifference < 0
                                    ? "destructive"
                                    : countDifference === 0
                                      ? "secondary"
                                      : "positive"
                            }
                            className="text-[0.6rem] px-2 py-0.5 rounded-xl"
                        >
                            {kpiMetrics.countDifference}
                        </Badge>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="cursor-help inline-block">
                                    <ArrowUpRight className="text-fundar-text-subtle size-6" />
                                </div>
                            </TooltipTrigger>

                            <TooltipContent>
                                {allIncomesTooltipContent}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </section>
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface border-3 border-t-fundar-border border-r-fundar-border">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <DollarSign className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">TOTAL ALLOCATED AMT.</p>
                        <span className="font-semibold text-lg">
                            {baseCurrency?.symbol}
                            {totalAllocated.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between rounded-xl shadow-xl items-center bg-fundar-surface-muted px-2 py-4">
                        <Badge
                            variant={
                                monthRate < 0
                                    ? "destructive"
                                    : monthRate === 0
                                      ? "secondary"
                                      : "positive"
                            }
                            className="text-[0.6rem] px-2 py-0.5 rounded-xl"
                        >
                            {kpiMetrics.monthRate.toFixed(1)}%
                        </Badge>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="cursor-help inline-block">
                                    <ArrowUpRight className="text-fundar-text-subtle size-6" />
                                </div>
                            </TooltipTrigger>

                            <TooltipContent>
                                <section className="p-4 text-sm dark:text-orange-700">
                                    You have allocated about{" "}
                                    {monthRate.toFixed(1)} of your all time net
                                    income
                                </section>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </section>
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface outline outline-fundar-brand shadow-xl">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <PiggyBank className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">CURRENT CASH ON HAND</p>
                        <span className="font-semibold text-lg">
                            {baseCurrency?.symbol}
                            {cashOnHand.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between bg-fundar-surface-muted rounded-xl items-center px-2 py-4">
                        <Badge
                            variant={
                                monthRemPercent < 0
                                    ? "destructive"
                                    : monthRemPercent === 0
                                      ? "secondary"
                                      : "positive"
                            }
                            className="text-[0.6rem] px-2 py-0.5 rounded-xl"
                        >
                            {kpiMetrics.monthRemPercent.toFixed(1)}%
                        </Badge>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="cursor-help inline-block">
                                    <ArrowUpRight className="text-fundar-text-subtle size-6" />
                                </div>
                            </TooltipTrigger>

                            <TooltipContent>
                                <section className="p-4 text-sm dark:text-orange-700">
                                    You have about {monthRemPercent.toFixed(1)}%
                                    of your all time income available to
                                    allocate
                                </section>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </section>
            </article>

            <article className="flex flex-col lg:flex-row gap-2 justify-between">
                <section className="bg-fundar-surface shadow-xl rounded-xl w-full lg:w-[calc(40%-0.8rem)] p-4">
                    <div className="flex justify-between items-center bg-fundar-surface-muted p-2 pb-4 border-b-2">
                        <h2 className="text-xl font-semibold">
                            Recent transactions
                        </h2>
                        <Link to={"/income"}>
                            <span className="flex gap-1 text-xs items-center">
                                View transaction history{" "}
                                <ArrowUpRight className="w-4 h-4" />{" "}
                            </span>
                        </Link>
                    </div>
                    <section className="flex flex-col gap-0.5">
                        {incomesToDisplay.map((income) => (
                            <article
                                key={income._id}
                                className="flex justify-between items-center hover:bg-fundar-surface-muted border-b border-fundar-surface-subtle/50 p-2 py-3"
                            >
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold">
                                        {income.source}
                                    </span>
                                    <span className="text-xs">
                                        {new Date(
                                            income.dateReceived,
                                        ).toLocaleString(
                                            "en-US",
                                            dateTimeFormat,
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-sm text-green-600">
                                        {baseCurrency?.symbol}
                                        {income.netAmount.toLocaleString()}
                                    </span>
                                </div>
                            </article>
                        ))}
                        <Link
                            to={"/income"}
                            className="block"
                        >
                            <Button className="p-6 rounded-4xl mt-4 w-full">
                                Add a new transation
                            </Button>
                        </Link>
                    </section>
                </section>
                <section className="shadow-xl bg-fundar-surface rounded-xl w-full lg:w-[calc(30%-0.8rem)]">
                    <AllocationsPieChart />
                </section>
                <section className="bg-fundar-surface shadow-xl rounded-xl w-full lg:w-[calc(30%-0.8rem)] p-6 flex flex-col gap-8">
                    <article className="flex flex-col space-y-4">
                        <h2 className="text-sm">
                            Total allocated to savings this month
                        </h2>
                        <p className="font-semibold text-3xl flex gap-2">
                            <CircleCheck className="w-4 h-4" />
                            {baseCurrency?.symbol}
                            {totalSaved.toLocaleString()}
                        </p>
                        <div>
                            <p className="text-sm flex gap-1">
                                <Info className="w-3.5 h-3.5" />
                                you have allocated{" "}
                                {totalPercentageSaved.toFixed(2)}% of this
                                month's income to savings
                            </p>
                        </div>
                        <div className="flex lg:flex-col justify-center gap-2">
                            <Button className="p-6 rounded-4xl">
                                Create and Save
                            </Button>
                            <Button
                                variant={"outline"}
                                className="p-6 rounded-4xl"
                            >
                                Set a Savings Target
                            </Button>
                        </div>
                    </article>
                    <hr />
                    <article className="flex flex-col gap-2">
                        <h2 className="text-md flex gap-1">
                            Your top 5 fundar allocations
                            <ChartNoAxesCombined className="w-4 h-4" />
                        </h2>
                        <div className="p-4 rounded-2xl bg-fundar-brand">
                            {topFiveAllocations.map((allocation, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between border-b-2 p-2 dark:border-slate-400"
                                >
                                    <span>{allocation.budgetName}</span>
                                    <span>
                                        {baseCurrency?.symbol}
                                        {allocation.budgetAmount.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>
            </article>
            <article className="flex flex-col lg:flex-row gap-2 justify-between">
                <section className="bg-fundar-surface shadow-xl rounded-xl w-full lg:w-[calc(65%-0.25rem)] p-8 space-y-8">
                    <h2>Income Stats over the past 5 months</h2>
                    <MonthlyIncomesChart />
                    <div className="p-4 rounded-2xl bg-fundar-brand-soft">
                        <p className="">{currentMonth.month} Income</p>

                        <p className="text-xl font-bold">
                            {baseCurrency?.symbol}
                            {currentMonth.amount.toLocaleString()}
                        </p>

                        <Badge
                            variant={
                                percentageChange > 0
                                    ? "default"
                                    : percentageChange === 0
                                      ? "secondary"
                                      : "destructive"
                            }
                            className="text-xs"
                        >
                            {percentageChange > 0 ? "↑" : "↓"}{" "}
                            {Math.abs(percentageChange).toFixed(1)}% from{" "}
                            {previousMonth.month}
                        </Badge>
                    </div>
                </section>
                <section className="bg-fundar-surface shadow-xl rounded-xl w-full lg:w-[calc(35%-0.25rem)] p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-fundar-brand-soft outline outline-fundar-brand-hover/20">
                        <h4>Allocation Percentage</h4>

                        <span className="text-sm border-l-3 border-orange-500 pl-3">
                            <p>{percentageAllocated.toFixed(2)}% Allocated</p>
                            <p>
                                {baseCurrency?.symbol}
                                {totalAllocated.toLocaleString()} of $
                                {totalNetIncome.toLocaleString()} allocated
                            </p>
                        </span>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-fundar-surface-muted outline outline-fundar-surface-subtle">
                        <h4>Unallocated funds</h4>

                        <span className="text-sm border-l-3 border-slate-500 pl-3">
                            <p>
                                {unAllocatedPercentage.toFixed(2)}% Unallocated
                            </p>
                            <p>
                                {baseCurrency?.symbol}
                                {cashOnHand.toLocaleString()} of{" "}
                                {baseCurrency?.symbol}
                                {totalNetIncome.toLocaleString()} not allocated
                            </p>
                        </span>
                        <Link to={"/income"}>
                            <Button className="p-6 rounded-4xl mt-4 w-2/5">
                                Allocate Now
                            </Button>
                        </Link>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-fundar-brand text-fundar-surface-muted shadow-2xl">
                        <h4>Highest Allocation</h4>

                        <span className="text-sm">
                            <p className="text-2xl font-bold flex justify-between">
                                {highestAllocation?.budgetName}
                                <Wifi className="rotate-z-90" />
                            </p>
                            <p className="text-lg">
                                Amount -{" "}
                                <span className="text-2xl font-bold">
                                    {baseCurrency?.symbol}
                                    {highestAllocation?.budgetAmount.toLocaleString()}
                                </span>
                            </p>
                            <p className="flex justify-between items-center">
                                Percentage Allocated -{" "}
                                {highestAllocationPercentage.toFixed(2)}%
                                <Ellipsis />
                            </p>
                        </span>
                    </div>
                </section>
            </article>
        </section>
    );
};

export default Dashboard;
