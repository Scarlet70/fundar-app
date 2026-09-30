import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

type JwtPayload = {
    exp: number;
};
/* 
const AuthSessionWatcher = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const logout = useAuthStore((state) => state.logout);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasHydrated || !accessToken) return;

        try {
            const { exp } = jwtDecode<JwtPayload>(accessToken);

            const expiresIn = exp * 1000 - Date.now();

            // Token has already expired
            if (expiresIn <= 0) {
                logout();

                navigate("/login", {
                    replace: true,
                    state: {
                        from: `${location.pathname}`,
                    },
                });
                return;
            }

            // Automatically logout when token expires
            const timeout = setTimeout(() => {
                logout();
                navigate("/login", {
                    replace: true,
                    state: {
                        from: `${location.pathname}`,
                    },
                });
            }, expiresIn);

            return () => clearTimeout(timeout);
        } catch (error) {
            // Invalid/malformed token
            logout();

            navigate("/login", {
                replace: true,
                state: {
                    from: `${location.pathname}`,
                },
            });
        }
    }, [accessToken, hasHydrated, logout, navigate, location.pathname]);

    return null;
}; */

const AuthSessionWatcher = () => {
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

    if (!hasHydrated) return null;

    return null;
};

export default AuthSessionWatcher;
