import type { HydratedDocument } from "mongoose";

export interface UserType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string | undefined;
    role: string;
    profileImageUrl?: string;
    passwordChangedAt: Date;
    passwordResetToken: String | undefined;
    passwordResetTokenExpires: Date | undefined;

    comparePasswordInDb(pwd: string): Promise<boolean>;
    createResetPwdToken(): string;
}

export type CurrentUserType = HydratedDocument<UserType>;
