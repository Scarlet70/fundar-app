import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Wallet,
    ChartPie,
    ChartNoAxesCombined,
    Settings,
    WalletCards,
    LayoutDashboard,
    LogOut,
    ChevronsUpDown,
    ShieldCheck,
    Home,
} from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/authStore";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
    const location = useLocation();
    const { isMobile, setOpenMobile } = useSidebar();

    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }, [location.pathname, isMobile, setOpenMobile]);

    const currentUser = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const sidebarItems = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Income",
            url: "/income",
            icon: Wallet,
        },
        {
            title: "Allocations",
            url: "/allocations",
            icon: ChartPie,
        },
        {
            title: "Analytics",
            url: "/analytics",
            icon: ChartNoAxesCombined,
        },
        {
            title: "Back to Home",
            url: "/",
            icon: Home,
        },
    ];

    return (
        <Sidebar>
            <section className="p-4 space-y-4 flex flex-col justify-between h-full">
                <SidebarHeader className="p-3 px-4 rounded-2xl bg-orange-400 dark:bg-orange-500 transition-all duration-200">
                    <h3 className="flex gap-1 text-md font-bold">
                        <WalletCards className="w-5 h-5" /> Fundar
                    </h3>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {sidebarItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    render={
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 ${
                                                    isActive
                                                        ? "font-medium text-orange-600"
                                                        : "text-muted-foreground hover:bg-orange-50"
                                                }`
                                            }
                                        />
                                    }
                                >
                                    <item.icon />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu className="space-y-2">
                        <SidebarMenuItem className="flex items-center gap-2">
                            <SidebarMenuButton
                                render={<NavLink to={"/admin"} />}
                            >
                                <ShieldCheck />
                                <span>Admin Panel</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem className="flex items-center gap-2">
                            <SidebarMenuButton
                                render={<NavLink to={"/settings"} />}
                            >
                                <Settings />
                                <span>Settings</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <hr />
                        <SidebarMenuItem className="flex items-center gap-2 rounded-2xl p-2 hover:bg-fundar-brand-soft hover:outline-1 hover:outline-fundar-border transition-all duration-200">
                            <Popover
                            /*  open={isOpenProfileDetails}
                                onOpenChange={setIsOpenProfileDetails} */
                            >
                                <PopoverTrigger className={"w-full"}>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    currentUser?.profileImageUrl
                                                }
                                                alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
                                            />
                                            <AvatarFallback>
                                                {`${currentUser?.firstName.charAt(0)} ${currentUser?.lastName.charAt(0)}`}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex justify-between text-left">
                                            <div>
                                                <p className="font-sm">
                                                    {currentUser?.firstName}{" "}
                                                    {currentUser?.lastName}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {currentUser?.email}
                                                </p>
                                            </div>
                                            <ChevronsUpDown
                                                size={18}
                                                className="text-slate-400"
                                            />
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    side="right"
                                    align="end"
                                    className="w-72"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-12">
                                                <AvatarImage
                                                    src={
                                                        currentUser?.profileImageUrl
                                                    }
                                                    alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
                                                />
                                                <AvatarFallback>
                                                    {`${currentUser?.firstName.charAt(0)} ${currentUser?.lastName.charAt(0)}`}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <p className="font-semibold">
                                                    {currentUser?.firstName}{" "}
                                                    {currentUser?.lastName}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {currentUser?.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t pt-3 space-y-4">
                                            <button className="w-full text-left">
                                                Profile
                                            </button>

                                            <Link to={"/settings"}>
                                                <button className="w-full text-left">
                                                    Account settings
                                                </button>
                                            </Link>
                                            <Button
                                                className="w-full mt-6"
                                                variant={"destructive"}
                                                onClick={logout}
                                            >
                                                Logout <LogOut />
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </section>
        </Sidebar>
    );
}
