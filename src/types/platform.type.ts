import type { User } from "./user.type";

export type ProjectStatus =
  | "DRAFT"
  | "FUNDING"
  | "FUNDED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  location: string;
  totalCost: number;
  currency: string;
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: ProjectStatus;
  location?: string;
  currency?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  imageUrl?: string;
  location?: string;
  totalCost: number;
  currency?: string;
  startDate?: string;
  endDate?: string;
}
export type SharkApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface SharkApplication {
  id?: string;
  userId?: string;
  status?: SharkApplicationStatus;
  verificationStatus?: SharkApplicationStatus;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  name?: string;
  email?: string;
}

export interface Schedule {
  id: string;
  scheduledAt: string;
  duration?: number;
  isBooked?: boolean;
  createdAt?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  scheduleId: string;
  purpose: string | null;
  notes: string | null;
  status: string;
  appointmentUrl: string | null;
  documentUrl: string | null;
  createdAt: string;
  updatedAt: string;

  schedule?: {
    id: string;
    scheduledAt: string;
    duration: number;
    isBooked: boolean;
  };
}

export interface BookAppointmentPayload {
  scheduleId: string;
  purpose?: string;
  notes?: string;
}

export interface CreateCheckoutPayload {
  numberOfShares: number;
}

export interface CheckoutSession {
  paymentId: string;
  shareId: string;
  numberOfShares?: number;
  shareCount?: number;
  pricePerShare: number;
  totalAmount: number;
  currency: string;
  checkoutUrl?: string;
  url?: string;
}

export interface Payment {
  id: string;
  status?: string;
  totalAmount?: number;
  amount?: number;
  currency?: string;
  createdAt?: string;
}

export interface ShareSummary {
  totalShares?: number;
  totalInvestedAmount?: number;
  totalSpentAmount?: number;
  totalSpendAmount?: number;
  totalInvestmentAmount?: number;
  verifiedInvestmentAmount?: number;
  totalAmount?: number;
  amount?: number;
  shares?: unknown[];
}

export interface AdminAnalytics {
  totalUsers?: number;
  totalInvestors?: number;
  totalSharks?: number;
  totalAdmins?: number;
  totalProjects?: number;
  totalPurchasedShares?: number;
  totalInvestmentAmount?: number;
  verifiedInvestmentAmount?: number;
  pendingSharkApplications?: number;
  approvedSharkApplications?: number;
  totalProjectCost?: number;
  fundedAmount?: number;
  fundingPercentage?: number;
  projectStatusCounts?: Record<string, number>;
  paymentsByStatus?: Record<string, number>;
}

