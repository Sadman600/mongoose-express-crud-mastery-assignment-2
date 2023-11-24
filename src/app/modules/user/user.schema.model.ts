import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { TAddress, TFullName, TUser } from "./user.interface";
import config from "../../config";

const userFullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [15, " First name cannot be more than 15 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [15, " First name cannot be more than 15 characters"],
  },
});
const userAddressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, "Street is required"], trim: true },
  city: { type: String, required: [true, "City is required"], trim: true },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
  },
});
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, "User id is required"],
    unique: true,
    message: "Give different user ID",
    trim: true,
  },
  username: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
    message: "Give different user name",
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxlength: [20, "password can not be 20 char"],
    trim: true,
  },
  fullName: { type: userFullNameSchema, required: true },
  age: { type: Number, required: [true, "Age is required"], trim: true },
  email: { type: String, required: [true, "Email is required"], trim: true },
  isActive: { type: Boolean, required: true, default: true },
  hobbies: { type: [String], required: [true, "Must be at least 1 hobbies"] },
  address: { type: userAddressSchema, required: true },
});

userSchema.pre("save", async function (next) {
  const userPassword = this;
  userPassword.password = await bcrypt.hash(
    userPassword.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("User", userSchema);
