import { config } from "../../config";
import { IDonation } from "../../domain/entities/Donation";
import { CampaignStatus, PaymentStatus } from "../../domain/types";
import { CampaignRepository } from "../../infrastructure/repositories/campaign.repository";
import { DonationRepository } from "../../infrastructure/repositories/donation.repository";
import { AppError } from "../../presentation/middleware/errorhandler";
import { FlutterwaveService } from "./flutterwave.service";

export class DonationService {
  constructor(
    private donationRepository: DonationRepository,
    private campaignRepository: CampaignRepository,
    private flutterwaveService: FlutterwaveService
  ) {}

  async initiateDonation(data: {
    campaignId: string;
    amount: number;
    email: string;
    name?: string;
    donorId?: string;
    isAnonymous?: boolean;
    message?: string;
  }) {
    // Validate campaign
    const campaign = await this.campaignRepository.findById(data.campaignId);
    if (!campaign) {
      throw new AppError(404, "Campaign not found");
    }
    if (campaign.status !== CampaignStatus.ACTIVE) {
      throw new AppError(400, "Campaign is not active");
    }
    // Check if campaign has ended
    if (new Date(campaign.endDate) < new Date()) {
      throw new AppError(400, "Campaign has ended");
    }
    // Generate unique reference
    const reference = `DON-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    // Create donation record
    const donation = await this.donationRepository.create({
      campaignId: data.campaignId,
      donorId: data.donorId,
      donorEmail: data.email,
      donorName: data.name || "Anonymous",
      amount: data.amount,
      currency: campaign.currency,
      isAnonymous: data.isAnonymous || false,
      message: data.message,
      paymentStatus: PaymentStatus.PENDING,
      paymentReference: reference,
      paymentProvider: "flutterwave",
    });
    // Initialize payment with Flutterwave
    const paymentResponse = await this.flutterwaveService.initializePayment({
      amount: data.amount,
      email: data.email,
      name: data.name || "Anonymous Donor",
      reference,
      campaignId: data.campaignId,
      callbackUrl: `${config.frontendUrl}/donations/verify`,
    });

    return {
      donation: donation.toJSON(),
      paymentUrl: paymentResponse.data.link,
    };
  }

  async verifyPayment(transactionId: string, reference: string) {
    // Find donation
    const donation = await this.donationRepository.findByReference(reference);
    if (!donation) {
      throw new AppError(404, "Donation not found");
    }
    // Verify with Flutterwave
    const verification = await this.flutterwaveService.verifyPayment(
      transactionId
    );
    if (verification.data.status !== "successful") {
      await this.donationRepository.updateStatus(
        donation._id.toString(),
        PaymentStatus.FAILED,
        verification.data
      );
      throw new AppError(400, "Payment verification failed");
    }
    // Update donation status
    await this.donationRepository.updateStatus(
      donation._id.toString(),
      PaymentStatus.SUCCESSFUL,
      verification.data
    );
    // Update campaign amount
    await this.campaignRepository.updateAmount(
      donation.campaignId.toString(),
      donation.amount
    );
    return {
      success: true,
      donation: donation.toJSON(),
    };
  }

  async handleWebhook(signature: string, payload: any) {
    // Verify webhook signature
    const isValid = await this.flutterwaveService.verifyWebhook(
      signature,
      payload
    );
    if (!isValid) {
      throw new AppError(401, "Invalid webhook signature");
    }
    const { tx_ref, status, amount } = payload.data;
    // Find donation
    const donation = await this.donationRepository.findByReference(tx_ref);
    if (!donation) {
      console.error("Donation not found for webhook:", tx_ref);
      return;
    }
    // Update status based on webhook
    if (status === "successful") {
      await this.donationRepository.updateStatus(
        donation._id.toString(),
        PaymentStatus.SUCCESSFUL,
        payload.data
      );
      // Update campaign amount
      await this.campaignRepository.updateAmount(
        donation.campaignId.toString(),
        amount
      );
    } else if (status === "failed") {
      await this.donationRepository.updateStatus(
        donation._id.toString(),
        PaymentStatus.FAILED,
        payload.data
      );
    }
  }

  async getDonationById(id: string): Promise<IDonation> {
    const donation = await this.donationRepository.findById(id);
    if (!donation) {
      throw new AppError(404, "Donation not found");
    }
    return donation.toJSON() as IDonation;
  }

  async getCampaignDonations(
    campaignId: string,
    page: number = 1,
    limit: number = 20
  ) {
    const { donations, total } = await this.donationRepository.findByCampaign(
      campaignId,
      page,
      limit
    );
    return {
      donations: donations.map((d) => {
        const json = d.toJSON() as any;
        // Hide email if anonymous
        if (json.isAnonymous) {
          json.donorName = "Anonymous";
          delete json.donorEmail;
        }
        return json;
      }),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getUserDonations(userId: string, page: number = 1, limit: number = 20) {
    const { donations, total } = await this.donationRepository.findByDonor(
      userId,
      page,
      limit
    );
    return {
      donations: donations.map((d) => d.toJSON()),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
  async getCampaignStats(campaignId: string) {
    const stats = await this.donationRepository.getCampaignStats(campaignId);
    return stats;
  }
}
