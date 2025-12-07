import { IDonation } from "../../domain/entities/Donation";
import { PaymentStatus } from "../../domain/types";
import {
  DonationModel,
  IDonationDocument,
} from "../database/models/donation.model";

export class DonationRepository {
  async create(donationData: Partial<IDonation>): Promise<IDonationDocument> {
    const donation = new DonationModel(donationData);
    return await donation.save();
  }

  async findById(id: string): Promise<IDonationDocument | null> {
    return await DonationModel.findById(id)
      .populate("campaignId", "title")
      .populate("donorId", "name email");
  }

  async findByReference(reference: string): Promise<IDonationDocument | null> {
    return await DonationModel.findOne({ paymentReference: reference });
  }

  async findByCampaign(
    campaignId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ donations: IDonationDocument[]; total: number }> {
    const skip = (page - 1) * limit;

    const [donations, total] = await Promise.all([
      DonationModel.find({
        campaignId,
        paymentStatus: PaymentStatus.SUCCESSFUL,
      })
        .populate("donorId", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      DonationModel.countDocuments({
        campaignId,
        paymentStatus: PaymentStatus.SUCCESSFUL,
      }),
    ]);

    return { donations, total };
  }

  async findByDonor(
    donorId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ donations: IDonationDocument[]; total: number }> {
    const skip = (page - 1) * limit;

    const [donations, total] = await Promise.all([
      DonationModel.find({ donorId })
        .populate("campaignId", "title images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      DonationModel.countDocuments({ donorId }),
    ]);

    return { donations, total };
  }

  async updateStatus(
    id: string,
    status: PaymentStatus,
    metadata?: any
  ): Promise<IDonationDocument | null> {
    return await DonationModel.findByIdAndUpdate(
      id,
      { paymentStatus: status, metadata },
      { new: true }
    );
  }

  async getCampaignStats(campaignId: string) {
    const result = await DonationModel.aggregate([
      {
        $match: {
          campaignId: campaignId,
          paymentStatus: PaymentStatus.SUCCESSFUL,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalDonations: { $sum: 1 },
          avgDonation: { $avg: "$amount" },
        },
      },
    ]);

    return result[0] || { totalAmount: 0, totalDonations: 0, avgDonation: 0 };
  }
}
