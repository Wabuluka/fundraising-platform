import { NextFunction, Request, Response } from "express";
import { JWTPayload } from "../../domain/interfaces";
import { AppError } from "./errorhandler";
import { verifyToken } from "../../shared/utils/jwt";
import { UserRole } from "../../domain/types";

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new AppError(401, "No token provided");
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, "Invalid or expired token"));
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Not authenticated"));
    if (!roles.includes(req.user.role as UserRole))
      return next(new AppError(403, "Not authorized to access this resource"));
    next();
  };
};
