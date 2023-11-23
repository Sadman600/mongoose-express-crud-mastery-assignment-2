import { Request, Response } from "express";
import {
  createUserService,
  getAllUserService,
  getSingleUserService,
} from "./user.services";

// User Create Controller
export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await createUserService(userData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User created unsuccessfully!",
      data: error,
    });
  }
};
// Get all User Controller
export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const result = await getAllUserService();
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User fetched unsuccessfully!",
      data: error,
    });
  }
};
// Get single User Controller
export const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getSingleUserService(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "User fetched unsuccessfully!",
      data: error,
    });
  }
};
