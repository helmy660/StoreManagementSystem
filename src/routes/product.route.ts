import { Router } from "express";
import { body, param, query } from "express-validator";
import * as productController from "../controllers/product/create";
import { logger, validator, auth } from "../middlewares";

const router = Router();

router.post(
  "/",
  logger,
  auth,
  [
    body("name").exists({ checkNull: true }).isString().isLength({ min: 3, max: 50 }),
    body("picture")
      .exists({ checkNull: true })
      .isString()
      .isURL()
      .matches("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$"),
    body("rate").exists({ checkNull: true }).isNumeric(),
    body("price").exists({ checkNull: true }).isNumeric(),
    body("quantity").exists({ checkNull: true }).isNumeric(),
    body("soldNumbers").optional({ nullable: false }).isNumeric(),
  ],
  validator,
  productController.create,
);

export default router;
