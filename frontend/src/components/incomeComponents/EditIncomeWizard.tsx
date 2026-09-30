import { useState } from "react";
import type { EditAllocationFormValues } from "@/types/income";
import { buildIncome } from "@/utils/helpers";
import { toast } from "../ui/toast";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useIncomeStore } from "@/stores/incomeStore";

import EditIncomeStep from "./EditIncomeStep";
import EditAllocationStep from "./EditAllocationStep";
import { DialogHeader } from "../ui/dialog";
import { useAuthStore } from "@/stores/authStore";
import { updateIncomeApi } from "@/api/incomesApi";
import handleApiErrorToast from "@/utils/handleApiErrorToast";
import { ArrowRight } from "lucide-react";

interface EditIncomeWizardProps {
    selectedIncomeId: string;
    onClose: () => void;
    setIsSheetOpen: (isSheetOpen: boolean) => void;
}

/* type CurrencyOption = {
   currency: "USD" | "NGN" | "GBP";
}; */

export interface EditIncomeFormValues {
    source: string;
    description: string;
    grossAmount: number;
    currency: string;
    taxApplied: boolean;
    taxPercentage: number;
    dateReceived: string;

    allocations: EditAllocationFormValues[];
}

export default function EditIncomeWizard({
    onClose,
    selectedIncomeId,
    setIsSheetOpen,
}: EditIncomeWizardProps) {
    const [step, setStep] = useState(1);
    const updateIncome = useIncomeStore((state) => state.updateIncome);
    const incomes = useIncomeStore((state) => state.incomes);
    const incomeToUpdate = incomes.find(
        (income) => income._id === selectedIncomeId,
    );
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);

    const methods = useForm<EditIncomeFormValues>({
        defaultValues: {
            source: incomeToUpdate?.source,
            description: incomeToUpdate?.description,
            grossAmount: incomeToUpdate?.grossAmount,
            currency: incomeToUpdate?.currency,
            taxApplied: incomeToUpdate?.taxApplied,
            taxPercentage: incomeToUpdate?.taxPercentage,
            dateReceived: incomeToUpdate?.dateReceived,
            allocations: incomeToUpdate?.allocations,
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

    const editIncome = async (data: EditIncomeFormValues) => {
        const updatedIncome = buildIncome(data, netIncome, taxAmount);

        try {
            const response = await toast.promise(
                updateIncomeApi(updatedIncome, selectedIncomeId),
                {
                    loading: {
                        title: "creating new income",
                        description: "Please wait while update the database...",
                    },
                    success: (response) => ({
                        title: "Success",
                        description: response.message,
                    }),
                    error: handleApiErrorToast,
                },
            );

            updateIncome(selectedIncomeId, response.data.income);
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
        onClose();
        setIsSheetOpen(false);
    };

    return (
        <FormProvider {...methods}>
            <DialogHeader>
                <h2 className="font-semibold">
                    {step === 1
                        ? "Edit this Income Source"
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
                onSubmit={methods.handleSubmit(editIncome)}
                noValidate
            >
                {step === 1 && (
                    <EditIncomeStep
                        selectedIncomeId={selectedIncomeId}
                        nextStep={nextStep}
                    />
                )}

                {step === 2 && (
                    <EditAllocationStep
                        selectedIncomeId={selectedIncomeId}
                        previousStep={previousStep}
                        netIncome={netIncome}
                    />
                )}
            </form>
        </FormProvider>
    );
}
