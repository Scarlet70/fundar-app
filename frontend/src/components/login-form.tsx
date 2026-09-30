import { cn } from "cn";
import { loginApi } from "@/api/authApi";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation, Link } from "react-router-dom";
import type { LoginDetailsType } from "@/types/auth";
import handleApiErrorToast from "@/utils/handleApiErrorToast";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { EyeOff, Eye } from "lucide-react";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const methods = useForm<LoginDetailsType>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const [isPwd, setIsPwd] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setAuthState = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async (data: LoginDetailsType) => {
        setIsLoading(true);
        try {
            const response = await toast.promise(loginApi(data), {
                loading: {
                    title: "Logging in",
                    description: "Please wait while we sign you in...",
                },
                success: (response) => ({
                    title: "Login Successful",
                    description: response.message,
                }),
                error: handleApiErrorToast,
            });

            setAuthState(
                response.data.user,
                response.data.settings,
                response.accessToken,
            );
            navigate(from, { replace: true });
        } catch {
            // The toast already handled the error.
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        Login to your account
                    </h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Enter your email below to login to your fundar account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...register("email", {
                            required: "please provide a valid email!",
                        })}
                        className="p-4"
                    />
                    <p className="text-xs text-red-500">
                        {errors.email?.message}
                    </p>
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <InputGroup>
                        <InputGroupInput
                            id="password"
                            type={isPwd ? "password" : "text"}
                            required
                            {...register("password", {
                                required: "Enter your password!",
                            })}
                            className="p-4"
                            placeholder="Enter password"
                        />
                        <InputGroupAddon align="inline-end">
                            <Button
                                variant={"ghost"}
                                onClick={() => setIsPwd(!isPwd)}
                            >
                                {isPwd ? <EyeOff /> : <Eye />}
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <p className="text-xs text-red-500">
                        {errors.password?.message}
                    </p>
                </Field>
                <Field>
                    <Button
                        type="submit"
                        className={"p-5 font-bold"}
                        disabled={isLoading}
                    >
                        Login
                    </Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                    <Button
                        variant="outline"
                        type="button"
                        className={"p-5"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </Button>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link
                            to={"/signup"}
                            className="underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
