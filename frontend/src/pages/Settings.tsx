import {
    SettingsIcon,
    Edit,
    Info,
    CheckIcon,
    Dot,
    TriangleAlert,
    Trash,
    DatabaseMinus,
    Hash,
    Percent,
    Plus,
    Banknote,
} from "lucide-react";
import { currencies } from "../data/settingsData";
import { useState, useRef, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check, Moon, Palette, Sun, Camera } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserType, EditUserDetailsType } from "@/types/user";
import type { DefaultAllocationType } from "@/types/settings";
import type { BaseCurrencyType } from "@/types/settings";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { editUserApi } from "@/api/userApi";
import {
    updateBaseCurrencyApi,
    updateAllocationsApi,
    deleteAllocationsApi,
} from "@/api/settingsApi";
import handleApiErrorToast from "@/utils/handleApiErrorToast";

type Theme = "orange" | "blue" | "purple";
type AllocationMode = "fixed-amount" | "percentage";

const themes = [
    {
        name: "Orange",
        value: "orange",
        color: "bg-orange-500",
    },
    {
        name: "Blue",
        value: "blue",
        color: "bg-blue-500",
    },
    {
        name: "Purple",
        value: "purple",
        color: "bg-purple-500",
    },
] as const;

const allocationModes = [
    {
        name: "Fixed-Amount",
        value: "fixed-amount",
        icon: Hash,
    },

    {
        name: "Percentage",
        value: "percentage",
        icon: Percent,
    },
] as const;

const modes = [
    {
        name: "Light",
        value: "light",
        icon: Sun,
    },
    {
        name: "Dark",
        value: "dark",
        icon: Moon,
    },
] as const;

const Settings = () => {
    const currentUser = useAuthStore((state) => state.user);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<EditUserDetailsType>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });
    useEffect(() => {
        if (currentUser) {
            reset({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
            });
        }
    }, [currentUser, reset]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState<boolean>(false);
    const [chosenCurrency, setChosenCurrency] = useState<BaseCurrencyType>(
        currencies[1] || { code: "USD", value: "US Dollar", symbol: "$" },
    );
    const [theme, setTheme] = useState<Theme>("orange");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [allocationMode, setAllocationMode] =
        useState<AllocationMode>("fixed-amount");

    const allocationOptions = useAuthStore(
        (state) => state.settings?.defaultAllocations,
    );
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState<boolean>(false);
    const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] =
        useState<boolean>(false);
    const [selectedAllocationOption, setSelectedAllocationOption] =
        useState<Partial<DefaultAllocationType> | null>(null);

    const [isDisabledSave, setisDisabledSave] = useState<boolean>(false);

    const mode = useThemeStore((state) => state.mode);
    const setMode = useThemeStore((state) => state.setMode);

    const [newAllocationOption, setNewAllocationOption] = useState<string>("");

    //user currently loggedIn user settings

    const setAuthState = useAuthStore((state) => state.setAuth);
    const existingToken = useAuthStore((state) => state.accessToken);
    const existingSettings = useAuthStore((state) => state.settings);
    const baseCurrency = existingSettings?.baseCurrency;

    const handleProfileImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
            alert("Image must be smaller than 5MB.");
            return;
        }

        /* const imageUrl = URL.createObjectURL(file); */

        //will add better logic for uploading image file to s3 bucket or other file upload services
    };

    // edit current user details
    const handleEditCurrentUser = async (data: Partial<UserType>) => {
        const modifiedApiData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key,
                typeof value === "string" ? value.trim() : value,
            ]),
        );
        try {
            setIsLoading(true);
            setIsOpenEditProfile(false);
            const response = await toast.promise(editUserApi(modifiedApiData), {
                loading: {
                    title: "Updating Details...",
                    description:
                        "Please wait while your profile is being updated",
                },
                success: (response) => ({
                    title: "Profile Updated",
                    description: response.message,
                }),
                error: handleApiErrorToast,
            });

            setAuthState(response.data.user, existingSettings, existingToken);
        } catch {
        } finally {
            setIsLoading(false);
            setIsOpenEditProfile(false);
        }
    };

    // edit base currency setiings

    const setDefaultCurrency = async () => {
        const selectedCurrency = currencies.find(
            (item) => item.code === chosenCurrency.code,
        );

        if (!selectedCurrency) return;

        if (baseCurrency?.code === chosenCurrency.code) setisDisabledSave(true);

        setIsLoading(true);

        try {
            const response = await toast.promise(
                updateBaseCurrencyApi({
                    baseCurrency: selectedCurrency,
                }),
                {
                    loading: {
                        title: "Updating Settings...",
                        description:
                            "Please wait while we update your currency settings",
                    },
                    success: (response) => ({
                        title: "Currency Updated",
                        description: response.message,
                    }),
                    error: handleApiErrorToast,
                },
            );

            setAuthState(
                response.data.user,
                response.data.settings,
                existingToken,
            );
        } catch {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (baseCurrency?.code === chosenCurrency.code) {
            setisDisabledSave(true);
        } else {
            setisDisabledSave(false);
        }
    }, [chosenCurrency, baseCurrency]);

    const handleAddAllocation = async (value: string) => {
        const data: Partial<DefaultAllocationType> = { name: value };

        setIsLoading(true);
        setIsAddCategoryOpen(false);

        try {
            const response = await toast.promise(
                updateAllocationsApi(data),

                {
                    loading: {
                        title: "Updating Allocations...",
                        description:
                            "Please wait while we update your allocation preferences",
                    },
                    success: (response) => ({
                        title: "Preferences Updated",
                        description: response.message,
                    }),
                    error: handleApiErrorToast,
                },
            );

            setAuthState(
                response.data.user,
                response.data.settings,
                existingToken,
            );
        } catch {
            //error already handled inside the toast
        } finally {
            setIsLoading(false);
            setNewAllocationOption("");
        }
    };

    const handleDeleteAllocation = async () => {
        const allocationId = selectedAllocationOption?._id;

        if (!allocationId) return;

        setIsLoading(true);
        setIsDeleteCategoryOpen(false);

        try {
            const response = await toast.promise(
                deleteAllocationsApi(allocationId),
                {
                    loading: {
                        title: "Updating Allocations...",
                        description:
                            "Please wait while we update your preferences.",
                    },

                    success: (response) => ({
                        title: "Preferences Updated",
                        description: response.message,
                    }),

                    error: handleApiErrorToast,
                },
            );

            setAuthState(
                response.data.user,
                response.data.settings,
                existingToken,
            );
        } catch {
            // toast.promise() already displays the error
        } finally {
            setIsLoading(false);
            setSelectedAllocationOption(null);
        }
    };

    return (
        <article className="lg:w-[65%] w-full p-4 space-y-6">
            <section className="p-4 rounded-xl bg-fundar-surface shadow-lg">
                <h3 className="flex gap-2 text-xl items-center font-semibold">
                    {" "}
                    <SettingsIcon /> Settings
                </h3>
            </section>
            <section className="p-4 rounded-xl bg-fundar-surface space-y-3 shadow-lg">
                <h3 className="text-lg">Profile</h3>
                <hr />
                <div className="flex gap-2 items-center p-2">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative size-16 overflow-hidden rounded-full"
                        >
                            <Avatar className={"size-16"}>
                                <AvatarImage
                                    src={currentUser?.profileImageUrl}
                                    alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
                                />
                                <AvatarFallback>
                                    {`${currentUser?.firstName.charAt(0)} ${currentUser?.lastName.charAt(0)}`}
                                </AvatarFallback>
                            </Avatar>

                            <div
                                className="
                     absolute inset-0
                     flex items-center justify-center
                     bg-black/50
                     opacity-0
                     transition-opacity
                     group-hover:opacity-100
                  "
                            >
                                <Camera
                                    size={18}
                                    className="text-white"
                                />
                            </div>
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className="w-full lg:w-3/5">
                        <p className="font-semibold flex justify-between items-center">
                            <span>
                                {currentUser?.firstName} {currentUser?.lastName}
                            </span>
                            <Button
                                variant={"secondary"}
                                onClick={() => setIsOpenEditProfile(true)}
                                disabled={isLoading}
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                        </p>
                        <p className="text-sm">{currentUser?.email}</p>
                    </div>
                </div>
            </section>
            <section className="p-4 rounded-xl bg-fundar-surface space-y-3 shadow-lg">
                <h3 className="text-lg">Preferences</h3>
                <hr />
                <div className="space-y-6">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="space-y-1 ">
                            <p className="block">Base Currency</p>
                            <span className="flex text-[0.75rem] pl-2 gap-1 items-center text-slate-800 dark:text-slate-300">
                                <Info className="w-3 h-3" /> Select the default
                                currency settings for your fundar account
                            </span>
                        </div>
                        <Button
                            className="px-3 lg:px-6 py-4"
                            variant={"secondary"}
                            onClick={setDefaultCurrency}
                            disabled={isLoading || isDisabledSave}
                        >
                            Save Currency <Banknote />
                        </Button>
                    </div>

                    <Select
                        value={chosenCurrency.code}
                        onValueChange={(code) => {
                            const currency = currencies.find(
                                (currency) => currency.code === code,
                            );

                            if (currency) {
                                setChosenCurrency(currency);
                            }
                        }}
                    >
                        <SelectTrigger className="w-full max-w-48 border border-slate-500 rounded-xl">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent className="border border-slate-500 rounded-xl p-2  w-62.5">
                            <SelectGroup>
                                <SelectLabel>Choose a Currency</SelectLabel>

                                {currencies.map((currency) => (
                                    <SelectItem
                                        key={currency.code}
                                        value={currency.code}
                                    >
                                        {currency.symbol} {currency.value} (
                                        {currency.code})
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <section className="space-y-3">
                        <p className="text-fundar-text-muted">User Currency</p>
                        <div className="px-4 py-3 rounded-lg bg-fundar-brand-soft border-fundar-brand border w-1/2 lg:w-2/7">
                            {baseCurrency?.value} {baseCurrency?.symbol}
                        </div>
                    </section>
                </div>
            </section>
            <section className="p-4 rounded-xl bg-fundar-surface space-y-3 shadow-lg">
                <h3 className="text-lg ">Budget Defaults</h3>
                <hr />
                <section className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="">
                                {" "}
                                Default allocation categories{" "}
                            </span>
                            <Button
                                variant={"secondary"}
                                className="px-6 py-5"
                                onClick={() => setIsAddCategoryOpen(true)}
                                disabled={isLoading}
                            >
                                Add New Default <Plus />{" "}
                            </Button>
                        </div>
                        <ul className="flex flex-wrap px-4 justify-start gap-3 lg:w-[60%] text-xs">
                            {allocationOptions?.map((option) => (
                                <li
                                    key={option._id}
                                    className="outline outline-fundar-surface-subtle py-1 px-4 rounded-2xl hover:bg-fundar-surface-subtle cursor-pointer"
                                    onClick={() => {
                                        setIsDeleteCategoryOpen(true);
                                        setSelectedAllocationOption(option);
                                    }}
                                >
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div className="space-y-4">
                        <p>Default Income Allocation Mode</p>
                        <div className="pl-4 flex gap-4">
                            {allocationModes.map((item, i) => (
                                <button
                                    className={`flex gap-0.1 text-sm place-items-center rounded-sm p-2 px-4 border ${item.value === allocationMode ? "bg-fundar-brand-soft border-fundar-brand" : "bg-fundar-surface border-fundar-surface-subtle hover:bg-fundar-surface-subtle"} transition-all duration-200`}
                                    key={i}
                                    onClick={() =>
                                        setAllocationMode(item.value)
                                    }
                                    disabled={isLoading}
                                >
                                    {" "}
                                    <Dot />
                                    {item.name}{" "}
                                    {item.value === allocationMode ? (
                                        <CheckIcon className="w-4 h-4 ml-4" />
                                    ) : null}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </section>
            <section className="p-4 rounded-xl bg-fundar-surface space-y-3 shadow-lg">
                <h3 className="text-lg">Appearances</h3>
                <hr />
                <section className="space-y-6 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <Palette size={20} />

                        <h3 className="font-semibold">Appearance</h3>
                    </div>

                    {/* Mode */}
                    <div className="space-y-3">
                        <div>
                            <p className="font-medium">Mode</p>

                            <p className="text-sm text-muted-foreground">
                                Choose how Fundar appears on your device.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {modes.map((modeOption) => {
                                const Icon = modeOption.icon;

                                return (
                                    <button
                                        key={modeOption.value}
                                        type="button"
                                        onClick={() =>
                                            setMode(modeOption.value)
                                        }
                                        className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
                                            mode === modeOption.value
                                                ? "border-fundar-brand bg-fundar-brand-soft"
                                                : "bg-fundar-surface hover:bg-fundar-surface-subtle"
                                        }`}
                                    >
                                        <Icon size={20} />

                                        <span className="text-sm font-medium">
                                            {modeOption.name}
                                        </span>

                                        {mode === modeOption.value && (
                                            <Check
                                                size={16}
                                                className="absolute top-2 right-2 text-fundar-text"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Theme */}
                    <div className="space-y-3">
                        <div>
                            <p className="font-medium">Theme</p>

                            <p className="text-sm text-muted-foreground">
                                Select your preferred Theme for Fundar.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {themes.map((themeOption) => (
                                <button
                                    key={themeOption.value}
                                    type="button"
                                    onClick={() => setTheme(themeOption.value)}
                                    className={`relative flex items-center gap-2 rounded-lg border px-4 py-2 transition ${
                                        theme === themeOption.value
                                            ? "border-fundar-brand bg-fundar-brand-soft"
                                            : "bg-fundar-surface hover:bg-fundar-surface-subtle border-fundar-surface-subtle"
                                    }`}
                                >
                                    <span
                                        className={`size-4 rounded-full ${themeOption.color}`}
                                    />

                                    <span>{themeOption.name}</span>

                                    {theme === themeOption.value && (
                                        <Check
                                            size={16}
                                            className="text-fundar-text"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </section>
            <section className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 space-y-6 text-red-800 dark:text-red-200 border-red-300 border shadow-lg mt-20">
                <h3 className="text-xl">Red Zone</h3>
                <hr className="border-red-300" />
                <p className="flex gap-1 items-center text-sm font-semibold mb-10">
                    {" "}
                    <TriangleAlert className="w-4 h-4" /> Warning! Actions
                    performed in this section cannot be undone!
                </p>
                <section className="flex flex-nowrap justify-between gap-4 p-4">
                    <article className="flex flex-col p-4 border border-red-400 rounded-xl space-y-6 w-[calc(50%-2rem)] flex-1">
                        <p className="text-sm">
                            This action will delete all your current app data
                            from your account.
                        </p>
                        <Button
                            variant={"destructive"}
                            className="rounded-4xl p-6"
                        >
                            Clear User Data <DatabaseMinus />
                        </Button>
                    </article>
                    <article className="flex flex-col p-4 border border-red-400 rounded-xl space-y-6 w-[calc(50%-2rem)] flex-1">
                        <p className="text-sm">
                            This action will delete your account from fundar
                            database.
                        </p>
                        <Button
                            variant={"destructive"}
                            className="rounded-4xl p-6"
                        >
                            Delete Account <Trash />
                        </Button>
                    </article>
                </section>
            </section>
            <Dialog
                open={isAddCategoryOpen}
                onOpenChange={setIsAddCategoryOpen}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Enter a default allocation category
                        </DialogTitle>
                        <DialogDescription>
                            You can always create more allocations on the income
                            page
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="allocation-option">Category</Label>
                            <Input
                                id="allocation-option"
                                type="text"
                                value={newAllocationOption}
                                onChange={(e) =>
                                    setNewAllocationOption(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className={"flex justify-end gap-2"}>
                            <Button
                                variant={"secondary"}
                                type="button"
                                className={"p-6"}
                                onClick={() => setIsAddCategoryOpen(false)}
                            >
                                Discard
                            </Button>
                            <Button
                                type="button"
                                onClick={() =>
                                    handleAddAllocation(newAllocationOption)
                                }
                                className={"p-6"}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* the delete default allocation option */}
            <Dialog
                open={isDeleteCategoryOpen}
                onOpenChange={setIsDeleteCategoryOpen}
            >
                <DialogContent className="sm:max-w-md space-y-8">
                    <DialogHeader>
                        <h3 className="text-2xl">
                            Delete this{" "}
                            <span className="text-red-500">
                                {selectedAllocationOption?.name}
                            </span>{" "}
                            Allocation
                        </h3>

                        <DialogDescription className={"text-md"}>
                            You can always create more allocations on the income
                            page
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className={"flex justify-end gap-2"}>
                            <Button
                                type="button"
                                className={"p-6"}
                                onClick={() => setIsDeleteCategoryOpen(false)}
                            >
                                Discard
                            </Button>
                            <Button
                                className={"p-6"}
                                variant={"destructive"}
                                type="button"
                                onClick={() => handleDeleteAllocation()}
                            >
                                Delete
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* the user update dialog form */}
            <Dialog
                open={isOpenEditProfile}
                onOpenChange={setIsOpenEditProfile}
            >
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader className="mb-4">
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save
                            changes when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleEditCurrentUser)}>
                        <FieldGroup>
                            <div className="flex justify-between gap-4">
                                <Field>
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        {...register("firstName", {
                                            required:
                                                "first name cannot be empty",
                                        })}
                                    />
                                    <p className="text-fundar-negative">
                                        {errors.firstName?.message}
                                    </p>
                                </Field>
                                <Field>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        {...register("lastName", {
                                            required:
                                                "last name cannot be empty",
                                        })}
                                    />
                                    <p className="text-fundar-negative">
                                        {errors.lastName?.message}
                                    </p>
                                </Field>
                            </div>
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="email"
                                    {...register("email", {
                                        required:
                                            "please provide a valid email!",
                                    })}
                                />
                                <p className="text-fundar-negative">
                                    {errors.email?.message}
                                </p>
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <div className="flex gap-3">
                                <Button
                                    variant="destructive"
                                    type="button"
                                    className={"p-6"}
                                    onClick={() => setIsOpenEditProfile(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className={"p-6"}
                                    disabled={!isDirty || isLoading}
                                >
                                    Save changes
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </article>
    );
};

export default Settings;
