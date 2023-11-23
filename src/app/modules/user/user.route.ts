import express from "express";
import { createUserController, getAllUserController } from "./user.controller";

const userRoute = express.Router();

userRoute.post("/", createUserController);
userRoute.get("/", getAllUserController);

export default userRoute;
