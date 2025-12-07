import { config } from "../../config";
import { JWTPayload } from "../../domain/interfaces";
import jwt from "jsonwebtoken";

export const generateToken = (payload: JWTPayload): string => {
  try {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  } catch (error) {
    throw new Error("Error generating access token");
  }
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwt.secret) as JWTPayload;
};

export const generateRefreshToken = (payload: JWTPayload) => {
  try {
    return jwt.sign(payload, config.jwt.refresh, {
      expiresIn: config.jwt.refreshExpiresIn,
    });
  } catch (error) {
    throw new Error("Error generating refresh token");
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwt.refresh) as JWTPayload;
};
