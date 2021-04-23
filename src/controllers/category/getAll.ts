import { Response, Request, NextFunction } from "express";
import { Category } from "../../database";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = new Category();
    const categoryList = await category.getAll();
    return res.status(200).json({ success: true, data: categoryList });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
