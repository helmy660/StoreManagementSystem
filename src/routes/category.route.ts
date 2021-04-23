import { Router } from "express";
import { body, param } from "express-validator";
import * as categoryController from "../controllers/category";
import { logger, validator, auth, isAdminUser } from "../middlewares";

const router = Router();

router.post(
  "/",
  logger,
  auth,
  isAdminUser,
  [
    body("name").exists({ checkNull: true }).isString().isLength({ min: 3, max: 50 }),
    body("title").exists({ checkNull: true }).isString().isLength({ min: 3, max: 200 }),
  ],
  validator,
  categoryController.create,
);

router.put(
  "/:categoryId",
  logger,
  auth,
  isAdminUser,
  [
    param("categoryId").exists({ checkNull: true }).isMongoId(),
    body("title").exists({ checkNull: true }).isString().isLength({ min: 3, max: 200 }),
  ],
  validator,
  categoryController.update,
);

router.get(
  "/:categoryId",
  logger,
  auth,
  [param("categoryId").exists({ checkNull: true }).isMongoId()],
  validator,
  categoryController.getById,
);

router.get("/", logger, auth, categoryController.getAll);

export default router;
