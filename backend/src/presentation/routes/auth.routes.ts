import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { AuthService } from "../../application/services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { authValidators } from "../../shared/utils/validators";
import { validate } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Routes
router.post(
  "/register",
  authValidators.register,
  validate,
  authController.register
);
router.get("/check", authenticate, (req, res) => {
  res.status(200).json(true);
});
router.post("/login", authValidators.login, validate, authController.login);

router.get("/me", authenticate, authController.getCurrentUser);

router.put("/profile", authenticate, authController.updateProfile);

export default router;
