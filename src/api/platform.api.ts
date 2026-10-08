import apiClient from "@/lib/apiClient";
import type {
  AdminAnalytics,
  ApiResponse,
  Appointment,
  BookAppointmentPayload,
  CheckoutSession,
  CreateCheckoutPayload,
  CreateProjectPayload,
  Payment,
  Project,
  ProjectParams,
  Schedule,
  ShareSummary,
  SharkApplication,
} from "@/types";

function withQuery(path: string, params?: object) {
  const searchParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

export function getProjects(params?: ProjectParams) {
  return apiClient<ApiResponse<Project[]>>(withQuery("/projects", params));
}

export function createProject(payload: CreateProjectPayload) {
  return apiClient<ApiResponse<Project>>("/projects", {
    method: "POST",
    body: payload,
  });
}

export function getAdminAnalytics() {
  return apiClient<ApiResponse<AdminAnalytics>>("/analytics/admin");
}

export function getAllSharkApplications() {
  return apiClient<ApiResponse<SharkApplication[]>>("/admin/accept-shark");
}

export function approveSharkApplication(userId: string) {
  return apiClient<ApiResponse<SharkApplication>>(
    `/admin/accept-shark/${userId}`,
    {
      method: "PATCH",
    },
  );
}

export function createSchedule(payload: { scheduledAt: string }) {
  return apiClient<ApiResponse<Schedule>>("/admin/schedule", {
    method: "POST",
    body: payload,
  });
}

export function getAppointmentRequests() {
  return apiClient<ApiResponse<Appointment[]>>("/admin/appointment-requests");
}

export function approveAppointment(payload: {
  appointmentId: string;
  appointmentUrl: string;
}) {
  return apiClient<ApiResponse<Appointment>>(
    `/admin/appointment-requests/${payload.appointmentId}/approve`,
    {
      method: "PATCH",
      body: { appointmentUrl: payload.appointmentUrl },
    },
  );
}

export function getSchedules() {
  return apiClient<ApiResponse<Schedule[]>>("/user/schedules");
}

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<Appointment>>("/user/book-appointment", {
    method: "POST",
    body: payload,
  });
}

export function getMyAppointment() {
  return apiClient<ApiResponse<Appointment>>("/user/my-appointment");
}

export function applyAsShark() {
  return apiClient<ApiResponse<SharkApplication>>("/user/apply-as-shark", {
    method: "POST",
  });
}

export function createCheckout(payload: CreateCheckoutPayload) {
  return apiClient<ApiResponse<CheckoutSession>>("/payments/create-checkout", {
    method: "POST",
    body: payload,
  });
}

export function getMyPayments() {
  return apiClient<ApiResponse<Payment[]>>("/payments/my-payments");
}

export function getMyShares() {
  return apiClient<ApiResponse<ShareSummary>>("/share/my-shares");
}
