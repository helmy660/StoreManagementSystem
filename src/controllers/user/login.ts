import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";
import { User } from "../../database";
import { CustomError, ErrorTypes } from "../../services";
import { JWT_SECRET, JWT_EXPIRY } from "../../util/secrets";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRef = new User();
    const userModel = new UserModel();

    const userData = await userRef.getByUserName(req.body.userName);
    const existingUser = await userModel.validPassword(req.body.password, userData.password);
    if (existingUser) {
      return res
        .status(200)
        .json({ success: true, token: jwt.sign({ userId: userData._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY }) });
    } else {
      throw new CustomError(ErrorTypes.INVALID_CREDENTIALS);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
