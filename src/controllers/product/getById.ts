import { Response, Request, NextFunction } from "express";
import { Product } from "../../database";

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product();
    const productData = await product.getById(req.params.productId);
    return res.status(200).json({ success: true, data: productData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
