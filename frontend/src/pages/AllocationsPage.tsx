import { CircleDollarSign, Coins, Wallet, ListChecks } from "lucide-react";
import { useIncomeStore } from "@/stores/incomeStore";
import { useMemo, useState } from "react";
import type { AllocationSummary } from "@/types/income";
import type { IncomeType } from "@/types/income";
import { AllocationsPagePieChart } from "@/components/charts/AllocationsPieChart";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/stores/authStore";

const AllocationsPage = () => {
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState<AllocationSummary | null>(
        null,
    );

    const incomes = useIncomeStore((state) => state.incomes);

    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);

    const allocations = incomes.flatMap((income) => income.allocations);

    const allocationOptions = Array.from(
        new Set(
            incomes.flatMap((income) =>
                income.allocations.map((allocation) => allocation.budgetName),
            ),
        ),
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

    const totalNetIncome = incomes.reduce(
        (total, income) => total + income.netAmount,
        0,
    );

    const unallocatedAmount = totalNetIncome - totalAllocated;

    const allocationData = useMemo(() => {
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

        return Object.values(grouped);
    }, [incomes]);

    const getLinkedIncomes = (
        incomes: IncomeType[],
        selectedAllocation: AllocationSummary | null,
    ) => {
        return incomes.filter((income) =>
            income.allocations.some(
                (allocation) =>
                    allocation.budgetName.toLowerCase() ===
                    selectedAllocation?.budgetName.toLowerCase(),
            ),
        );
    };

    const linkedIncomes = selectedItem
        ? getLinkedIncomes(incomes, selectedItem)
        : [];

    const handleAllocationClick = (name: string) => {
        const targetItem = allocationData.find(
            (item) => item.budgetName === name,
        );

        /*  const linkedIncomes = incomes.filter((income) => income.allocations.map(allocation => allocation.budgetName).includes(name)) */

        if (targetItem) {
            /* const linkedIncomes = incomes.filter((income) =>
            income.allocations.some(
               (allocation) =>
                  allocation.budgetName.toLowerCase() ===
                  targetItem.budgetName.toLowerCase(),
            ),
         ); */

            setIsOpenDetails(true);
            setSelectedItem(targetItem);
            return;
        }
        setSelectedItem(null);
    };

    const dateTimeFormat = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    } as const;

    return (
        <section className=" min-h-screen p-2 dark:bg-transparent space-y-4">
            <h2 className="mb-2 text-2xl font-semibold">Allocations</h2>
            <hr />
            <article className="flex flex-wrap lg:flex-nowrap gap-2 justify-between">
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface shadow-xl border border-t-fundar-brand-hover border-r-fundar-brand">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <CircleDollarSign className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">TOTAL ALLOCATED AMT.</p>
                        <span className="font-semibold text-lg">
                            {baseCurrency?.symbol}
                            {totalAllocated.toLocaleString()}
                        </span>
                        {/* <span className="flex gap-1 text-[0.6rem]">
                     <Info className="w-3 h-3" />
                     Sum total of all monies received in your fundar account
                  </span> */}
                    </div>
                </section>
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface shadow-xl border border-t-fundar-brand-hover border-r-fundar-brand">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <Wallet className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">UNALLOCATED AMT.</p>
                        <span className="font-semibold text-lg">
                            {baseCurrency?.symbol}
                            {unallocatedAmount.toLocaleString()}
                        </span>
                        {/* <span className="flex gap-1 text-[0.6rem]">
                     <Info className="w-3 h-3" />
                     Sum total of all monies received in your fundar account
                  </span> */}
                    </div>
                </section>
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface shadow-xl border border-t-fundar-brand-hover border-r-fundar-brand">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <Coins className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">NUMBER OF ALLOCATIONS</p>
                        <span className="font-semibold text-lg">
                            {allocations?.length}
                        </span>
                        {/* <span className="flex gap-1 text-[0.6rem]">
                     <Info className="w-3 h-3" />
                     Sum total of all monies received in your fundar account
                  </span> */}
                    </div>
                </section>
                <section className="flex flex-col w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.5rem)] rounded-xl bg-fundar-surface shadow-xl border border-t-fundar-brand border-r-fundar-brand">
                    <div className="flex flex-col gap-0.5 px-2 py-4">
                        <aside className="flex justify-end">
                            <span className="bg-fundar-brand text-fundar-brand-foreground p-2 rounded-full">
                                <ListChecks className="w-4 h-4" />
                            </span>
                        </aside>
                        <p className="text-xs">ALLOCATION CATEGORIES</p>
                        <span className="font-semibold text-lg">
                            {allocationOptions?.length}
                        </span>
                        {/* <span className="flex gap-1 text-[0.6rem]">
                     <Info className="w-3 h-3" />
                     Sum total of all monies received in your fundar account
                  </span> */}
                    </div>
                </section>
            </article>
            <hr />
            <article className="space-y-4">
                <h3 className="text-xl font-semibold">Allocation Stats</h3>

                <section className="flex flex-col gap-8 lg:flex-row justify-between">
                    <article className="lg:w-[calc(40%-1rem)]">
                        <AllocationsPagePieChart />
                    </article>
                    <article className="w-full lg:w-[calc(60%-1rem)]">
                        <div className="p-2 bg-fundar-surface-muted flex justify-between border-b rounded-t-xl">
                            <span className="font-bold text-sm w-[40%]">
                                Allocation Name
                            </span>
                            <span className="flex justify-center items-center font-bold text-sm w-[30%]">
                                Allocated Amount
                            </span>
                            <span className="font-bold text-sm w-[30%] flex justify-end items-center">
                                Allocated percentage
                            </span>
                        </div>

                        {allocationData.map((item, i) => (
                            <div
                                key={i}
                                className="p-2 hover:bg-fundar-surface-muted flex justify-between border-b"
                                onClick={() =>
                                    handleAllocationClick(item.budgetName)
                                }
                            >
                                <span className="w-[40%] font-semibold">
                                    {item.budgetName}
                                </span>
                                <span className="w-[30%] font-semibold flex justify-center">
                                    ${item.budgetAmount.toLocaleString()}
                                </span>
                                <span className="w-[30%] font-semibold flex justify-end">
                                    {(
                                        (item.budgetAmount / totalAllocated) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </span>
                            </div>
                        ))}
                    </article>
                </section>
            </article>
            <Sheet
                open={isOpenDetails}
                onOpenChange={setIsOpenDetails}
            >
                <SheetContent className="w-2/3 lg:w-2/6">
                    <SheetHeader className="mt-6">
                        <SheetTitle>{selectedItem?.budgetName}</SheetTitle>
                        {/*  <SheetDescription>
                     This action cannot be undone.
                  </SheetDescription> */}
                    </SheetHeader>
                    <hr />
                    <section className="space-y-4 p-6 overflow-y-auto">
                        <div className="space-y-2">
                            <h3>Total Allocated</h3>
                            <span className="text-xl font-semibold">
                                {baseCurrency?.symbol}
                                {selectedItem?.budgetAmount.toLocaleString()}
                            </span>
                        </div>
                        <hr />
                        <div className="space-y-2">
                            <h3>From Incomes - {linkedIncomes.length}</h3>
                            <hr />
                            <div className="pl-6 p-4 rounded-r-2xl border-l-3 border-l-orange-300 bg-amber-50 dark:bg-orange-600/20 space-y-2">
                                {linkedIncomes.length &&
                                    linkedIncomes.map((income) => (
                                        <p
                                            key={income._id}
                                            className="flex justify-between"
                                        >
                                            <span>{income.source}</span>
                                            <span>
                                                {baseCurrency?.symbol}
                                                {income.allocations
                                                    .find(
                                                        (item) =>
                                                            item.budgetName.toLowerCase() ===
                                                            selectedItem?.budgetName.toLowerCase(),
                                                    )
                                                    ?.budgetAmount.toLocaleString()}
                                            </span>
                                        </p>
                                    ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3>Allocation History</h3>
                            <hr />
                            <div className="space-y-1">
                                {linkedIncomes.length &&
                                    linkedIncomes
                                        .sort(
                                            (a, b) =>
                                                Number(new Date(b.createdAt)) -
                                                Number(new Date(a.createdAt)),
                                        )
                                        .map((income) => (
                                            <p
                                                key={income._id}
                                                className="flex justify-between border-b p-1"
                                            >
                                                <span>
                                                    {new Date(
                                                        income.createdAt,
                                                    ).toLocaleString(
                                                        "en-US",
                                                        dateTimeFormat,
                                                    )}
                                                </span>
                                                <span>
                                                    {baseCurrency?.symbol}
                                                    {income.allocations
                                                        .find(
                                                            (item) =>
                                                                item.budgetName.toLowerCase() ===
                                                                selectedItem?.budgetName.toLowerCase(),
                                                        )
                                                        ?.budgetAmount.toLocaleString()}
                                                </span>
                                            </p>
                                        ))}
                            </div>
                        </div>
                    </section>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default AllocationsPage;
