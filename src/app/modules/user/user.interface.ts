import { Model } from "mongoose";
export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};
export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
};

export interface TUserModel extends Model<TUser> {
  isExistingUser(id: string): Promise<TUser | null>;
}
