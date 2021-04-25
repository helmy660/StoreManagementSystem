import { Router } from "express";
import { param } from "express-validator";
import * as orderController from "../controllers/order";
import { logger, validator, auth, isCustomerUser, isAdminUser, isSellerUser } from "../middlewares";

const router = Router();

// Customer routes
router.post("/checkout", logger, auth, isCustomerUser, orderController.create);

router.get("/customers", logger, auth, isCustomerUser, orderController.getCustomerOrders);

router.get("/sellers", logger, auth, isSellerUser, orderController.getSellerOrders);

router.post(
  "/removeOrder/:orderId",
  logger,
  auth,
  isCustomerUser,
  [param("orderId").exists({ checkNull: true }).isMongoId()],
  validator,
  orderController.remove,
);

router.get(
  "/order/:orderId",
  logger,
  auth,
  isAdminUser,
  [param("orderId").exists({ checkNull: true }).isMongoId()],
  validator,
  orderController.getById,
);

router.get("/assigned", logger, auth, isAdminUser, orderController.getAssigned);

router.get("/unassigned", logger, auth, isAdminUser, orderController.getUnAssigned);

router.get("/", logger, auth, isAdminUser, orderController.getAll);

router.post(
  "/assignSeller/:sellerId/order/:orderId",
  logger,
  auth,
  isAdminUser,
  [param("orderId").exists({ checkNull: true }).isMongoId()],
  [param("sellerId").exists({ checkNull: true }).isMongoId()],
  validator,
  orderController.assignSeller,
);

router.post(
  "/reject/:orderId",
  logger,
  auth,
  isSellerUser,
  [param("orderId").exists({ checkNull: true }).isMongoId()],
  validator,
  orderController.reject,
);

router.post(
  "/confirm/:orderId",
  logger,
  auth,
  isSellerUser,
  [param("orderId").exists({ checkNull: true }).isMongoId()],
  validator,
  orderController.confirmOrder,
);

export default router;
