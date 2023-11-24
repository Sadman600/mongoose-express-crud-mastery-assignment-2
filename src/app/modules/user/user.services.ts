import { TUser } from "./user.interface";
import { UserModel } from "./user.schema.model";

// Insert a user into BD
export const createUserService = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

// Get all user into BD
export const getAllUserService = async () => {
  const result = await UserModel.find({});
  return result;
};

export const getSingleUserService = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

export const deleteUserService = async (id: string) => {
  const result = await UserModel.updateOne({ userId: id }, { isActive: false });
  return result;
};
