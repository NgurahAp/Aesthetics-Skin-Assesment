import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

publicRouter.post("/api/login", userController.login);
publicRouter.post("/api/register", userController.register);

publicRouter.get("/api/auth/google", userController.googleLogin);
publicRouter.get("/api/auth/google/callback", userController.googleCallback);

publicRouter.get("/api/auth/facebook", userController.facebookLogin);
publicRouter.get("/api/auth/facebook/callback", userController.facebookCallback);

export { publicRouter };
