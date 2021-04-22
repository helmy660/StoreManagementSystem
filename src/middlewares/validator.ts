import { Response, NextFunction, Request } from "express";
import { validationResult } from "express-validator";
import { CustomError, ErrorTypes } from "../services";

export function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const InvalidData = errors.array().map((item: any) => item.param);
    throw new CustomError({
      code: ErrorTypes.INVALID_REQUEST_BODY.code,
      message: `${ErrorTypes.INVALID_REQUEST_BODY.message}. Wrong ${InvalidData}`,
    });
  }
  next();
}
