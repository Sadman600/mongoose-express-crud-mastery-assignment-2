import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getOrderTotalPriceUserService,
  getOrderUserService,
  getSingleUserService,
  updateOrdersUserService,
  updateUserService,
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
      message:
        error.index === 0
          ? "User Already has created"
          : "User created unsuccessfully!",
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
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 404, description: "User not found!" },
    });
  }
};

// Update a user controller
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updateUser = req.body;
    const result = await updateUserService(userId, updateUser);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 404, description: "User not found!" },
    });
  }
};

// Delete a single user Controller
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await deleteUserService(userId);
    res.status(200).json({
      success: true,
      message: "User delete successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 404, description: "User not found!" },
    });
  }
};

// User orders controller
export const ordersUpdateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const ordersData = req.body;
    await updateOrdersUserService(userId, ordersData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 404, description: "User not found!" },
    });
  }
};

// Get all orders for a specific user Controller
export const getOrderUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getOrderUserService(userId);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 404, description: "User not found!" },
    });
  }
};
// Get Total Price of Orders for a Specific User Controller
export const getOrderTotalPriceUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const result = await getOrderTotalPriceUserService(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: { code: 404, description: "User not found!" },
    });
  }
};
