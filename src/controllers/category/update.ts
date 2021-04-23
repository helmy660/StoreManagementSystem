import { Response, Request, NextFunction } from "express";
import { Category } from "../../database";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = new Category();
    await category.update(req.params.categoryId, req.body);
    return res.status(200).json({ success: true, message: `Update category ${req.params.categoryId} successfuly` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
