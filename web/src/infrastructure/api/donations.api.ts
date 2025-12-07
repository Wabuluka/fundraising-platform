import axios from "./client";
export const donationsAPI = {
  initiate: async (data: {
    campaignId: string;
    amount: number;
    email: string;
    name?: string;
    message?: string;
    isAnonymous?: boolean;
  }) => {
    const response = await axios.post("/donations/initiate", data);
    return response.data.data;
  },
  verify: async (transactionId: string, transactionRef: string) => {
    const response = await axios.post("/donations/verify", {
      transactionId,
      transactionRef,
    });
    return response.data.data;
  },
  getById: async (id: string) => {
    const response = await axios.get(`/donations/${id}`);
    return response.data.data;
  },
  getCampaignDonations: async (campaignId: string, page = 1, limit = 20) => {
    const response = await axios.get(`/donations/campaign/${campaignId}`, {
      params: { page, limit },
    });
    return response.data.data;
  },
  getUserDonations: async (page = 1, limit = 20) => {
    const response = await axios.get("/donations/user/my-donations", {
      params: { page, limit },
    });
    return response.data.data;
  },

  getCampaignStats: async (campaignId: string) => {
    const response = await axios.get(`/donations/campaign/${campaignId}/stats`);
    return response.data.data;
  },
};
