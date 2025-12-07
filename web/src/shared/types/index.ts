export interface Campaign {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  story?: string;
  category: CampaignCategory;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  images: string[];
  status: CampaignStatus;
  beneficiary: {
    name: string;
    relationship?: string;
    contactNumber?: string;
  };
  location?: string;
  startDate: string;
  endDate: string;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
}

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

export interface CampaignForm {
  title: string;
  description: string;
  story: string;
  category: CampaignCategory;
  targetAmount: number;
  currency: string;
  beneficiaryName: string;
  beneficiaryRelationship: string;
  beneficiaryContact: string;
  location: string;
  endDate: string;
  isUrgent: boolean;
}

export interface DonationModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export interface DonationForm {
  amount: number;
  name: string;
  email: string;
  message: string;
  isAnonymous: boolean;
}

export interface Donation {
  id: string;
  campaignId: string;
  donorId?: string;
  donorName?: string;
  amount: number;
  currency: string;
  isAnonymous: boolean;
  message?: string;
  paymentStatus: PaymentStatus;
  paymentReference: string;
  createdAt: string;
}

export interface ProfileForm {
  name: string;
  email: string;
  phoneNumber: string;
}

export enum UserRole {
  DONOR = "donor",
  ORGANIZER = "organizer",
  ADMIN = "admin",
}

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
