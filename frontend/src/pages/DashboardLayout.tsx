import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Outlet } from "react-router-dom";
import DashboardNavBar from "@/components/layout/DashboardNavBar";
import { useEffect } from "react";
import { useIncomeStore } from "@/stores/incomeStore";
import { getUserIncomesApi } from "@/api/incomesApi";
import { toast } from "@/components/ui/toast";
import handleApiErrorToast from "@/utils/handleApiErrorToast";

const DashboardLayout = () => {
    const setIncomes = useIncomeStore((state) => state.setIncomes);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await toast.promise(getUserIncomesApi(), {
                    loading: {
                        title: "fetching details",
                        description:
                            "Please wait while we retrieve your data...",
                    },
                    success: (response) => ({
                        title: "Data Retrieved",
                        description: response.message,
                    }),
                    error: handleApiErrorToast,
                });

                setIncomes(response.data.incomes);
            } catch {}
        };

        fetchIncomes();
    }, [setIncomes]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="mt-4 w-9 h-9 cursor-pointer" />
            <main className="flex-1">
                <DashboardNavBar />
                <section>
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;
