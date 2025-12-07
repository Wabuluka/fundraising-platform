import mongoose, { Document, Schema } from "mongoose";
import { ICampaign } from "../../../domain/entities/Campaign";
import { CampaignCategory, CampaignStatus } from "../../../domain/types";

export interface ICampaignDocument extends Omit<ICampaign, "id">, Document {}

const campaignSchema = new Schema<ICampaignDocument>(
  {
    organizerId: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    story: String,
    category: {
      type: String,
      enum: Object.values(CampaignCategory),
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "NGN",
      uppercase: true,
    },
    images: [String],
    status: {
      type: String,
      enum: Object.values(CampaignStatus),
      default: CampaignStatus.DRAFT,
    },
    beneficiary: {
      name: { type: String, required: true },
      relationship: String,
      contactNumber: String,
    },
    location: String,
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    featuredAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret: any) => {
        ret.id = ret._id.toString();
        ret.organizerId = ret.organizerId.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
campaignSchema.index({ status: 1, createdAt: -1 });
campaignSchema.index({ category: 1 });
campaignSchema.index({ organizerId: 1 });

export const CampaignModel = mongoose.model<ICampaignDocument>(
  "Campaign",
  campaignSchema
);
