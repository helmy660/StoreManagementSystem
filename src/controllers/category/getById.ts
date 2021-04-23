import { Response, Request, NextFunction } from "express";
import { Category } from "../../database";

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = new Category();
    const categoryData = await category.getById(req.params.categoryId);
    return res.status(200).json({ success: true, data: categoryData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
