import { Response, Request, NextFunction } from "express";
import { Cart } from "../../database";

export const create = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const cart = new Cart();
    await cart.create(userId);
    return res.status(200).json({ success: true, message: "Created a new cart sucessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
