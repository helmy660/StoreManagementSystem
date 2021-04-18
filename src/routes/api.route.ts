import { Router } from "express";
import * as apiController from "../controllers/api.controller";
import { logger } from "../middlewares";

const router = Router();

router.get("/", logger, apiController.getApi);

export default router;
