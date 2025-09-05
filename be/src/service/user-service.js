import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
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

  return prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      session_key: sessionKey,
    },
    select: {
      id: true,
      email: true,
      full_name: true,
      role: true,
      session_key: true,
    },
  });
};

const register = async (request) => {
  const registerRequest = validate(registerUserValidation, request);

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
      id: true,
      email: true,
      full_name: true,
      role: true,
      created_at: true,
    },
  });
};

export default {
  register,
  login,
};
