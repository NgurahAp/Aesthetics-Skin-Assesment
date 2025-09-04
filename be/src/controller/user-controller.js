import userService from "../service/user-service.js";
import { logger } from "../application/logging.js";
import passport from "passport";

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    logger.error("Login failed", {
      email: req.body?.email,
      error: e.message,
    });
    next(e);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    logger.error("Register failed", {
      email: req.body?.email,
      error: e.message,
    });
    next(e);
  }
};

const googleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/login",
    },
    (err, user) => {
      if (err) {
        logger.error("Google OAuth failed", { error: err.message });
        return res.status(500).json({
          error: "Authentication failed",
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "Authentication failed",
        });
      }

      // Success - return user data
      res.status(200).json({
        data: user,
        message: "Google login successful",
      });
    }
  )(req, res, next);
};

export default { login, register, googleLogin, googleCallback };
