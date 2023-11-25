import { TUser } from "./user.interface";
import { UserModel } from "./user.schema.model";

// Insert a user into BD
export const createUserService = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

// Get all user into DB
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
// Get a single user into DB service
export const getSingleUserService = async (id: string) => {
  if (await UserModel.isExistingUser(id)) {
    const result = await UserModel.findOne({ userId: id }).select({
      _id: 0,
      password: 0,
    });
    return result;
  } else {
    throw new Error("User not found");
  }
};

export const updateUserService = async (id: string, updateUser: TUser) => {
  if (await UserModel.isExistingUser(id)) {
    const result = await UserModel.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          userId: id,
          username: updateUser.username,
          password: updateUser.password,
          fullName: {
            firstName: updateUser.fullName.firstName,
            lastName: updateUser.fullName.lastName,
          },
          age: updateUser.age,
          email: updateUser.email,
          isActive: updateUser.isActive,
          hobbies: updateUser.hobbies,
          address: {
            street: updateUser.address.street,
            city: updateUser.address.city,
            country: updateUser.address.country,
          },
        },
      }
    ).select({ password: 0, _id: 0 });
    return result;
  } else {
    throw new Error("User not update!!");
  }
};

export const deleteUserService = async (id: string) => {
  const result = await UserModel.updateOne({ userId: id }, { isActive: false });
  return result;
};

export const updateOrdersUserService = async (id: string) => {
  if (await UserModel.isExistingUser(id)) {
    const result = await UserModel.updateOne(
      { userId: id },
      {
        $push: {
          orders: {
            $each: [
              { productName: "apple", price: 25, quantity: 5 },
              { productName: "apple", price: 25, quantity: 5 },
            ],
          },
        },
      }
    );
    return result;
  } else {
    throw new Error("User not found");
  }
};
