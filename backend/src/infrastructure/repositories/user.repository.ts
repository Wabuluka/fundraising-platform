import { IUser } from "../../domain/entities/User";
import { IUserDocument, UserModel } from "../database/models/user.model";

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUserDocument> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findById(id).select("-password");
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email });
  }

  async update(
    id: string,
    data: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).select(
      "-password"
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }

  async exists(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email });
    return count > 0;
  }
}
