export interface UserType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl?: string;
}

export type EditUserDetailsType = Partial<UserType>;
