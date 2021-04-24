import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Order, Cart } from "../../database";
import { CartStatus } from "../../enum";

export const create = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const cart = new Cart();
    const cartData = await cart.getByCustomerId(userId);
    if (!cartData) {
      throw new CustomError(ErrorTypes.INVALID_CART);
    }

    if (cartData.status === CartStatus.SUSPENDED) {
      throw new CustomError(ErrorTypes.CART_SUSBENDED);
    }

    if (cartData.products.length <= 0) {
      throw new CustomError(ErrorTypes.Empty_CART);
    }

    const order = new Order();
    await order.create(userId, {
      totalItems: cartData.totalItems,
      totalPrice: cartData.totalPrice,
      products: cartData.products,
    });

    await cart.removeAllProducts(cartData._id);
    console.log(`Clear products from cart ${cartData._id} after creating an order`);

    return res.status(200).json({ success: true, message: "An order has been created sucessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
