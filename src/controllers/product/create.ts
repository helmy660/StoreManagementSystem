import { Response, Request, NextFunction } from "express";
import { Product } from "../../database";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product();
    await product.add(req.body);
    return res.status(200).json({ success: "true", message: "Created a new product sucessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
