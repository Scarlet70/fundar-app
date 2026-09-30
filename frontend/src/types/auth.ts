export type LoginDetailsType = {
    email: string;
    password: string;
};

export type SignupDetailsType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImageUrl?: string;
};

/* export type UserType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImageUrl?: string;
};
 */
/* export type SettingsType = {
    _id: string;
    userId: string;
    mode: string;
    theme: string;
    allocationMode: string;
    defaultAllocations: Partial<DefaultAllocationType>[];
    baseCurrency: {
        code: string;
        value: string;
        symbol: string;
    };
};
 */
