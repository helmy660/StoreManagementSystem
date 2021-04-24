import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Order } from "../../database";

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const order = new Order();
    const orderDetails = await order.getById(orderId);
    if (!orderDetails) {
      throw new CustomError(ErrorTypes.INVALID_ORDER);
    }
    return res.status(200).json({ success: true, data: orderDetails });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
