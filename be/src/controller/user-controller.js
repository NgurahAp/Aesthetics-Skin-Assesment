import userService from "../service/user-service.js";
import { logger } from "../application/logging.js";

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


export default { login, register};
