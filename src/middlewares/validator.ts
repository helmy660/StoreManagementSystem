import { Response, NextFunction, Request } from "express";
import { validationResult } from "express-validator";
import { CustomError, ErrorTypes } from "../services";

export function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    throw new CustomError(ErrorTypes.INVALID_REQUEST_BODY);
  }
  next();
}
