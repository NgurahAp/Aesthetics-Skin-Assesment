import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { loginUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Email or password is wrong");
  }

  const sessionKey = crypto.randomBytes(32).toString("hex");

  return  prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      session_key: sessionKey,
    },
    select: {
      email: true,
      session_key: true,
      role: true,
      phone_number: true,
    },
  });
};

const register = async (request) => {
  const registerRequest = validate(loginUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: registerRequest.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exists");
  }

  registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

  return prismaClient.user.create({
    data: registerRequest,
    select: {
      email: true,
      id: true,
      created_at: true,
    },
  });
};

const googleAuth = async (profile) => {
  try {
    // Check if user already exists with this Google ID
    let user = await prismaClient.user.findUnique({
      where: {
        google_id: profile.id
      }
    });

    if (user) {
      // User exists, generate new session key
      const sessionKey = crypto.randomBytes(32).toString("hex");
      return await prismaClient.user.update({
        where: { id: user.id },
        data: { session_key: sessionKey },
        select: {
          email: true,
          session_key: true,
          role: true,
          full_name: true
        }
      });
    }

    // Check if user exists with same email but no Google ID
    user = await prismaClient.user.findUnique({
      where: {
        email: profile.emails[0].value
      }
    });

    if (user) {
      // Link existing account with Google
      const sessionKey = crypto.randomBytes(32).toString("hex");
      return await prismaClient.user.update({
        where: { id: user.id },
        data: { 
          google_id: profile.id,
          session_key: sessionKey,
          full_name: user.full_name || profile.displayName
        },
        select: {
          email: true,
          session_key: true,
          role: true,
          full_name: true
        }
      });
    }

    // Create new user
    const sessionKey = crypto.randomBytes(32).toString("hex");
    return await prismaClient.user.create({
      data: {
        email: profile.emails[0].value,
        full_name: profile.displayName,
        google_id: profile.id,
        session_key: sessionKey,
        role: 'member'
      },
      select: {
        email: true,
        session_key: true,
        role: true,
        full_name: true
      }
    });
  } catch (error) {
    throw new ResponseError(500, "Google authentication failed");
  }
};

export default {
  register,
  login,
  googleAuth
};
