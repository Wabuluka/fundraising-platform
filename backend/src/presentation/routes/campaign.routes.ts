import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { campaignValidators } from "../../shared/utils/validators";
import { CampaignRepository } from "../../infrastructure/repositories/campaign.repository";
import { CampaignService } from "../../application/services/campaign.service";
import { CampaignController } from "../controllers/campaign.controller";

const router = Router();

// Initialize dependencies
const campaignRepository = new CampaignRepository();
const campaignService = new CampaignService(campaignRepository);
const campaignController = new CampaignController(campaignService);

// Public routes
router.get(
  "/",
  campaignValidators.list,
  validate,
  campaignController.getCampaigns
);

router.get("/featured", campaignController.getFeaturedCampaigns);

router.get(
  "/:id",
  campaignValidators.getId,
  validate,
  campaignController.getCampaignById
);

// Protected routes
router.post(
  "/",
  authenticate,
  campaignValidators.create,
  validate,
  campaignController.createCampaign
);

router.put(
  "/:id",
  authenticate,
  campaignValidators.getId,
  campaignValidators.update,
  validate,
  campaignController.updateCampaign
);

router.delete(
  "/:id",
  authenticate,
  campaignValidators.getId,
  validate,
  campaignController.deleteCampaign
);

router.post(
  "/:id/publish",
  authenticate,
  campaignValidators.getId,
  validate,
  campaignController.publishCampaign
);

router.post(
  "/:id/pause",
  authenticate,
  campaignValidators.getId,
  validate,
  campaignController.pauseCampaign
);

router.get(
  "/user/my-campaigns",
  authenticate,
  campaignController.getUserCampaigns
);

export default router;
