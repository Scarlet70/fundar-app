import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Bell, Moon, WalletCards, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const dateFormat = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
} as const;
import { useAuthStore } from "@/stores/authStore";
const DashboardNavBar = () => {
    const currentUser = useAuthStore((state) => state.user);

    return (
        <header className="flex justify-between px-8 py-4 items-center dark:bg-black">
            <h2 className="text-md flex gap-1">
                <WalletCards /> Fundar
            </h2>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-44.5 lg:w-80 hidden lg:block"
            >
                <InputGroup>
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
            </form>
            <span className="text-[0.7rem] p-1 hidden lg:block">
                {new Date().toLocaleString("en-US", dateFormat)}
            </span>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <Moon className="w-5 h-5 text-slate-400" />
                </div>

                <div className="relative">
                    <button
                        type="button"
                        className="group relative size-12 overflow-hidden rounded-full"
                    >
                        <Avatar className={"w-12 h-12"}>
                            <AvatarImage
                                src={currentUser?.profileImageUrl}
                                alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
                            />
                            <AvatarFallback>
                                {`${currentUser?.firstName.charAt(0)} ${currentUser?.lastName.charAt(0)}`}
                            </AvatarFallback>
                        </Avatar>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavBar;
