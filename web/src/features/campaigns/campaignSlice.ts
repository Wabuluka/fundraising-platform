import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Campaign } from "../../shared/types";
import { campaignsAPI } from "../../infrastructure/api/campaigns.api";

interface CampaignsState {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  loading: boolean;
  error: string | null;
  filters: {
    category?: string;
    status?: string;
    search?: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: CampaignsState = {
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
};

export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetchCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await campaignsAPI.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.message || "Failed to fetch campaigns"
      );
    }
  }
);

export const fetchCampaignById = createAsyncThunk(
  "campaigns/fetchCampaignById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await campaignsAPI.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch campaign"
      );
    }
  }
);

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
});

export default campaignSlice.reducer;
