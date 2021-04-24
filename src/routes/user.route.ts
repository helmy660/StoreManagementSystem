import { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controllers/user";
import { auth, isAdminUser, logger, validator } from "../middlewares";

const router = Router();

router.post(
  "/login",
  logger,
  [body("userName").exists({ checkNull: true }).isString(), body("password").exists({ checkNull: true }).isString()],
  validator,
  userController.login,
);

router.post(
  "/signup/seller",
  logger,
  [
    body("userName").exists({ checkNull: true }).isString(),
    body("password").exists({ checkNull: true }).isString(),
    body("firstName").exists({ checkNull: true }).isString(),
    body("lastName").exists({ checkNull: true }).isString(),
  ],
  validator,
  userController.signupSeller,
);

router.post(
  "/signup/customer",
  logger,
  [
    body("userName").exists({ checkNull: true }).isString(),
    body("password").exists({ checkNull: true }).isString(),
    body("firstName").exists({ checkNull: true }).isString(),
    body("lastName").exists({ checkNull: true }).isString(),
  ],
  validator,
  userController.signupCustomer,
);

router.post(
  "/createAdmin",
  logger,
  auth,
  isAdminUser,
  [
    body("userName").exists({ checkNull: true }).isString(),
    body("password").exists({ checkNull: true }).isString(),
    body("firstName").exists({ checkNull: true }).isString(),
    body("lastName").exists({ checkNull: true }).isString(),
  ],
  validator,
  userController.createAdmin,
);

export default router;
