import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { prismaClient } from "../application/database.js";
import crypto from "crypto";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:8080/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await prismaClient.user.findUnique({
          where: {
            google_id: profile.id,
          },
        });

        if (user) {
          // User exists, generate new session key
          const sessionKey = crypto.randomBytes(32).toString("hex");
          user = await prismaClient.user.update({
            where: { id: user.id },
            data: { session_key: sessionKey },
            select: {
              id: true,
              email: true,
              full_name: true,
              role: true,
              Membership_package: true,
              session_key: true,
            },
          });
          return done(null, user);
        }

        // Check if user exists with same email but no Google ID
        user = await prismaClient.user.findUnique({
          where: {
            email: profile.emails[0].value,
          },
        });

        if (user) {
          // Link existing account with Google
          const sessionKey = crypto.randomBytes(32).toString("hex");
          user = await prismaClient.user.update({
            where: { id: user.id },
            data: {
              google_id: profile.id,
              session_key: sessionKey,
              full_name: user.full_name || profile.displayName,
            },
            select: {
              id: true,
              email: true,
              full_name: true,
              role: true,
              Membership_package: true,
              session_key: true,
            },
          });
          return done(null, user);
        }

        // Create new user
        const sessionKey = crypto.randomBytes(32).toString("hex");
        user = await prismaClient.user.create({
          data: {
            email: profile.emails[0].value,
            full_name: profile.displayName,
            google_id: profile.id,
            session_key: sessionKey,
            role: "member",
          },
          select: {
            id: true,
            email: true,
            full_name: true,
            role: true,
            Membership_package: true,
            session_key: true,
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        process.env.FACEBOOK_CALLBACK_URL ||
        "http://localhost:8080/api/auth/facebook/callback",
      profileFields: ["id", "emails", "name"], // Specify fields to retrieve
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Facebook ID
        let user = await prismaClient.user.findUnique({
          where: {
            facebook_id: profile.id,
          },
        });

        if (user) {
          // User exists, generate new session key
          const sessionKey = crypto.randomBytes(32).toString("hex");
          user = await prismaClient.user.update({
            where: { id: user.id },
            data: { session_key: sessionKey },
            select: {
              id: true,
              email: true,
              full_name: true,
              role: true,
              Membership_package: true,
              session_key: true,
            },
          });
          return done(null, user);
        }

        // Check if user exists with same email but no Facebook ID
        const email =
          profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (email) {
          user = await prismaClient.user.findUnique({
            where: {
              email: email,
            },
          });

          if (user) {
            // Link existing account with Facebook
            const sessionKey = crypto.randomBytes(32).toString("hex");
            user = await prismaClient.user.update({
              where: { id: user.id },
              data: {
                facebook_id: profile.id,
                session_key: sessionKey,
                full_name:
                  user.full_name ||
                  `${profile.name.givenName} ${profile.name.familyName}`,
              },
              select: {
                id: true,
                email: true,
                full_name: true,
                role: true,
                Membership_package: true,
                session_key: true,
              },
            });
            return done(null, user);
          }
        }

        // Create new user
        const sessionKey = crypto.randomBytes(32).toString("hex");
        user = await prismaClient.user.create({
          data: {
            email: email,
            full_name: `${profile.name.givenName} ${profile.name.familyName}`,
            facebook_id: profile.id,
            session_key: sessionKey,
            role: "member",
          },
          select: {
            id: true,
            email: true,
            full_name: true,
            role: true,
            Membership_package: true,
            session_key: true,
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        full_name: true,
        role: true,
        Membership_package: true,
        session_key: true,
      },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
