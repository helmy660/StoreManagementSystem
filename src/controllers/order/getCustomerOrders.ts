import { Response, Request, NextFunction } from "express";
import { Order } from "../../database";

export const getCustomerOrders = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const order = new Order();
    const orderList = await order.getCustomerOrders(userId);
    return res.status(200).json({ success: true, orders: orderList });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
