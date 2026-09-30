import { CurrentUserType } from "./user.ts";

declare global {
    namespace Express {
        interface Request {
            user?: CurrentUserType;
        }
    }
}

export {};
