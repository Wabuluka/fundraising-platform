import { CampaignCategory, CampaignStatus } from "@domain/types";

export interface IBeneficiary {
  name: string;
  relationship?: string;
  contactNumber?: string;
}

export interface ICampaign {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  story?: string;
  category: CampaignCategory;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  images: string[];
  status: CampaignStatus;
  beneficiary: IBeneficiary;
  location?: string;
  startDate: Date;
  endDate: Date;
  isUrgent: boolean;
  featuredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
