import { body, param, query } from "express-validator";
import { CampaignCategory, CampaignStatus } from "../../domain/types";

export const authValidators = {
  register: [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phoneNumber").optional().isMobilePhone("any"),
  ],
  login: [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
};

export const campaignValidators = {
  create: [
    body("title")
      .trim()
      .notEmpty()
      .isLength({ min: 10, max: 200 })
      .withMessage("Title must be 10-200 characters"),
    body("description")
      .trim()
      .notEmpty()
      .isLength({ min: 50 })
      .withMessage("Description must be at least 50 characters"),
    body("category")
      .isIn(Object.values(CampaignCategory))
      .withMessage("Invalid category"),
    body("targetAmount")
      .isFloat({ min: 100 })
      .withMessage("Target amount must be at least 100"),
    body("currency")
      .optional()
      .isLength({ min: 3, max: 3 })
      .withMessage("Currency must be 3 characters"),
    body("beneficiary.name")
      .trim()
      .notEmpty()
      .withMessage("Beneficiary name is required"),
    body("endDate")
      .isISO8601()
      .toDate()
      .withMessage("Valid end date is required"),
  ],
  update: [
    body("title").optional().trim().isLength({ min: 10, max: 200 }),
    body("description").optional().trim().isLength({ min: 50 }),
    body("status").optional().isIn(Object.values(CampaignStatus)),
  ],
  getId: [param("id").isMongoId().withMessage("Invalid campaign ID")],
  list: [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
    query("category").optional().isIn(Object.values(CampaignCategory)),
    query("status").optional().isIn(Object.values(CampaignStatus)),
  ],
};

export const donationValidators = {
  initiate: [
    body("campaignId").isMongoId().withMessage("Invalid campaign ID"),
    body("amount").isFloat({ min: 10 }).withMessage("Minimum donation is 10"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("name").optional().trim().notEmpty(),
    body("isAnonymous").optional().isBoolean(),
    body("message").optional().trim().isLength({ max: 500 }),
  ],
  verify: [
    body("transactionId").notEmpty().withMessage("Transaction ID is required"),
    body("transactionRef")
      .notEmpty()
      .withMessage("Transaction reference is required"),
  ],
};
