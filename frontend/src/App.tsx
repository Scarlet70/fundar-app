import AuthSessionWatcher from "./components/auth/AuthSessionWatcher";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import IncomePage from "./pages/IncomePage";
import AllocationsPage from "./pages/AllocationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Settings from "./pages/Settings";
import AdminPanel from "./pages/AdminPanel";
import { Toaster } from "@/components/ui/toast";

const App = () => {
    return (
        <>
            <AuthSessionWatcher />
            <Routes>
                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/income"
                            element={<IncomePage />}
                        />

                        <Route
                            path="/allocations"
                            element={<AllocationsPage />}
                        />

                        <Route
                            path="/analytics"
                            element={<AnalyticsPage />}
                        />

                        <Route
                            path="/settings"
                            element={<Settings />}
                        />
                        <Route
                            path="/admin"
                            element={<AdminPanel />}
                        />
                    </Route>
                </Route>
            </Routes>
            <Toaster />
        </>
    );
};

export default App;
