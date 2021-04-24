import { Response, Request, NextFunction } from "express";
import { CartStatus } from "../../enum";
import { CustomError, ErrorTypes } from "../../services";
import { Cart, Product } from "../../database";

export const removeProduct = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
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

    if (cartData.products.length <= 0) {
      throw new CustomError(ErrorTypes.Empty_CART);
    }

    const existingProduct: any = cartData.products.find((item: any) => item.productId === productId);
    if (!existingProduct) {
      throw new CustomError(ErrorTypes.INVALID_PRODUCT);
    }

    if (existingProduct.quantity < quantity) {
      throw new CustomError(ErrorTypes.INVALID_QUANTITY);
    }

    const product = new Product();
    const productData = await product.getById(productId);
    if (!productData) {
      throw new CustomError(ErrorTypes.INVALID_PRODUCT);
    }

    cartData.products.map((item: any) => {
      if (item.productId === productId) {
        item.quantity = parseInt(item.quantity) - parseInt(quantity);
        if (item.quantity < 0) {
          item.quantity = 0;
        }
      }
    });

    const filteredProdcuts = cartData.products.filter((item: any) => item.quantity !== 0);
    await cart.removeProduct(cartData._id, filteredProdcuts, quantity, quantity * productData.price);
    return res.status(200).json({ success: true, message: `Remove a product sucessfully from cart ${cartData._id}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
