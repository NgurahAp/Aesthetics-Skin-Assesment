import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import dashboardController from "../controller/dashboard-controller.js";
import contentController from "../controller/content-controller.js";

const userRouter = express.Router();

userRouter.get("/api/dashboard", dashboardController.getDashboardContent);
userRouter.get(
  "/api/articles/:articleId",
  authMiddleware,
  contentController.getArticleDetail
);
userRouter.get(
  "/api/videos/:videoId",
  authMiddleware,
  contentController.getVideoDetail
);

export { userRouter };
