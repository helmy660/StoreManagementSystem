import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Cart } from "../../database";

export const getByCustomer = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const cart = new Cart();
    const cartData = await cart.getByCustomerId(req.params.customerId || req.payload.userId);
    if (!cartData) {
      throw new CustomError(ErrorTypes.CART_NOT_EXISTING);
    }
    return res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
