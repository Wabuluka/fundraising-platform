import { ICampaign } from "../../domain/entities/Campaign";
import { CampaignFilters, PaginationOptions } from "../../domain/interfaces";
import { CampaignStatus } from "../../domain/types";
import { CampaignRepository } from "../../infrastructure/repositories/campaign.repository";
import { AppError } from "../../presentation/middleware/errorhandler";

export class CampaignService {
  constructor(private campaignRepository: CampaignRepository) {}

  async createCampaign(
    organizerId: string,
    campaignData: Partial<ICampaign>
  ): Promise<ICampaign> {
    const endDate = new Date(campaignData.endDate!);
    if (endDate <= new Date())
      throw new AppError(400, "End date must be in the future");
    const campaign = await this.campaignRepository.create({
      ...campaignData,
      organizerId,
      currentAmount: 0,
      status: CampaignStatus.DRAFT,
    });
    return campaign.toJSON() as ICampaign;
  }

  async getCampaigns(filters: CampaignFilters, pagination: PaginationOptions) {
    const { campaigns, total } = await this.campaignRepository.findAll(
      filters,
      pagination
    );

    return {
      campaigns: campaigns.map((c) => c.toJSON()),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        pages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async getCampaignById(id: string): Promise<ICampaign> {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) throw new AppError(404, "Campaign not found");
    return campaign.toJSON() as ICampaign;
  }

  async updateCampaign(
    id: string,
    organizerId: string,
    data: Partial<ICampaign>
  ): Promise<ICampaign> {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new AppError(404, "Campaign not found");
    }
    // Check ownership
    if (campaign.organizerId.toString() !== organizerId) {
      throw new AppError(403, "Not authorized to update this campaign");
    }
    // Don't allow updating certain fields
    delete data.organizerId;
    delete data.currentAmount;
    const updated = await this.campaignRepository.update(id, data);
    if (!updated) {
      throw new AppError(404, "Campaign not found");
    }
    return updated.toJSON() as ICampaign;
  }

  async deleteCampaign(id: string, organizerId: string): Promise<void> {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new AppError(404, "Campaign not found");
    }
    // Check ownership
    if (campaign.organizerId.toString() !== organizerId) {
      throw new AppError(403, "Not authorized to delete this campaign");
    }
    // Don't allow deleting campaigns with donations
    if (campaign.currentAmount > 0) {
      throw new AppError(400, "Cannot delete campaign with donations");
    }
    await this.campaignRepository.delete(id);
  }

  async publishCampaign(id: string, organizerId: string): Promise<ICampaign> {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new AppError(404, "Campaign not found");
    }
    if (campaign.organizerId.toString() !== organizerId) {
      throw new AppError(403, "Not authorized");
    }
    if (campaign.status !== CampaignStatus.DRAFT) {
      throw new AppError(400, "Campaign is already published");
    }
    const updated = await this.campaignRepository.update(id, {
      status: CampaignStatus.ACTIVE,
      startDate: new Date(),
    });
    return updated!.toJSON() as ICampaign;
  }

  async pauseCampaign(id: string, organizerId: string): Promise<ICampaign> {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new AppError(404, "Campaign not found");
    }
    if (campaign.organizerId.toString() !== organizerId) {
      throw new AppError(403, "Not authorized");
    }
    const updated = await this.campaignRepository.update(id, {
      status: CampaignStatus.PAUSED,
    });
    return updated!.toJSON() as ICampaign;
  }

  async getFeaturedCampaigns(limit: number = 6) {
    const campaigns = await this.campaignRepository.getFeatured(limit);
    return campaigns.map((c) => c.toJSON());
  }

  async getUserCampaigns(userId: string, page: number = 1, limit: number = 10) {
    return this.getCampaigns({ organizerId: userId }, { page, limit });
  }
}
