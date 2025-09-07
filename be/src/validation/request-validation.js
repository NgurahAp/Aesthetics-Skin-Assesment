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

const changeMembershipValidation = Joi.object({
  package: Joi.string().valid("A", "B", "C").required(),
});

const pagingValidation = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  size: Joi.number().integer().min(1).max(100).default(10),
});

export {
  loginUserValidation,
  registerUserValidation,
  changeMembershipValidation,
  pagingValidation,
};
