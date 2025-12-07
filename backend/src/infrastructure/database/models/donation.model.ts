import mongoose, { Document, Schema } from "mongoose";
import { IDonation } from "../../../domain/entities/Donation";
import { PaymentStatus } from "../../../domain/types";

export interface IDonationDocument extends Omit<IDonation, "id">, Document {}

const donationSchema = new Schema<IDonationDocument>(
  {
    campaignId: {
      type: String,
      ref: "Campaign",
      required: true,
    },
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    donorName: String,
    donorEmail: String,
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "NGN",
      uppercase: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    message: String,
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentReference: {
      type: String,
      required: true,
      unique: true,
    },
    paymentProvider: {
      type: String,
      default: "flutterwave",
    },
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret: any) => {
        ret.id = ret._id.toString();
        ret.campaignId = ret.campaignId.toString();
        if (ret.donorId) ret.donorId = ret.donorId.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
donationSchema.index({ campaignId: 1, createdAt: -1 });
donationSchema.index({ donorId: 1 });
donationSchema.index({ paymentReference: 1 });
donationSchema.index({ paymentStatus: 1 });

export const DonationModel = mongoose.model<IDonationDocument>(
  "Donation",
  donationSchema
);
