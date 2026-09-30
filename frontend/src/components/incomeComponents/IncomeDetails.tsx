import { getTaxAmount, getNetIncome } from "@/utils/helpers";
import { useIncomeStore } from "@/stores/incomeStore";
import EditIncomeDialog from "./EditIncomeDialog";
import ConfirmDeleteIncome from "./ConfirmDeleteIncome";
import type { Allocation } from "@/types/income";
import { useAuthStore } from "@/stores/authStore";

//DataTable Imports;

type IncomeDetailsProps = {
    selectedIncomeId: string;
    setIsSheetOpen: (isSheetOpen: boolean) => void;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (isEditDialogOpen: boolean) => void;
    isOpenDeleteDialog: boolean;
    setIsOpenDeleteDialog: (isOpenDeleteDialog: boolean) => void;
};

const IncomeDetails = ({
    setIsSheetOpen,
    selectedIncomeId,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isOpenDeleteDialog,
    setIsOpenDeleteDialog,
}: IncomeDetailsProps) => {
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);
    const income = useIncomeStore((state) =>
        state.getIncomeById(selectedIncomeId),
    );

    const allocatedTotal = income?.allocations
        ? income?.allocations.reduce(
              (sum: number, allocation: Allocation) =>
                  sum + (allocation.budgetAmount || 0),
              0,
          )
        : 0;

    const remainingBalance =
        income?.netAmount && allocatedTotal
            ? income?.netAmount - allocatedTotal
            : income?.netAmount;

    const dateTimeFormat = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    } as const;

    /* const incomeTableList = () => {}; */

    return (
        income && (
            <section className="space-y-6 p-4 relative ">
                <div>
                    <h2 className="text-2xl font-bold">{income.source}</h2>
                    <p className="text-muted-foreground">
                        Created on{" "}
                        {new Date(income.createdAt).toLocaleString(
                            "en-US",
                            dateTimeFormat,
                        )}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                            Gross Amount
                        </p>
                        <p className="text-xl font-semibold">
                            {baseCurrency?.symbol}
                            {income.grossAmount.toLocaleString()}
                        </p>
                    </div>

                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                            Net Amount
                        </p>
                        <p className="text-xl font-semibold text-green-600">
                            {baseCurrency?.symbol}
                            {getNetIncome(income).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Tax Applied</p>
                    <p className="font-medium">
                        {income.taxApplied
                            ? `${income.taxPercentage}% (${getTaxAmount(income)})`
                            : "No tax applied"}
                    </p>
                </div>
                {income.description && (
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                            Description
                        </p>
                        <p className="font-medium">{income.description}</p>
                    </div>
                )}
                <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">
                        Allocation Status
                    </p>
                    <p className="font-medium capitalize flex gap-2 items-center">
                        <span
                            className={`w-2 h-2 rounded-full ${income.allocationStatus === "partially_allocated" ? "bg-amber-300" : income.allocationStatus === "unallocated" ? "bg-slate-400" : "bg-green-400"} `}
                        ></span>
                        {income.allocationStatus.replace("_", " ")}
                    </p>
                </div>
                <div className="rounded-lg border p-4">
                    <h4 className="text-sm text-muted-foreground">
                        Allocations - Amount in ({baseCurrency?.symbol}{" "}
                        {baseCurrency?.code})
                    </h4>
                    <ul className="font-medium capitalize">
                        {income.allocations?.map((item) => (
                            <li
                                key={item._id}
                            >{`${item.budgetName} - ${baseCurrency?.symbol} ${item.budgetAmount.toLocaleString()}`}</li>
                        ))}
                        {!income.allocations.length && (
                            <p>No allocations yet</p>
                        )}
                    </ul>
                </div>

                <div className="rounded-lg border p-4">
                    <h4>
                        Total Allocated from this income in {baseCurrency?.code}{" "}
                        - {baseCurrency?.symbol}
                        {allocatedTotal.toLocaleString()}
                    </h4>

                    <h4>
                        Remaining Unallocated Balance in {baseCurrency?.code} -{" "}
                        {baseCurrency?.symbol}
                        {remainingBalance?.toLocaleString()}
                    </h4>
                </div>

                <div className="rounded-lg border p-4">
                    <h4 className="text-sm text-muted-foreground">
                        This Income was received on -
                        {new Date(income.dateReceived).toLocaleString(
                            "en-US",
                            dateTimeFormat,
                        )}
                    </h4>
                    {income.editedAt && (
                        <h4 className="text-slate-500">
                            Last edited on -{" "}
                            {new Date(income.editedAt).toLocaleString(
                                "en-US",
                                dateTimeFormat,
                            )}
                        </h4>
                    )}
                </div>
                <EditIncomeDialog
                    selectedIncomeId={selectedIncomeId}
                    isEditDialogOpen={isEditDialogOpen}
                    setIsEditDialogOpen={setIsEditDialogOpen}
                    setIsSheetOpen={setIsSheetOpen}
                />
                {isOpenDeleteDialog && (
                    <ConfirmDeleteIncome
                        setIsSheetOpen={setIsSheetOpen}
                        selectedIncomeId={selectedIncomeId}
                        isOpenDeleteDialog={isOpenDeleteDialog}
                        setIsOpenDeleteDialog={setIsOpenDeleteDialog}
                    />
                )}
            </section>
        )
    );
};

export default IncomeDetails;
