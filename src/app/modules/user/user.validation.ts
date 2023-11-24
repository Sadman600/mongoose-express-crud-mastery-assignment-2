import Joi from "joi";

const fullNameJoiSchema = Joi.object({
  firstName: Joi.string().required().trim().max(15).messages({
    messageEmpty: "First name is required",
    messageMaxValue: "First name cannot be more than 15 characters",
  }),
  lastName: Joi.string().required().trim().max(15).messages({
    messageEmpty: "Last name is required",
    messageMaxValue: "Last name cannot be more than 15 characters",
  }),
});

const addressJoiSchema = Joi.object({
  street: Joi.string().required().trim().messages({
    messageEmpty: "Street is required",
  }),
  city: Joi.string().required().trim().messages({
    messageEmpty: "City is required",
  }),
  country: Joi.string().required().trim().messages({
    messageEmpty: "Country is required",
  }),
});

export const userJoiSchema = Joi.object({
  userId: Joi.number().required().messages({
    message: "User ID is required",
  }),
  username: Joi.string().required().trim().messages({
    message: "Username is required",
  }),
  password: Joi.string().required().trim().messages({
    message: "Password is required",
  }),
  fullName: fullNameJoiSchema.required(),
  age: Joi.number().required().messages({
    messageEmpty: "Age is required",
  }),

  email: Joi.string().required().trim().email().messages({
    messageEmpty: "Email is required",
  }),
  isActive: Joi.boolean().required().default(true).messages({
    messageEmpty: "isActive is required",
  }),
  hobbies: Joi.array().items(Joi.string()).required().min(1),
  address: addressJoiSchema.required().messages({
    messageEmpty: "Address is required",
  }),
});
