import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as incomeRouter } from "./routes/incomeRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as settingsRouter } from "./routes/settingsRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";
import { protect } from "./middleware/authMiddleware.js";

const app = express();

app.use(
    cors({
        origin: "fundar-webapp-two.vercel.app", //Fundar frontend in dev mode
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/fundar/v1/auth", authRouter);

app.use(protect);
app.use("/api/fundar/v1/incomes", incomeRouter);
app.use("/api/fundar/v1/users", userRouter);
app.use("/api/fundar/v1/settings", settingsRouter);

app.use(globalErrorHandler);

export default app;
