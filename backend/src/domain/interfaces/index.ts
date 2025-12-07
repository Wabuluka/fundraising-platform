import { CampaignStatus } from "../types";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface CampaignFilters {
  category?: string;
  status?: CampaignStatus;
  search?: string;
  organizerId?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaymentInitData {
  amount: number;
  email: string;
  name: string;
  reference: string;
  campaignId: string;
  callbackUrl: string;
}

export interface PaymentInitResponse {
  status: string;
  message: string;
  data: {
    link: string;
  };
}

export interface VerifyPaymentResponse {
  status: string;
  message: string;
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    amount: number;
    currency: string;
    charged_amount: number;
    status: string;
    customer: {
      email: string;
      name: string;
    };
    created_at: string;
  };
}
