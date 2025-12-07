import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "./errorhandler";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    throw new AppError(400, errorMessages);
  }
  next();
};
