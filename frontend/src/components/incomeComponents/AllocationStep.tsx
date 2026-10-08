import {
    useFieldArray,
    useFormContext,
    useWatch,
    useFormState,
} from "react-hook-form";
import { useMemo } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PiggyBank, Plus, Trash, TriangleAlert } from "lucide-react";
import type { IncomeFormValues } from "./IncomeWizard";
import type { AllocationFormValues } from "@/types/income";
import Creatable from "react-select/creatable";
import { Controller } from "react-hook-form";
import { useAuthStore } from "@/stores/authStore";

interface FormProps {
    previousStep: () => void;
    netIncome: number;
}

type AllocationOption = {
    value: string;
    label: string;
};

export default function AllocationStep({ previousStep, netIncome }: FormProps) {
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);
    const defaultAllocations = useAuthStore(
        (state) => state.settings?.defaultAllocations,
    );

    const { control, register } = useFormContext<IncomeFormValues>();
    const { errors } = useFormState<IncomeFormValues>({
        control,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "allocations",
    });

    const allocations = useWatch({
        control: control,
        name: "allocations",
        defaultValue: [],
    });

    const allocated = allocations.reduce(
        (sum: number, allocation: AllocationFormValues) =>
            sum + (allocation.budgetAmount || 0),
        0,
    );

    const remainingBalance = netIncome - allocated;

    const allocationOptions: AllocationOption[] = useMemo(
        () =>
            defaultAllocations
                ?.map((option) => option.name)
                .sort((a, b) => a.localeCompare(b))
                .map((name) => ({
                    label: name,
                    value: name,
                })) ?? [],
        [defaultAllocations],
    );

    return (
        <section>
            <div className=" flex flex-col outline outline-fundar-brand-muted rounded-2xl p-4">
                <section className="p-6 flex flex-col gap-1 mb-4 min-h-5 max-h-40 overflow-y-auto scrollbar-gutter-stable [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-fundar-surface-subtle [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <section className="flex justify-between items-end">
                                <div className="flex flex-col gap-2 w-[calc(60%-1rem)] ">
                                    <label htmlFor="budgetName">Name</label>
                                    <Controller
                                        control={control}
                                        name={`allocations.${index}.budgetName`}
                                        rules={{
                                            required: "Budget name is required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Must contain at least 3 characters",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Creatable
                                                classNames={{
                                                    control: () =>
                                                        `!bg-fundar-surface`,

                                                    placeholder: () =>
                                                        "!text-fundar-text-muted",

                                                    input: () =>
                                                        "!text-fundar-text",

                                                    singleValue: () =>
                                                        "!text-fundar-text",

                                                    menu: () =>
                                                        "!bg-fundar-surface-subtle!border !border-fundar-brand",

                                                    menuList: () =>
                                                        "!bg-fundar-surface-muted !border !border-fundar-brand-muted",

                                                    option: ({
                                                        isFocused,
                                                        isSelected,
                                                    }) =>
                                                        `!text-fundar-text ${
                                                            isSelected
                                                                ? "!bg-fundar-brand"
                                                                : isFocused
                                                                  ? "!bg-fundar-surface-muted"
                                                                  : "!bg-fundar-surface"
                                                        }`,

                                                    noOptionsMessage: () =>
                                                        "!text-fundar-text-muted",

                                                    dropdownIndicator: () =>
                                                        "!text-fundar-text-muted",

                                                    clearIndicator: () =>
                                                        "!text-fundar-text-muted",
                                                }}
                                                options={allocationOptions}
                                                value={
                                                    field.value
                                                        ? {
                                                              label: field.value,
                                                              value: field.value,
                                                          }
                                                        : null
                                                }
                                                onChange={(option) =>
                                                    field.onChange(
                                                        option?.value ?? "",
                                                    )
                                                }
                                                placeholder="Select or create a budget"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 w-[calc(30%-1rem)]">
                                    <label htmlFor="budgetAmount">Amount</label>
                                    <Input
                                        type="number"
                                        {...register(
                                            `allocations.${index}.budgetAmount`,
                                            {
                                                valueAsNumber: true,
                                                required:
                                                    "enter an amount to allocate",
                                                min: {
                                                    value: 1,
                                                    message:
                                                        "Amount must be greater than zero",
                                                },
                                            },
                                        )}
                                    />
                                </div>

                                <div className=" flex justify-endw-[calc(15%)]">
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant={"destructive"}
                                        className="flex gap-2"
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </section>
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-red-500">
                                    {
                                        errors.allocations?.[index]?.budgetName
                                            ?.message
                                    }
                                </p>
                                <p className="text-xs text-red-500">
                                    {
                                        errors.allocations?.[index]
                                            ?.budgetAmount?.message
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="flex justify-between">
                    <Button
                        type="button"
                        onClick={() =>
                            append({
                                budgetName: "",
                                budgetAmount: 0,
                            })
                        }
                        className="flex gap-2"
                    >
                        Add Allocation <Plus />
                    </Button>
                    <Button
                        variant={"outline"}
                        type="button"
                        className="flex gap-2 items-center"
                        onClick={() =>
                            append({
                                budgetName: "Savings",
                                budgetAmount: 0,
                            })
                        }
                    >
                        Allocate to savings <PiggyBank />
                    </Button>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-fundar-text p-2 rounded-xl mb-2 font-semibold">{`Amount available to allocate - ${baseCurrency?.symbol}${netIncome.toLocaleString()}`}</p>
                <div className="flex flex-col gap-2">
                    <p className="bg-fundar-warning-soft/50 text-fundar-warning outline outline-fundar-warning/30 p-2 rounded-md mb-2">{`Amount Allocated: ${baseCurrency?.symbol}${allocated.toLocaleString()}`}</p>
                    {remainingBalance < 0 && (
                        <span className="flex gap-2 items-center text-xs text-fundar-negative">
                            <TriangleAlert size={15} />
                            You have allocated more than you have available from
                            this current income
                        </span>
                    )}
                </div>
                <p
                    className={`${remainingBalance < 0 ? `bg-fundar-negative-soft/40` : `bg-fundar-positive-soft/40`} ${remainingBalance < 0 ? `text-fundar-negative` : `text-fundar-positive`} p-2 rounded-md ${remainingBalance < 0 ? `outline-fundar-negative/40` : `outline-fundar-positive/40`} outline`}
                >{`Balance Remaining: ${baseCurrency?.symbol}${remainingBalance.toLocaleString()}`}</p>
            </div>

            <div className="flex mt-8 mb-4 gap-3 justify-between">
                <Button
                    type="button"
                    onClick={previousStep}
                    className="p-6 rounded-4xl"
                    variant={"outline"}
                >
                    Back
                </Button>

                <Button
                    type="submit"
                    disabled={remainingBalance < 0}
                    className="p-6 rounded-4xl"
                >
                    Save Income
                </Button>
            </div>
        </section>
    );
}
