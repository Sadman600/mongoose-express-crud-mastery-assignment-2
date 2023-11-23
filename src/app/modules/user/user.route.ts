import express from "express";
import {
  createUserController,
  getAllUserController,
  getSingleUserController,
} from "./user.controller";

const userRoute = express.Router();

// Create a user route
userRoute.post("/", createUserController);
// Get all user route
userRoute.get("/", getAllUserController);
// Get single  user route
userRoute.get("/:userId", getSingleUserController);

export default userRoute;
