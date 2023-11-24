import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getSingleUserService,
} from "./user.services";
import { userJoiSchema } from "./user.validation";

// User Create Controller
export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { error, value } = userJoiSchema.validate(userData);
    const result = await createUserService(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: "User created unsuccessfully!",
        data: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User created unsuccessfully!",
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
  } catch (error: any) {
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
  } catch (error: any) {
    // console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 404, description: "User not found!" },
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await deleteUserService(userId);
    res.status(200).json({
      success: true,
      message: "User delete successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User delete unsuccessfully!",
      data: error,
    });
  }
};
