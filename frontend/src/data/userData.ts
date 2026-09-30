import type { UserType } from "@/types/user";

// we use this as a default user until we implement authenticatiion in the backend
export const placeholderUser: UserType = {
   id: 1,
   firstName: "Nwafor",
   lastName: "Emmanuel",
   email: "emmanuel@example.com",
};
