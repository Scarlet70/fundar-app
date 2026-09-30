import api from "./api";
import type { LoginDetailsType, SignupDetailsType } from "@/types/auth";

const loginApi = async (formData: LoginDetailsType) => {
    const response = await api.post("/auth/login", formData, {
        withCredentials: true,
    });
    return response.data;
};

const signupApi = async (formData: SignupDetailsType) => {
    const response = await api.post("/auth/signup", formData, {
        withCredentials: true,
    });
    return response.data;
};

export { loginApi, signupApi };
