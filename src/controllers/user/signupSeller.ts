import { Response, Request, NextFunction } from "express";
import { User } from "../../database";
import { UserRoles } from "../../enum";

export const signupSeller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User();
    await user.add({ ...req.body, role: UserRoles.SELLER });
    return res.status(200).json({ success: true, message: "Created a new seller account sucessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
