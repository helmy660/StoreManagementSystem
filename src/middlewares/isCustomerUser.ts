import { Request, Response, NextFunction } from "express";
import { User } from "../database";
import { CustomError, ErrorTypes } from "../services";
import { UserRoles } from "../enum";

export async function isCustomerUser(req: Request & { payload: any }, res: Response, next: NextFunction) {
  try {
    const { userId } = req.payload;
    if (!userId) {
      throw new CustomError(ErrorTypes.INVALID_USER_ID);
    }
    const user = new User();
    const userData = await user.getById(userId);
    if (!(userData.role === UserRoles.ADMIN || userData.role === UserRoles.CUSTOMER)) {
      throw new CustomError(ErrorTypes.USER_NOT_AUTHORIZED);
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: "Access denied. User is not authorized to perform this action",
    });
  }
}
