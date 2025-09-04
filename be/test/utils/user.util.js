import bcrypt from "bcrypt";
import { prismaClient } from "../../src/application/database.js";

export const createTestUser = async ({
  email = "test@test.com",
  role = "member",
  sessionKey = "session-key-test",
}) => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  return prismaClient.user.create({
    data: {
      email: email,
      password: hashedPassword,
      session_key: sessionKey,
      role: role,
    },
  });
};

export const deleteTestUser = async () => {
  return prismaClient.user.deleteMany({
    where: {
      email: {
        endsWith: "@test.com",
      },
    },
  });
};