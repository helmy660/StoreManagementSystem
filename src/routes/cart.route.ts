import { Router } from "express";
import { body, param } from "express-validator";
import * as cartController from "../controllers/cart";
import { logger, validator, auth, isCustomerUser, isAdminUser } from "../middlewares";

const router = Router();

// Customer routes
router.post("/", logger, auth, isCustomerUser, cartController.create);

router.get("/myCart/details", logger, auth, isCustomerUser, cartController.getByCustomer);

router.post("/myCart/clear", logger, auth, isCustomerUser, cartController.clear);

router.post(
  "/myCart/addProduct",
  logger,
  auth,
  isCustomerUser,
  [
    body("productId").exists({ checkNull: true }).isMongoId(),
    body("quantity").exists({ checkNull: true }).isInt({ gt: 0 }),
  ],
  validator,
  cartController.addProduct,
);

router.post(
  "/myCart/removeProduct",
  logger,
  auth,
  isCustomerUser,
  [
    body("productId").exists({ checkNull: true }).isMongoId(),
    body("quantity").exists({ checkNull: true }).isInt({ gt: 0 }),
  ],
  validator,
  cartController.removeProduct,
);

// Admin routes
router.get(
  "/:cartId",
  logger,
  auth,
  isAdminUser,
  [param("cartId").exists({ checkNull: true }).isMongoId()],
  validator,
  cartController.getById,
);

router.get("/", logger, auth, isAdminUser, cartController.getAll);

router.get(
  "/customer/:customerId",
  logger,
  auth,
  isAdminUser,
  [param("customerId").exists({ checkNull: true }).isMongoId()],
  validator,
  cartController.getByCustomer,
);

router.post(
  "/addProduct/:cartId",
  logger,
  auth,
  isAdminUser,
  [
    param("cartId").exists({ checkNull: true }).isMongoId(),
    body("productId").exists({ checkNull: true }).isMongoId(),
    body("quantity").exists({ checkNull: true }).isInt({ gt: 0 }),
  ],
  validator,
  cartController.addProduct,
);

router.post(
  "/removeProduct/:cartId",
  logger,
  auth,
  isAdminUser,
  [
    param("cartId").exists({ checkNull: true }).isMongoId(),
    body("productId").exists({ checkNull: true }).isMongoId(),
    body("quantity").exists({ checkNull: true }).isInt({ gt: 0 }),
  ],
  validator,
  cartController.removeProduct,
);

router.post(
  "/susbend/:cartId",
  logger,
  auth,
  isAdminUser,
  [param("cartId").exists({ checkNull: true }).isMongoId()],
  validator,
  cartController.susbend,
);

router.post(
  "/clearCart/:cartId",
  logger,
  auth,
  isAdminUser,
  [param("cartId").exists({ checkNull: true }).isMongoId()],
  validator,
  cartController.clear,
);

export default router;
