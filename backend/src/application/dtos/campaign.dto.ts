import { CampaignCategory } from "../../domain/types";

export interface CreateCampaignDTO {
  title: string;
  description: string;
  story?: string;
  category: CampaignCategory;
  targetAmount: number;
  currency?: string;
  images?: string[];
  beneficiary: {
    name: string;
    relationship?: string;
    contactNumber?: string;
  };
  location?: string;
  endDate: Date;
  isUrgent?: boolean;
}

export interface UpdateCampaignDTO {
  title?: string;
  description?: string;
  story?: string;
  images?: string[];
  status?: string;
  isUrgent?: boolean;
}
