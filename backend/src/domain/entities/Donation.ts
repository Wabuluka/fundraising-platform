import { PaymentStatus } from "@domain/types";

export interface IDonation {
  id: string;
  campaignId: string;
  donorId?: string;
  donorName?: string;
  donorEmail?: string;
  amount: number;
  currency: string;
  isAnonymous: boolean;
  message?: string;
  paymentStatus: PaymentStatus;
  paymentReference: string;
  paymentProvider: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
