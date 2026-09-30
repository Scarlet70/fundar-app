import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SettingsType } from "@/types/settings";
import type { UserType } from "@/types/user";

type AuthState = {
    user: UserType | null;
    settings: SettingsType | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    hasHydrated: boolean;

    setAuth: (
        user: UserType,
        settings: SettingsType | null,
        accessToken: string | null,
    ) => void;

    setAccessToken: (accessToken: string) => void;

    setHasHydrated: (value: boolean) => void;

    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            settings: null,
            accessToken: null,
            isAuthenticated: false,
            hasHydrated: false,

            setAuth: (user, settings, accessToken) => {
                set({
                    user,
                    settings,
                    accessToken,
                    isAuthenticated: true,
                });
            },

            setAccessToken: (accessToken) => {
                set({
                    accessToken,
                });
            },

            setHasHydrated: (value) => {
                set({
                    hasHydrated: value,
                });
            },

            logout: () => {
                set({
                    user: null,
                    settings: null,
                    accessToken: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: "fundar-auth",

            partialize: (state) => ({
                user: state.user,
                settings: state.settings,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),

            onRehydrateStorage: () => (state, error) => {
                console.log("Zustand hydration finished", {
                    state,
                    error,
                });

                if (!error) {
                    state?.setHasHydrated(true);
                }
            },
        },
    ),
);
