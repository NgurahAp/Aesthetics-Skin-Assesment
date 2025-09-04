import Joi from "joi";

const loginUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
});

export {
  loginUserValidation,
};
