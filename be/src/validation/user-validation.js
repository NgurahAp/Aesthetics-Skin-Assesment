import Joi from "joi";

const registerUserValidation = Joi.object({
  full_name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
});

export { loginUserValidation, registerUserValidation };
