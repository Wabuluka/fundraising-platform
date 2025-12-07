import { Response, NextFunction } from "express";
import { CampaignService } from "../../application/services/campaign.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class CampaignController {
  constructor(private campaignService: CampaignService) {}

  createCampaign = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const campaign = await this.campaignService.createCampaign(
        req.user!.userId,
        req.body
      );
      res.status(201).json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  };

  getCampaigns = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page = 1, limit = 12, category, status, search } = req.query;

      const result = await this.campaignService.getCampaigns(
        {
          category: category as string,
          status: status as any,
          search: search as string,
        },
        {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
        }
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getCampaignById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const campaign = await this.campaignService.getCampaignById(
        req.params.id
      );
      res.json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCampaign = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const campaign = await this.campaignService.updateCampaign(
        req.params.id,
        req.user!.userId,
        req.body
      );
      res.json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCampaign = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.campaignService.deleteCampaign(
        req.params.id,
        req.user!.userId
      );
      res.json({
        success: true,
        message: "Campaign deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  publishCampaign = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const campaign = await this.campaignService.publishCampaign(
        req.params.id,
        req.user!.userId
      );
      res.json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  };

  pauseCampaign = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const campaign = await this.campaignService.pauseCampaign(
        req.params.id,
        req.user!.userId
      );
      res.json({
        success: true,
        data: campaign,
      });
    } catch (error) {
      next(error);
    }
  };

  getFeaturedCampaigns = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const campaigns = await this.campaignService.getFeaturedCampaigns();
      res.json({
        success: true,
        data: campaigns,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserCampaigns = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await this.campaignService.getUserCampaigns(
        req.user!.userId,
        parseInt(page as string),
        parseInt(limit as string)
      );
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
