import { Response, Request, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Order, User } from "../../database";
import { UserRoles } from "../../enum";

export const assignSeller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId, sellerId } = req.params;
    const order = new Order();
    const user = new User();

    const orderDetails = await order.getById(orderId);
    if (!orderDetails) {
      throw new CustomError(ErrorTypes.INVALID_ORDER);
    }

    const userData = await user.getById(sellerId);
    if (!userData || userData.role !== UserRoles.SELLER) {
      throw new CustomError(ErrorTypes.INVALID_SELLER);
    }

    await order.assignToSeller(orderId, sellerId);
    return res.status(200).json({ success: true, message: `Assign order ${orderId} to seller ${sellerId}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
