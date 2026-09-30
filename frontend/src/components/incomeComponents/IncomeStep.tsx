import {
    useFormContext,
    useWatch,
    Controller,
    useFormState,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Creatable from "react-select/creatable";
import type { IncomeFormValues } from "./IncomeWizard";
import { useAuthStore } from "@/stores/authStore";

interface FormProps {
    nextStep: () => void;
}

interface CurrencyOption {
    value: string;
    label: string;
    symbol: string;
}

const currencies: CurrencyOption[] = [
    {
        value: "USD",
        label: "US Dollar",
        symbol: "$",
    },
];

export default function IncomeStep({ nextStep }: FormProps) {
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);
    const { register, control } = useFormContext<IncomeFormValues>();
    const { errors } = useFormState({
        control,
    });

    const isTaxApplied = useWatch({
        control,
        name: "taxApplied",
    });

    const grossAmount = useWatch({
        control,
        name: "grossAmount",
    });

    const taxPercentage = useWatch({
        control,
        name: "taxPercentage",
    });

    const taxAmount = isTaxApplied ? (grossAmount * taxPercentage) / 100 : 0;

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="source">Income Name</label>
                <Input
                    {...register("source", {
                        required: "income name is required!",
                        minLength: {
                            value: 3,
                            message:
                                "Income name must contain at least 3 characters.",
                        },
                    })}
                    id="source"
                    placeholder="enter the income source e.g Freelance gig"
                    required
                />
                <p className="text-xs text-red-500">{errors.source?.message}</p>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="description">
                    Income Description{" "}
                    <span className="text-xs italic">(*optional)</span>
                </label>
                <Textarea
                    id="description"
                    {...register("description")}
                />
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-1 w-[calc(30%-1rem)]">
                    <label htmlFor="amount">Income Amount</label>
                    <Input
                        type="number"
                        id="grossAmount"
                        placeholder="enter the received amount"
                        {...register("grossAmount", {
                            valueAsNumber: true,
                            required: "please enter the income amount!",
                            min: {
                                value: 1,
                                message: "Income must be greater than zero",
                            },
                        })}
                        required
                    />
                    <p className="text-xs text-red-500">
                        {errors.grossAmount?.message}
                    </p>
                </div>
                <div className="flex flex-col gap-1 w-[calc(40%-1rem)]">
                    <label htmlFor="dateReceived">Date Received</label>
                    <Input
                        {...register("dateReceived", {
                            required: "select the receipt date",
                        })}
                        id="dateReceived"
                        type="date"
                    />
                    <p className="text-xs text-red-500">
                        {errors.dateReceived?.message}
                    </p>
                </div>
                <div className="flex flex-col gap-1 w-[calc(35%-1rem)]">
                    <label htmlFor="currency">Currency</label>

                    <Creatable
                        value={{
                            value: baseCurrency?.value,
                            label: `${baseCurrency?.symbol} ${baseCurrency?.value}`,
                        }}
                        classNames={{
                            control: () => `!bg-fundar-surface`,

                            placeholder: () => "!text-fundar-text-muted",

                            singleValue: () => "!text-fundar-text",

                            menu: () =>
                                "!bg-fundar-surface-subtle!border !border-fundar-brand",

                            menuList: () =>
                                "!bg-fundar-surface-muted !border !border-fundar-brand-muted",

                            option: ({ isFocused, isSelected }) =>
                                `!text-fundar-text ${
                                    isSelected
                                        ? "!bg-fundar-brand"
                                        : isFocused
                                          ? "!bg-fundar-surface-muted"
                                          : "!bg-fundar-surface"
                                }`,

                            noOptionsMessage: () => "!text-fundar-text-muted",

                            dropdownIndicator: () => "!text-fundar-text-muted",

                            clearIndicator: () => "!text-fundar-text-muted",
                        }}
                    />
                </div>
            </div>
            <section className="flex justify-between">
                <div className="flex flex-col gap-1 w-[calc(33%-0.5rem)]">
                    <FieldGroup className="mx-auto w-56">
                        <Field orientation="horizontal">
                            <Controller
                                name="taxApplied"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="taxApplied"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                            <FieldLabel htmlFor="taxApplied">
                                Apply Tax
                            </FieldLabel>
                        </Field>
                    </FieldGroup>
                </div>

                <div className="flex flex-col gap-1 w-[calc(33%-0.5rem)]">
                    <label htmlFor="taxPercentage">Tax in %</label>
                    <Input
                        type="number"
                        id="taxPercentage"
                        disabled={!isTaxApplied}
                        {...register("taxPercentage", {
                            valueAsNumber: true,
                            validate: (value) => {
                                if (!isTaxApplied) return true;

                                if (
                                    value === undefined ||
                                    Number.isNaN(value)
                                ) {
                                    return "Please specify a tax percentage.";
                                }
                                if (value < 0) {
                                    return "Tax percentage cannot be negative.";
                                }
                                if (value > 100) {
                                    return "Tax percentage cannot exceed 100%.";
                                }
                                return true;
                            },
                        })}
                    />
                    <p className="text-xs text-red-500">
                        {errors.taxPercentage?.message}
                    </p>
                </div>

                <div className="flex flex-col gap-1 w-[calc(33%-0.5rem)]">
                    <label htmlFor="taxPercentage">
                        Tax Amount in
                        <span>
                            {baseCurrency?.symbol}
                            {baseCurrency?.code}
                        </span>
                    </label>
                    <Input
                        value={taxAmount}
                        disabled
                        className="dark:bg-[#171717]"
                    />
                </div>
            </section>

            <div className="flex justify-end">
                <Button
                    type="button"
                    onClick={nextStep}
                    className="mt-2 p-6 rounded-4xl"
                    variant={"outline"}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
