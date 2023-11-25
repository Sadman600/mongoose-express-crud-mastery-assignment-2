import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
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
// Get Single
userRoute.get("/:userId/orders", ordersUpdateUserController);

export default userRoute;
