import express from "express";
import session from "express-session";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import passport from "../config/passport.js";
// import { userRouter } from "../route/api.js";

export const web = express();

web.use(express.json());

web.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
web.use(passport.initialize());
web.use(passport.session());
// web.use(userRouter)

// Routers
web.use(publicRouter);

web.use(errorMiddleware);
