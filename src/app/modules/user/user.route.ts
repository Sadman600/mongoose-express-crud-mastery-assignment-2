import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getOrderUserController,
  getSingleUserController,
  ordersUpdateUserController,
  updateUserController,
} from "./user.controller";

const userRoute = express.Router();

// Create a user route
userRoute.post("/", createUserController);
// Get all user route
userRoute.get("/", getAllUserController);
// Get single  user route
userRoute.get("/:userId", getSingleUserController);
// Delete a user route
userRoute.delete("/:userId", deleteUserController);
// Update a user route
userRoute.put("/:userId", updateUserController);

// User orders route
userRoute.put("/:userId/orders", ordersUpdateUserController);
//  Get all orders for a specific user route
userRoute.get("/:userId/orders", getOrderUserController);
// Get Total Price of Orders for a Specific User
userRoute.get("/:userId/orders", getOrderUserController);

export default userRoute;
