import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { donationValidators } from "../../shared/utils/validators";
import { DonationRepository } from "../../infrastructure/repositories/donation.repository";
import { CampaignRepository } from "../../infrastructure/repositories/campaign.repository";
import { FlutterwaveService } from "../../application/services/flutterwave.service";
import { DonationService } from "../../application/services/donation.service";
import { DonationController } from "../controllers/donation.controller";

const router = Router();

// Initialize dependencies
const donationRepository = new DonationRepository();
const campaignRepository = new CampaignRepository();
const flutterwaveService = new FlutterwaveService();
const donationService = new DonationService(
  donationRepository,
  campaignRepository,
  flutterwaveService
);
const donationController = new DonationController(donationService);

// Routes
router.post(
  "/initiate",
  donationValidators.initiate,
  validate,
  donationController.initiateDonation
);

router.post(
  "/verify",
  donationValidators.verify,
  validate,
  donationController.verifyPayment
);

router.post("/webhook", donationController.handleWebhook);

router.get("/:id", authenticate, donationController.getDonationById);

router.get("/campaign/:campaignId", donationController.getCampaignDonations);

router.get("/campaign/:campaignId/stats", donationController.getCampaignStats);

router.get(
  "/user/my-donations",
  authenticate,
  donationController.getUserDonations
);

export default router;
