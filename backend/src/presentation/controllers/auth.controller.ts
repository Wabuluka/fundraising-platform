import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../application/services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../../shared/utils/jwt";

export class AuthController {
  /**
   * Constructor
   * @param authService
   */
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refresh Token
   * @param req
   * @param res
   * @param next
   */
  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token is required",
        });
      }
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);
      const newAccessToken = generateToken({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      });
      const newRefreshToken = generateRefreshToken({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      });
      res.json({
        success: true,
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.getCurrentUser(req.user!.userId);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.updateProfile(
        req.user!.userId,
        req.body
      );
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
