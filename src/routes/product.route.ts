import { Router } from "express";
import { body, param, query } from "express-validator";
import * as productController from "../controllers/product.controller";
import { logger, validator } from "../middlewares";

const router = Router();

router.post(
  "/",
  logger,
  [body("userId").exists({ checkNull: true }).isString()],
  validator,
  productController.createProduct,
);

export default router;
