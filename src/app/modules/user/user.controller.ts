import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  const userData = await req.body;

  res.status(200).json({
    success: true,
    message: "User created successfully!",
    data: userData,
  });
};
