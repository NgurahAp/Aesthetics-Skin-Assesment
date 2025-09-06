import { prismaClient } from "../application/database.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ errors: "Authorization header is required" })
      .end();
  }

  const sessionKey = authHeader.split(" ")[1];
  if (!sessionKey || sessionKey.trim() === "") {
    return res
      .status(401)
      .json({
        errors: "Session key is required",
      })
      .end();
  }

  const user = await prismaClient.user.findFirst({
    where: {
      session_key: sessionKey,
    },
  });

  if (!user) {
    return res.status(401).json({ errors: "User is unathorized" }).end();
  } else {
    req.user = user;
    next();
  }
};

export default authMiddleware;
