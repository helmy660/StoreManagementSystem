import { Response, Request, NextFunction } from "express";
import { Product } from "../../database";

export const getByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product();
    const productList = await product.getByCategoryId(req.params.categoryId);
    return res.status(200).json({ success: true, products: productList });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
