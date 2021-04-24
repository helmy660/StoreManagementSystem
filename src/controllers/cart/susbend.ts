import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Cart } from "../../database";

export const susbend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = new Cart();
    const cartData = await cart.getById(req.params.cartId);
    if (!cartData) {
      throw new CustomError(ErrorTypes.INVALID_CART);
    }
    await cart.susbend(req.params.cartId);
    return res.status(200).json({ success: true, message: `Cart ${req.params.cartId} is now susbended` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
