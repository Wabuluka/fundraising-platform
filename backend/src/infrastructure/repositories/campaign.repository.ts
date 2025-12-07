import { ICampaign } from "../../domain/entities/Campaign";
import { CampaignFilters, PaginationOptions } from "../../domain/interfaces";
import { CampaignStatus } from "../../domain/types";
import {
  CampaignModel,
  ICampaignDocument,
} from "../database/models/campaign.model";

export class CampaignRepository {
  async create(campaignData: Partial<ICampaign>): Promise<ICampaignDocument> {
    const campaign = new CampaignModel(campaignData);
    return await campaign.save();
  }

  async findById(id: string): Promise<ICampaignDocument | null> {
    return await CampaignModel.findById(id).populate(
      "organizerId",
      "name email"
    );
  }

  async findAll(
    filters: CampaignFilters,
    pagination: PaginationOptions
  ): Promise<{ campaigns: ICampaignDocument[]; total: number }> {
    const query: any = {};
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.organizerId) {
      query.organizerId = filters.organizerId;
    }
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } },
      ];
    }
    const skip = (pagination.page - 1) * pagination.limit;
    const [campaigns, total] = await Promise.all([
      CampaignModel.find(query)
        .populate("organizerId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pagination.limit),
      CampaignModel.countDocuments(query),
    ]);
    return { campaigns, total };
  }

  async update(
    id: string,
    data: Partial<ICampaign>
  ): Promise<ICampaignDocument | null> {
    return await CampaignModel.findByIdAndUpdate(id, data, { new: true });
  }

  async updateAmount(
    id: string,
    amount: number
  ): Promise<ICampaignDocument | null> {
    return await CampaignModel.findByIdAndUpdate(
      id,
      { $inc: { currentAmount: amount } },
      { new: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await CampaignModel.findByIdAndDelete(id);
    return !!result;
  }

  async getFeatured(limit: number = 6): Promise<ICampaignDocument[]> {
    return await CampaignModel.find({
      status: CampaignStatus.ACTIVE,
      featuredAt: { $exists: true, $ne: null },
    })
      .populate("organizerId", "name email")
      .sort({ featuredAt: -1 })
      .limit(limit);
  }
}
