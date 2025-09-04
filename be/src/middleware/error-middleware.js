import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    let cleanMessage = err.message;

    // Check if it looks like a Joi validation message and clean it
    if (
      cleanMessage.includes('"') &&
      (cleanMessage.includes("is required") || cleanMessage.includes("must be"))
    ) {
      cleanMessage = cleanMessage
        .replace(/"/g, "") // Remove quotes
        .replace(/\\/g, "") // Remove backslashes
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
    }

    res
      .status(err.status)
      .json({
        errors: cleanMessage,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
