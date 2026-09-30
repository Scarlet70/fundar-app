import { cn } from "cn";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import type { SignupDetailsType } from "@/types/auth";
import { signupApi } from "@/api/authApi";
import { toast } from "@/components/ui/toast";
import handleApiErrorToast from "@/utils/handleApiErrorToast";
import { useAuthStore } from "@/stores/authStore";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [isPwd, setIsPwd] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const setAuthState = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<SignupDetailsType>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const handleSignUp = async (data: SignupDetailsType) => {
        setIsLoading(true);
        try {
            const response = await toast.promise(signupApi(data), {
                loading: {
                    title: "Creating User",
                    description: "Please wait while we create your account...",
                },
                success: (response) => ({
                    title: "Account Created Successful",
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
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit(handleSignUp)}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Fill in the form below to create your fundar account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="e.g Nwafor"
                        required
                        className="bg-background"
                        {...register("firstName", {
                            required: "first name cannot be empty",
                        })}
                    />
                    <p className="text-sm text-red-500">
                        {errors.firstName?.message}
                    </p>
                </Field>
                <Field>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="e.g Cheta"
                        required
                        className="bg-background"
                        {...register("lastName", {
                            required: "last name cannot be empty",
                        })}
                    />
                    <p className="text-sm text-red-500">
                        {errors.lastName?.message}
                    </p>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="bg-background"
                        {...register("email", {
                            required: "please provide a valid email",
                        })}
                    />
                    <p className="text-sm text-red-500">
                        {errors.email?.message}
                    </p>
                    <FieldDescription>
                        We&apos;ll use this to contact you. We will not share
                        your email with anyone else.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            id="password"
                            type={isPwd ? "password" : "text"}
                            required
                            className="bg-background"
                            {...register("password", {
                                required: "please enter a password",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters long",
                                },
                            })}
                        />
                        <InputGroupAddon align={"inline-end"}>
                            <Button
                                variant={"ghost"}
                                onClick={() => setIsPwd(!isPwd)}
                            >
                                {isPwd ? <EyeOff /> : <Eye />}
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <p className="text-sm text-red-500">
                        {errors.password?.message}
                    </p>
                    <FieldDescription>
                        Must be at least 8 characters long.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            id="confirmPassword"
                            type={isPwd ? "password" : "text"}
                            required
                            className="bg-background"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === getValues("password") ||
                                    "Passwords do not match",
                            })}
                        />
                        <InputGroupAddon align={"inline-end"}>
                            <Button
                                variant={"ghost"}
                                onClick={() => setIsPwd(!isPwd)}
                            >
                                {isPwd ? <EyeOff /> : <Eye />}
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <p className="text-sm text-red-500">
                        {errors.confirmPassword?.message}
                    </p>
                    <FieldDescription>
                        Please confirm your password.
                    </FieldDescription>
                </Field>
                <Field>
                    <Button
                        type="submit"
                        className="p-5"
                        disabled={isLoading}
                    >
                        Create Account
                    </Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                    <Button
                        variant="outline"
                        type="button"
                        className="p-5"
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
                        Sign up with Google
                    </Button>
                    <FieldDescription className="px-6 text-center">
                        Already have an account?{" "}
                        <Link to={"/login"}>Sign in</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
