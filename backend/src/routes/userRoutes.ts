import { Router } from "express";
import {
    editUserData,
    deleteUserAccount,
} from "../controllers/userController.js";

export const router = Router();

router.route("/me").patch(editUserData).delete(deleteUserAccount);
