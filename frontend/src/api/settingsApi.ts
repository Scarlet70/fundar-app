import api from "./api";
import type {
    BaseCurrencyDetailsType,
    DefaultAllocationType,
} from "@/types/settings";

const updateBaseCurrencyApi = async (data: BaseCurrencyDetailsType) => {
    const response = await api.patch("/settings/currency", data);

    return response.data;
};

const updateAllocationsApi = async (data: Partial<DefaultAllocationType>) => {
    const response = await api.patch("/settings/allocations", data);

    return response.data;
};

const deleteAllocationsApi = async (id: string) => {
    const response = await api.delete(`/settings/allocations/${id}`);
    return response.data;
};

export { updateBaseCurrencyApi, updateAllocationsApi, deleteAllocationsApi };
