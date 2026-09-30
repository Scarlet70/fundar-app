import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import AddIncomeDialog from "@/components/incomeComponents/AddIncomeDialog";
import IncomeDetails from "@/components/incomeComponents/IncomeDetails";
import { useIncomeStore } from "@/stores/incomeStore";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getNetIncome } from "@/utils/helpers";
import { useState, useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";

import {
    ChevronRight,
    BadgeAlert,
    BadgeCheck,
    BadgeCent,
    Plus,
    SearchIcon,
    Search,
    PlusIcon,
} from "lucide-react";
import type { IncomeType } from "@/types/income";

import Noincomes from "../assets/noincomesimg.svg";
import Noresults from "../assets/nosearchresults.svg";

const IncomePage = () => {
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);
    const incomes = useIncomeStore((state) => state.incomes).sort(
        (a, b) =>
            new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate(),
    );
    const [selectedIncomeId, setSelectedIncomeId] = useState<
        string | undefined
    >(undefined);
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] =
        useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const totalNetIncome = incomes?.length
        ? incomes
              .map((income) => income.netAmount)
              .reduce((acc, curr) => acc + curr || 0)
        : 0;

    const incomeSources = [...new Set(incomes?.map((income) => income.source))];

    const dateFormat = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    } as const;

    const filteredIncomes = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return incomes;

        return incomes?.filter((income) =>
            [income.source, income.description]
                .filter(Boolean)
                .some((value) => value!.toLowerCase().includes(query)),
        );
    }, [incomes, search]);

    const getStatusBadge = (income: IncomeType) => {
        let badge =
            income.allocationStatus === "fully_allocated" ? (
                <Badge className="flex gap-2 items-center bg-green-100 border-green-600 [border:1px_solid] text-green-600">
                    <BadgeCheck />
                    <span className="text-[0.6rem] font-semibold">
                        {income.allocationStatus.replace("_", " ")}
                    </span>
                </Badge>
            ) : income.allocationStatus === "partially_allocated" ? (
                <Badge className="flex gap-2 items-center bg-yellow-100 border-yellow-600 [border:1px_solid] text-yellow-600">
                    <BadgeCent />
                    <span className="text-[0.6rem] font-semibold">
                        {income.allocationStatus.replace("_", " ")}
                    </span>
                </Badge>
            ) : (
                <Badge className="flex gap-2 items-center bg-slate-300 border-slate-600 [border:1px_solid] text-slate-600">
                    <BadgeAlert />
                    <span className="text-[0.6rem] font-semibold">
                        {income.allocationStatus}
                    </span>
                </Badge>
            );

        return badge;
    };

    let incomeListContent;

    if (incomes?.length && filteredIncomes?.length) {
        incomeListContent = (
            <article className="flex flex-col gap-2 w-full lg:w-[calc(60%-0.5rem)]">
                {filteredIncomes.map((income) => (
                    <section
                        key={income._id}
                        onClick={() => {
                            setSelectedIncomeId(income._id);
                            setIsSheetOpen(true);
                        }}
                        className="flex justify-between p-4 rounded-xl bg-fundar-surface-muted hover:border-x-3 hover:border-fundar-brand shadow-sm items-center"
                    >
                        <div className="flex flex-col justify-between md:flex-row md:gap-2 md:items-center w-[calc(50%-1rem)]">
                            <span className="text-[0.85rem] font-bold">
                                {income.source}
                            </span>
                            {getStatusBadge(income)}
                        </div>
                        <div className="flex justify-between items-center w-[calc(50%-0.5rem)]">
                            <div className="flex flex-col md:flex-row-reverse justify-between items-end w-[calc(90%-0.5rem)] ">
                                <h4 className="text-sm font-bold">{`${baseCurrency?.symbol}${getNetIncome(income).toLocaleString()}`}</h4>
                                <p className="text-xs">
                                    received on -{" "}
                                    {new Date(
                                        income.dateReceived,
                                    ).toLocaleDateString("en-US", dateFormat)}
                                </p>
                            </div>
                            <div>
                                <ChevronRight />
                            </div>
                        </div>
                    </section>
                ))}
                <Sheet
                    open={isSheetOpen}
                    onOpenChange={setIsSheetOpen}
                >
                    <SheetContent
                        side="right"
                        className="w-full sm:max-w-lg overflow-y-auto scrollbar-gutter-stable [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-fundar-surface-subtle [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500"
                    >
                        <div className="mt-6">
                            {selectedIncomeId && (
                                <IncomeDetails
                                    setIsSheetOpen={setIsSheetOpen}
                                    selectedIncomeId={selectedIncomeId}
                                    isEditDialogOpen={isEditDialogOpen}
                                    setIsEditDialogOpen={setIsEditDialogOpen}
                                    isOpenDeleteDialog={isOpenDeleteDialog}
                                    setIsOpenDeleteDialog={
                                        setIsOpenDeleteDialog
                                    }
                                />
                            )}
                        </div>
                        <SheetFooter className="sticky bottom-0 flex flex-row justify-between bg-slate-200 dark:bg-[#171717]">
                            <Button
                                variant={"secondary"}
                                className="p-6 rounded-4xl"
                                onClick={() => setIsSheetOpen(false)}
                            >
                                Close
                            </Button>
                            <div className="flex justify-between gap-2">
                                <Button
                                    variant={"destructive"}
                                    className="p-6 rounded-4xl"
                                    onClick={() => setIsOpenDeleteDialog(true)}
                                >
                                    Delete Income
                                </Button>
                                <Button
                                    className="p-6 rounded-4xl"
                                    onClick={() => setIsEditDialogOpen(true)}
                                >
                                    Edit Income
                                </Button>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </article>
        );
    } else if (incomes?.length && !filteredIncomes.length) {
        incomeListContent = (
            <div className="w-90 mx-auto my-20 flex flex-col items-center justify-center">
                <img
                    src={Noresults}
                    alt="no search results"
                    className="w-60 h-50 lg:w-75"
                />
                <p className="flex gap-2 items-end font-semibold">
                    ...0 incomes found for {search}... <Search />{" "}
                </p>
                <Button
                    variant={"outline"}
                    className="flex gap-2 p-4 rounded-4xl"
                >
                    Create a New Income <Plus />{" "}
                </Button>
            </div>
        );
    } else {
        incomeListContent = (
            <section className="flex flex-col gap-1 mx-auto w-[80%] lg:w-[60%] items-center">
                <img
                    src={Noincomes}
                    alt="empty incomes state"
                    className="lg:w-75 w-50 mx-auto"
                />
                <h3 className="font-semibold text-lg">
                    No incomes to display yet!
                </h3>
                <span className="text-center text-sm">
                    click the button below to create and allocate a new income
                </span>
                <Button className="flex gap-2 p-6 rounded-4xl w-3/5 lg:w-2/5">
                    Create a New Income <Plus />{" "}
                </Button>
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-2 p-4">
            <div className="flex flex-col gap-2 bg-fundar-surface-muted shadow-xl rounded-xl p-4">
                <div className="p-4 font-semibold rounded-2xl bg-fundar-brand text-fundar-text mb-10 w-full lg:w-1/2">
                    <h2 className="text-2xl">All time fundar income stats</h2>
                    <ul>
                        <li>
                            Incomes - <span>{incomes?.length}</span>
                        </li>
                        <li>
                            Total Amount received in{" "}
                            <span>
                                {baseCurrency?.symbol} {baseCurrency?.code}
                            </span>{" "}
                            -{" "}
                            <span>
                                {baseCurrency?.symbol}
                                {totalNetIncome.toLocaleString()}
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="font-semibold text-xl">Income Sources - </p>
                    {incomeSources.map((item, i) => (
                        <p
                            key={i}
                            className="text-sm border-b p-2 w-full lg:w-1/2 hover:bg-fundar-brand-soft"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>
            <article className="flex justify-between items-end p-4">
                <div className="flex flex-col lg:flex-row lg:items-center w-[60%] justify-between gap-4">
                    <h2>Income Transactions List</h2>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="lg:w-[50%] bg-white dark:bg-transparent"
                    >
                        <InputGroup>
                            <InputGroupInput
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                            />
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                {search &&
                                    `...search results - ${filteredIncomes.length}`}
                            </InputGroupAddon>
                        </InputGroup>
                    </form>
                </div>
                <Button
                    className="p-6 rounded-4xl"
                    onClick={() => setIsDialogOpen(true)}
                >
                    Add Income <PlusIcon />
                </Button>
            </article>
            <section className="flex flex-col lg:flex-row justify-between min-h-[70vh]">
                {incomeListContent}

                {/* <article className="w-full lg:w-[calc(40%-0.5rem)] bg-rose-300 rounded-xl">
               Add Donut chart for incomes
            </article> */}
                <div className="lg:w-[calc(40%-0.5rem)] p-4 bg-blue-500">
                    Chart
                </div>
            </section>
            <AddIncomeDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </section>
    );
};

export default IncomePage;
