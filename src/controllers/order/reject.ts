import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Order, User } from "../../database";
import { OrderStatus, UserRoles } from "../../enum";

export const reject = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.payload;
    const order = new Order();
    const user = new User();

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

    const userData = await user.getById(userId);
    if (!userData || userData.role !== UserRoles.SELLER) {
      throw new CustomError(ErrorTypes.USER_NOT_AUTHORIZED);
    }

    await order.refuseBySeller(orderId);
    return res.status(200).json({ success: true, message: `Refused order ${orderId} successfuly` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
