import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import dashboardController from "../controller/dashboard-controller.js";

const userRouter = express.Router();

userRouter.get(
  "/api/dashboard",
  authMiddleware,
  dashboardController.getDashboardContent
);

export { userRouter };
