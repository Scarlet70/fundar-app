import api from "./api";

import type { EditUserDetailsType } from "@/types/user";

const editUserApi = async (data: EditUserDetailsType) => {
    const response = await api.patch("/users/me", data);
    return response.data;
};

export { editUserApi };
