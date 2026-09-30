import { Router } from "express";
import {
    updateUserCurrencySettings,
    updateUserDefaultAllocations,
    deleteDefaultAllocation,
} from "../controllers/settingsController.js";

export const router = Router();

router.route("/currency").patch(updateUserCurrencySettings);
router.route("/allocations").patch(updateUserDefaultAllocations);
router.route("/allocations/:id").delete(deleteDefaultAllocation);
