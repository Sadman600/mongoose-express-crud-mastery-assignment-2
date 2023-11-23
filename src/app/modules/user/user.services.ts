import { TUser } from "./user.interface";
import { UserModel } from "./user.schema.model";

// Insert a user into BD
export const createUserService = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};
