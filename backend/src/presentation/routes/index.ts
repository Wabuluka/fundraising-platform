import { Router } from "express";
import authRoutes from "./auth.routes";
import campaignRoutes from "./campaign.routes";
import donationRoutes from "./donation.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Fundraising API v1",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      campaigns: "/api/campaigns",
      donations: "/api/donations",
    },
  });
});

router.use("/auth", authRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/donations", donationRoutes);

export default router;
