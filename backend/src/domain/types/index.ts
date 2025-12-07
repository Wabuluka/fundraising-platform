export enum CampaignCategory {
  MEDICAL = "medical",
  EDUCATION = "education",
  DISASTER_RELIEF = "disaster_relief",
  COMMUNITY = "community",
  OTHER = "other",
}

export enum CampaignStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum UserRole {
  DONOR = "donor",
  ORGANIZER = "organizer",
  ADMIN = "admin",
}
