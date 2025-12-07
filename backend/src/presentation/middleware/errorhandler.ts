import { NextFunction, Request, Response } from "express";
import { config } from "../../config";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    // Log operational errors at appropriate level
    console.log(`Operational Error [${err.statusCode}]: ${err.message}`);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      // Consider adding error code for client handling
      ...(config.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Log unexpected errors with more context
  console.error("Unexpected Error: ", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  res.status(500).json({
    status: "error",
    message:
      config.NODE_ENV === "production" ? "Internal server error" : err.message,
    ...(config.NODE_ENV === "development" && { stack: err.stack }),
  });
};
