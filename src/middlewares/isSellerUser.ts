import { Request, Response, NextFunction } from "express";
import { User } from "../database";
import { CustomError, ErrorTypes } from "../services";
import { UserRoles } from "../enum";

export async function isSellerUser(req: Request & { payload: any }, res: Response, next: NextFunction) {
  try {
    const { id } = req.payload;
    if (!id) {
      throw new CustomError(ErrorTypes.INVALID_USER_ID);
    }
    const user = new User();
    const userData = await user.getById(id);
    if (!(userData.role === UserRoles.ADMIN || userData.role === UserRoles.SELLER)) {
      throw new CustomError(ErrorTypes.INVALID_USER_ID);
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
