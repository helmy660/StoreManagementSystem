import { Response, Request, NextFunction } from "express";
import { Cart } from "../../database";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = new Cart();
    const cartList = await cart.getAll();
    return res.status(200).json({ success: true, available_carts: cartList });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
