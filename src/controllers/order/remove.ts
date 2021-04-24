import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Order } from "../../database";
import { OrderStatus } from "../../enum";

export const remove = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { orderId } = req.params;

    const order = new Order();
    const orderDetails = await order.getById(orderId);
    if (!orderDetails) {
      throw new CustomError(ErrorTypes.INVALID_ORDER);
    }

    if (orderDetails.customerId !== userId) {
      throw new CustomError(ErrorTypes.USER_NOT_AUTHORIZED);
    }

    if (
      orderDetails.status === OrderStatus.ASSIGNED_TO_SELLER ||
      orderDetails.status === OrderStatus.READY_FOR_DELIVERY
    ) {
      throw new CustomError(ErrorTypes.ORDER_UNDER_PROCESSING);
    }

    await order.removeOrder(orderId);

    return res.status(200).json({ success: true, message: "An order has been deleted sucessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
