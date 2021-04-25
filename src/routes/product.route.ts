import { Router } from "express";
import { body, param } from "express-validator";
import * as productController from "../controllers/product";
import { logger, validator, auth, isSellerUser } from "../middlewares";

const router = Router();

router.post(
  "/",
  logger,
  auth,
  isSellerUser,
  [
    body("title").exists({ checkNull: true }).isString().isLength({ min: 3, max: 50 }),
    body("description").exists({ checkNull: true }).isString().isLength({ min: 3, max: 300 }),
    body("picture")
      .exists({ checkNull: true })
      .isString()
      .isURL()
      .matches("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$"),
    body("rate").optional({ nullable: false }).isFloat({ gt: 0 }),
    body("price").exists({ checkNull: true }).isFloat({ gt: 0 }),
    body("quantity").exists({ checkNull: true }).isInt({ gt: 0 }),
    body("categories").exists({ checkNull: true }).isArray({ min: 1 }).isMongoId(),
    body("soldNumbers").optional({ nullable: false }).isInt({ gt: 0 }),
    body("offer").optional({ nullable: false }).isFloat({ gt: 0, lt: 100 }),
  ],
  validator,
  productController.create,
);

router.put(
  "/:productId",
  logger,
  auth,
  isSellerUser,
  [
    body("title").optional({ nullable: false }).isString().isLength({ min: 3, max: 50 }),
    body("description").optional({ nullable: false }).isString().isLength({ min: 3, max: 300 }),
    body("picture")
      .optional({ nullable: false })
      .isString()
      .isURL()
      .matches("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$"),
    body("rate").optional({ nullable: false }).isFloat({ gt: 0 }),
    body("price").optional({ nullable: false }).isFloat({ gt: 0 }),
    body("quantity").optional({ nullable: false }).isInt({ gt: 0 }),
    body("categories").optional({ nullable: false }).isArray({ min: 1 }).isMongoId(),
    body("soldNumbers").optional({ nullable: false }).isInt({ gt: 0 }),
    body("offer").optional({ nullable: false }).isFloat({ gt: 0, lt: 100 }),
  ],
  validator,
  productController.update,
);

router.get(
  "/:productId",
  logger,
  auth,
  [param("productId").exists({ checkNull: true }).isMongoId()],
  validator,
  productController.getById,
);

router.get(
  "/category/:categoryId",
  logger,
  auth,
  [param("categoryId").exists({ checkNull: true }).isMongoId()],
  validator,
  productController.getByCategory,
);

router.get("/", logger, auth, productController.getAll);

export default router;
