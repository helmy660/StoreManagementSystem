import { Response, Request, NextFunction } from "express";
import { Order } from "../../database";

export const getUnAssigned = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = new Order();
    const orderList = await order.getUnAssigned();
    return res.status(200).json({ success: true, available_orders: orderList });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
