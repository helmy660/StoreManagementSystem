import { Response, Request, NextFunction } from "express";
import { Product } from "../../database";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product();
    await product.update(req.params.productId, req.body);
    return res.status(200).json({ success: true, message: `Update product ${req.params.productId} successfuly` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
