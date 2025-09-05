import userService from "../service/user-service.js";
import { logger } from "../application/logging.js";
import passport from "passport";

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
      message: "Login successful",
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
      message: "Registration successful",
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

        // Kirim error ke parent window (popup)
        return res.send(`
          <script>
            window.opener.postMessage({
              success: false,
              error: 'Authentication failed'
            }, '${process.env.FRONTEND_URL || "http://localhost:3000"}');
            window.close();
          </script>
        `);
      }

      if (!user) {
        return res.send(`
          <script>
            window.opener.postMessage({
              success: false,
              error: 'Authentication failed'
            }, '${process.env.FRONTEND_URL || "http://localhost:3000"}');
            window.close();
          </script>
        `);
      }

      // Success - kirim user data ke parent window
      return res.send(`
        <script>
          window.opener.postMessage({
            success: true,
            user: ${JSON.stringify(user)},
            message: 'Google login successful'
          }, '${process.env.FRONTEND_URL || "http://localhost:3000"}');
          window.close();
        </script>
      `);
    }
  )(req, res, next);
};

export default { login, register, googleLogin, googleCallback };
