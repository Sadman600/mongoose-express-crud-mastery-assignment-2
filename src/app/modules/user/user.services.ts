import { TUser } from "./user.interface";
import { UserModel } from "./user.schema.model";

// Insert a user into BD
export const createUserService = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

// Get all user into BD
export const getAllUserService = async () => {
  const result = await UserModel.find({}).select({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

export const getSingleUserService = async (id: string) => {
  if (await UserModel.isExistingUser(id)) {
    const result = await UserModel.findOne({ userId: id }).select({
      password: 0,
    });
    return result;
  } else {
    throw new Error("User not found");
  }
};

export const deleteUserService = async (id: string) => {
  const result = await UserModel.updateOne({ userId: id }, { isActive: false });
  return result;
};
