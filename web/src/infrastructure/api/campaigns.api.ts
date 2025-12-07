import axios from "./client";

export const campaignsAPI = {
  getAll: async () => {
    const { data } = await axios.get("/campaigns");
    return data.data;
  },
  getById: () => {},
  getUserCampaigns: async (page = 1, limit = 10) => {
    const { data } = await axios.get("/campaigns/user/my-campaigns", {
      params: { page, limit },
    });
    return data.data;
  },
  publish: async (id: string) => {
    const { data } = await axios.post(`/campaigns/${id}/publish`);
    return data.data;
  },
  pause: async (id: string) => {
    const { data } = await axios.post(`/campaigns/${id}/pause`);
    return data.data;
  },
};
