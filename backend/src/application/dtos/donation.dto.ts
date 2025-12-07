export interface InitiateDonationDTO {
  campaignId: string;
  amount: number;
  email: string;
  name?: string;
  isAnonymous?: boolean;
  message?: string;
}

export interface VerifyPaymentDTO {
  transactionId: string;
  transactionRef: string;
}
