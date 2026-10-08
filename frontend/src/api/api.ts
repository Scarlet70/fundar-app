import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
    baseURL: /* "http://localhost:5000/api/fundar/v1" */ import.meta.env
        .VITE_API_URL,
    timeout: 9000,
});

export const refreshApi = axios.create({
    baseURL: /* "http://localhost:5000/api/fundar/v1" */ import.meta.env
        .VITE_API_URL,
    timeout: 9000,
});

api.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const response = await refreshApi.post(
                "/auth/refresh",
                {},
                {
                    withCredentials: true,
                },
            );

            const newAccessToken = response.data.accessToken;

            useAuthStore.getState().setAccessToken(newAccessToken);

            return newAccessToken;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

api.interceptors.response.use(
    //if there is a valid response, return the response to the client/frontend
    (response) => response,

    //however, if there is an error, we handle it here
    async (error) => {
        //original request is usually stored by axios in the error.config;
        const originalRequest = error.config;

        //if the error is not an authorized error issue, then return the error to the the user
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        //if the original request has been retried and still gives an error, then just return the error to the user to avoid an endless loop of retries
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const newAccessToken = await refreshAccessToken();

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);
        } catch (refreshError) {
            useAuthStore.getState().logout();

            return Promise.reject(refreshError);
        }
    },
);

export default api;
