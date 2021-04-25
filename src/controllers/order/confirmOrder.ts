import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Order, Product } from "../../database";
import { OrderStatus } from "../../enum";

export const confirmOrder = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { orderId } = req.params;
    const order = new Order();
    const orderDetails = await order.getById(orderId);
    if (!orderDetails) {
      throw new CustomError(ErrorTypes.INVALID_ORDER);
    }

    if (orderDetails.status !== OrderStatus.ASSIGNED_TO_SELLER) {
      throw new CustomError(ErrorTypes.INVALID_ACTION);
    }

    if (orderDetails.sellerId !== userId) {
      throw new CustomError(ErrorTypes.USER_NOT_AUTHORIZED);
    }

    const product = new Product();
    for (const item of orderDetails.products) {
      const productData = await product.getById(item.productId);
      if (item.quantity > productData.quantity) {
        const diff = item.quantity - productData.quantity;
        item.quantity = productData.quantity;
        await product.updateQuantity(item.productId, 0, productData.quantity);
        await order.removeProduct(orderId, orderDetails.products, diff, diff * productData.price);
      } else {
        await product.updateQuantity(item.productId, productData.quantity - item.quantity, item.quantity);
      }
    }

    const filteredProducts = orderDetails.products.filter((item: any) => item.quantity !== 0);
    if (filteredProducts.length <= 0) {
      await order.outOfStock(orderId);
      await order.removeAllProducts(orderId);
      throw new CustomError(ErrorTypes.OUT_OF_STOCK);
    }

    await order.deliverOrder(orderId);
    return res.status(200).json({ success: true, message: `Order ${orderId} is now ready for delivery` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
