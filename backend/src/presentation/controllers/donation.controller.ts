import { NextFunction, Response } from "express";
import { DonationService } from "../../application/services/donation.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class DonationController {
  constructor(private donationService: DonationService) {}

  initiateDonation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.donationService.initiateDonation({
        ...req.body,
        donorId: req.user?.userId,
      });
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  verifyPayment = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { transactionId, transactionRef } = req.body;
      const result = await this.donationService.verifyPayment(
        transactionId,
        transactionRef
      );
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  handleWebhook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const signature = req.headers["verif-hash"] as string;
      await this.donationService.handleWebhook(signature, req.body);
      res.status(200).send("OK");
    } catch (error) {
      next(error);
    }
  };

  getDonationById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const donation = await this.donationService.getDonationById(
        req.params.id
      );
      res.json({
        success: true,
        data: donation,
      });
    } catch (error) {
      next(error);
    }
  };

  getCampaignDonations = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const result = await this.donationService.getCampaignDonations(
        req.params.campaignId,
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

  getUserDonations = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const result = await this.donationService.getUserDonations(
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

  getCampaignStats = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const stats = await this.donationService.getCampaignStats(
        req.params.campaignId
      );
      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  };
}
