import { Response, Request } from "express";
import { Product } from "../database";

export const createProduct = async (req: Request, res: Response) => {
  const product = new Product(req.body.userId);
  await product.add(req.body.data);
  res.status(200).json({ success: "true" });
};
