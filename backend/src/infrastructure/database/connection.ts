import mongoose from "mongoose";
import { config } from "../../config";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database.uri);
    console.log("MongoDB connected successfully");

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error: ", error);
    });
    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error);
    throw error;
  }
};
