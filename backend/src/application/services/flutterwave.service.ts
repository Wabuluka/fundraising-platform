import axios from "axios";
import crypto from "crypto";
import { config } from "../../config";
import {
  PaymentInitData,
  PaymentInitResponse,
  VerifyPaymentResponse,
} from "../../domain/interfaces";
import { AppError } from "../../presentation/middleware/errorhandler";

export class FlutterwaveService {
  private getHeaders() {
    return {
      Authorization: `Bearer ${config.flutterwave.secretKey}`,
      "Content-Type": "application/json",
    };
  }

  async initializePayment(data: PaymentInitData): Promise<PaymentInitResponse> {
    try {
      const response = await axios.post(
        `${config.flutterwave.apiUrl}/payments`,
        {
          tx_ref: data.reference,
          amount: data.amount,
          currency: "NGN",
          redirect_url: data.callbackUrl,
          customer: {
            email: data.email,
            name: data.name,
          },
          customizations: {
            title: "Campaign Donation",
            description: `Donation for campaign`,
            logo: "https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-free-demo-banner-design-vector-png-image_6695393.png",
          },
          meta: {
            campaign_id: data.campaignId,
          },
        },
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error: any) {
      console.error("Flutterwave initialization error:", error.response?.data);
      throw new AppError(500, "Failed to initialize payment");
    }
  }

  async verifyPayment(transactionId: string): Promise<VerifyPaymentResponse> {
    try {
      const response = await axios.get(
        `${config.flutterwave.apiUrl}/transactions/${transactionId}/verify`,
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error: any) {
      console.error("Flutterwave verification error:", error.response?.data);
      throw new AppError(500, "Failed to verify payment");
    }
  }

  async verifyWebhook(signature: string, payload: any): Promise<boolean> {
    const hash = crypto
      .createHmac("sha256", config.flutterwave.webhookHash)
      .update(JSON.stringify(payload))
      .digest("hex");
    return hash === signature;
  }
}
