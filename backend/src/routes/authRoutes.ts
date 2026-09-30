import { Router } from "express";
import {
    signUp,
    login,
    refreshAccessToken,
    forgotPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

export const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/resetpassword").post(protect, forgotPassword);
router.route("/refresh").post(refreshAccessToken);
