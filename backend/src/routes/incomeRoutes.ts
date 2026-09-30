import { Router } from "express";
import {
    bulkCreateIncomes,
    createNewIncome,
    deleteIncome,
    getIncomesByUser,
    updateIncome,
} from "../controllers/incomeController.js";
import { restrictAccess } from "../middleware/authMiddleware.js";

export const router = Router();

router.route("/").get(getIncomesByUser).post(createNewIncome);
router.route("/:id").patch(updateIncome).delete(deleteIncome);

router.use(restrictAccess);
router.route("/addmanyincomes").post(bulkCreateIncomes);
