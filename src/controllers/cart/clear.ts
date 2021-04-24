import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Cart } from "../../database";

export const clear = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { cartId } = req.params;
    const cart = new Cart();
    const cartData = cartId ? await cart.getById(cartId) : await cart.getByCustomerId(userId);
    if (!cartData) {
      throw new CustomError(ErrorTypes.INVALID_CART);
    }
    await cart.removeAllProducts(cartData._id);
    return res.status(200).json({ success: true, message: `clear cart ${cartData._id}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
