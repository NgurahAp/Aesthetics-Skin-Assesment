import bcrypt from "bcrypt";
import { prismaClient } from "../../src/application/database.js";

export const createTestUser = async ({
  email = "test@test.com",
  role = "member",
  sessionKey = "session-key-test",
  membershipPackage = "A",
  fullName = "Test User",
}) => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  return prismaClient.user.create({
    data: {
      email: email,
      password: hashedPassword,
      session_key: sessionKey,
      role: role,
      membership_package: membershipPackage,
      full_name: fullName,
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
