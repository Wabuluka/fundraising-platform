import type { User } from "../../shared/types";
import axios from "./client";

export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await axios.post("/auth/login", credentials);
    return data.data;
  },
  register: async (userData: {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
  }) => {
    const { data } = await axios.post("/auth/register", userData);
    return data.data;
  },
  getCurrentUser: async (): Promise<User> => {
    const { data } = await axios.get("/auth/me");
    return data.data;
  },
  updateProfile: async (data: { name?: string; phoneNumber?: string }) => {
    const response = await axios.put("/auth/profile", data);
    return response.data.data;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  refreshToken: async (
    refreshToken: string
  ): Promise<{ accessToken: string }> => {
    const { data } = await axios.post("/auth/refresh", { refreshToken });
    return data.data;
  },
};
