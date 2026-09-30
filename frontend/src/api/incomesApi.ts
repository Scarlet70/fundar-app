import type { IncomeFormValues } from "@/components/incomeComponents/IncomeWizard";
import type { EditIncomeFormValues } from "@/components/incomeComponents/EditIncomeWizard";
import api from "./api";

const getUserIncomesApi = async () => {
    const response = await api.get("/incomes");

    return response.data;
};

const createIncomeApi = async (data: IncomeFormValues) => {
    const response = await api.post("/incomes", data);
    console.log(response);
    return response.data;
};

const updateIncomeApi = async (data: EditIncomeFormValues, id: string) => {
    const response = await api.patch(`/incomes/${id}`, data);

    return response.data;
};

const deleteIncomeApi = async (id: string) => {
    const response = await api.delete(`/incomes/${id}`);

    return response.data;
};

export { createIncomeApi, getUserIncomesApi, updateIncomeApi, deleteIncomeApi };
