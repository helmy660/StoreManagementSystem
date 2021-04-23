import { Response, Request, NextFunction } from "express";
import { Category } from "../../database";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = new Category();
    await category.add(req.body);
    return res.status(200).json({ success: true, message: "Created a new category sucessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
