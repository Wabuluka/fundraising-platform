import { IUser, IUserResponse } from "../../domain/entities/User";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { AppError } from "../../presentation/middleware/errorhandler";
import { generateRefreshToken, generateToken } from "../../shared/utils/jwt";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(userData: {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
  }): Promise<{
    user: IUserResponse;
    accessToken: string;
    refreshToken: string;
  }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) throw new AppError(400, "Email already registered");

    // create user
    const user = await this.userRepository.create({
      ...userData,
      isVerified: false,
    });

    // generate token
    const accessToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      user: user.toJSON() as IUserResponse,
      accessToken,
      refreshToken,
    };
  }

  async login(credentials: { email: string; password: string }): Promise<{
    user: IUserResponse;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) throw new AppError(401, "Invalid credentials");
    //check password
    const isPasswordValid = await user.comparePassword(credentials.password);
    if (!isPasswordValid) throw new AppError(401, "Invalid credentials");

    const accessToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { user: user.toJSON() as IUserResponse, accessToken, refreshToken };
  }

  async getCurrentUser(userId: string): Promise<IUserResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError(404, "User not found");
    return user.toJSON() as IUserResponse;
  }

  async updateProfile(
    userId: string,
    data: Partial<IUser>
  ): Promise<IUserResponse> {
    delete data.password;
    delete data.role;
    delete data.isVerified;

    const user = await this.userRepository.update(userId, data);
    if (!user) throw new AppError(404, "User not found");
    return user.toJSON() as IUserResponse;
  }
}
