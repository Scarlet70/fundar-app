import { useState } from "react";
import type { AllocationFormValues } from "@/types/income";
import { buildIncome } from "@/utils/helpers";
import { toast } from "../ui/toast";
import { Link } from "react-router-dom";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useIncomeStore } from "@/stores/incomeStore";
import { useAuthStore } from "@/stores/authStore";

import IncomeStep from "./IncomeStep";
import AllocationStep from "./AllocationStep";
import { DialogHeader } from "../ui/dialog";
import { createIncomeApi } from "@/api/incomesApi";
import handleApiErrorToast from "@/utils/handleApiErrorToast";
import { ArrowRight } from "lucide-react";

interface IncomeWizardProps {
    onClose: () => void;
}

export interface IncomeFormValues {
    source: string;
    description: string;
    grossAmount: number;
    currency: string;
    taxApplied: boolean;
    taxPercentage: number;
    dateReceived: string;

    allocations: AllocationFormValues[];
}

export default function IncomeWizard({ onClose }: IncomeWizardProps) {
    const [step, setStep] = useState(1);
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);
    const addIncome = useIncomeStore((state) => state.addIncome);

    const methods = useForm<IncomeFormValues>({
        defaultValues: {
            source: "",
            description: "",
            grossAmount: 0,
            currency: "USD",
            taxApplied: false,
            taxPercentage: 0,
            dateReceived: "",
            allocations: [],
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const grossAmount = useWatch({
        control: methods.control,
        name: "grossAmount",
    });

    const taxApplied = useWatch({
        control: methods.control,
        name: "taxApplied",
    });

    const taxPercentage = useWatch({
        control: methods.control,
        name: "taxPercentage",
    });

    const currentIncome = useWatch({
        control: methods.control,
        name: "source",
    });

    const taxAmount = taxApplied ? (grossAmount * taxPercentage) / 100 : 0;

    const netIncome = grossAmount - taxAmount;

    const nextStep = async () => {
        const valid = await methods.trigger([
            "source",
            "grossAmount",
            "dateReceived",
            "taxPercentage",
        ]);

        if (!valid) return;

        setStep(2);
    };

    const previousStep = () => {
        setStep(1);
    };

    const createIncome = async (data: IncomeFormValues) => {
        const newIncome = buildIncome(data, netIncome, taxAmount);

        if (newIncome.allocations) {
            newIncome.allocations.map((item) =>
                item.budgetName
                    .trim()
                    .replace(/\s+/g, " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase()),
            );
        }

        onClose();

        try {
            const response = await toast.promise(createIncomeApi(newIncome), {
                loading: {
                    title: "creating new income",
                    description: "Please wait while update the database...",
                },
                success: (response) => ({
                    title: "Success",
                    description: response.message,
                }),
                error: handleApiErrorToast,
            });

            addIncome(response.data.income);
        } catch {}

        methods.reset({
            source: "",
            description: "",
            grossAmount: 0,
            currency: "USD",
            taxApplied: false,
            taxPercentage: 0,
            dateReceived: "",
            allocations: [],
        });

        setStep(1);
    };

    return (
        <FormProvider {...methods}>
            <DialogHeader>
                <h2 className="font-semibold">
                    {step === 1
                        ? "Add a new Income Source"
                        : `Budget this Income - (${currentIncome})`}
                </h2>
                <div className="flex flex-col items-end">
                    <p>
                        Base Currency - {baseCurrency?.value} (
                        {baseCurrency?.code})
                    </p>
                    <Link
                        to={"/settings"}
                        className="italic text-xs flex items-center gap-2 hover:underline"
                    >
                        change in settings <ArrowRight size={20} />
                    </Link>
                </div>
            </DialogHeader>
            <form
                onSubmit={methods.handleSubmit(createIncome)}
                noValidate
            >
                {step === 1 && <IncomeStep nextStep={nextStep} />}

                {step === 2 && (
                    <AllocationStep
                        previousStep={previousStep}
                        netIncome={netIncome}
                    />
                )}
            </form>
        </FormProvider>
    );
}
