import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Cart, Product } from "../../database";
import { CartStatus } from "../../enum";

export const addProduct = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { cartId } = req.params;
    const { productId, quantity } = req.body;
    const cart = new Cart();
    const cartData = cartId ? await cart.getById(cartId) : await cart.getByCustomerId(userId);
    if (!cartData) {
      throw new CustomError(ErrorTypes.INVALID_CART);
    }

    if (cartData.status === CartStatus.SUSPENDED) {
      throw new CustomError(ErrorTypes.CART_SUSBENDED);
    }

    const product = new Product();
    const productData = await product.getById(productId);
    if (!productData) {
      throw new CustomError(ErrorTypes.INVALID_PRODUCT);
    }

    if (quantity > productData.quantity) {
      throw new CustomError(ErrorTypes.INVALID_QUANTITY);
    }

    cartData.products.map((item: any) => {
      if (item.productId === productId) {
        item.quantity = parseInt(item.quantity) + parseInt(quantity);
        if (item.quantity > productData.quantity) {
          throw new CustomError(ErrorTypes.INVALID_QUANTITY);
        }
      }
    });

    const existingProduct = cartData.products.some((item: any) => item.productId === productId);
    if (!existingProduct) {
      const newData: any = { productId, quantity };
      cartData.products.push(newData);
    }

    await cart.addProduct(cartData._id, cartData.products, quantity, quantity * productData.price);
    return res.status(200).json({ success: true, message: `Add a new product sucessfully to cart ${cartData._id}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
