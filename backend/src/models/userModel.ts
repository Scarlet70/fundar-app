import mongoose, { type ObjectId } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import type { UserType } from "../types/user.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema<UserType>(
    {
        firstName: {
            type: String,
            required: [true, "firstname is required"],
        },
        lastName: {
            type: String,
            required: [true, "lastname is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "please enter a password"],
            minLength: [8, "password must be at least 8 characters long"],
            select: false,
        },
        confirmPassword: {
            type: String,
            required: [true, "please confirm your password"],
            validate: {
                //works only for save and create methods
                validator: function (this: UserType, value: string): boolean {
                    return value === this.password;
                },
                message: "Passwords do not match!",
            },
        },
        role: {
            type: String,
            default: "user",
        },
        profileImageUrl: {
            type: String,
            trim: true,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
    },
    { timestamps: true },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
});

userSchema.methods.comparePasswordInDb = async function (pwd: string) {
    return await bcrypt.compare(pwd, this.password);
};

userSchema.methods.isPasswordChanged = async function (jwtTimeStamp: number) {
    if (this.passwordChangedAt) {
        const pwdChangedTimestamp = parseInt(
            String(this.passwordChangedAt.getTime() / 1000),
            10,
        );

        return jwtTimeStamp < pwdChangedTimestamp; // 1784799173 < 1784851200
    }
    return false;
};

userSchema.methods.createResetPwdToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    console.log(resetToken, this.passwordResetToken);

    return resetToken;
};

const User = mongoose.model("user", userSchema);

export default User;
