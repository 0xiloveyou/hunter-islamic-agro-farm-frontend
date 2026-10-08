import type { FetchOptions } from "ofetch";
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

type ApiEnvelope<T> = ApiResponse<T>;

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

async function requestWithFallback<T>(
  paths: [string, ...string[]],
  options?: FetchOptions<"json">,
) {
  let lastError: unknown;

  for (const path of paths) {
    try {
      return await apiClient<T>(path, options);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function normalizeListResponse<T>(
  response: ApiEnvelope<T[] | Record<string, unknown>>,
  keys: string[],
): ApiEnvelope<T[]> {
  if (Array.isArray(response.data)) {
    return response as ApiEnvelope<T[]>;
  }

  for (const key of keys) {
    const value = response.data?.[key];

    if (Array.isArray(value)) {
      return {
        ...response,
        data: value as T[],
      };
    }
  }

  return {
    ...response,
    data: [],
  };
}

export function getProjects(params?: ProjectParams) {
  return requestWithFallback<ApiResponse<Project[] | Record<string, unknown>>>([
    withQuery("/projects", params),
    withQuery("/v1/projects", params),
  ]).then((response) =>
    normalizeListResponse<Project>(response, [
      "projects",
      "items",
      "results",
      "docs",
    ]),
  );
}

export function createProject(payload: CreateProjectPayload) {
  return requestWithFallback<ApiResponse<Project>>(
    ["/projects", "/v1/projects"],
    {
      method: "POST",
      body: payload,
    },
  );
}

export function getAdminAnalytics() {
  return requestWithFallback<ApiResponse<AdminAnalytics>>([
    "/analytics/admin",
    "/v1/analytics/admin",
  ]);
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
  return requestWithFallback<
    ApiResponse<Appointment[] | Record<string, unknown>>
  >(["/admin/appointment-requests"]).then((response) =>
    normalizeListResponse<Appointment>(response, [
      "appointments",
      "appointmentRequests",
      "requests",
      "items",
      "results",
    ]),
  );
}

export function approveAppointment(payload: {
  appointmentId: string;
  appointmentUrl: string;
}) {
  return requestWithFallback<ApiResponse<Appointment>>(
    [
      `/admin/appointment-requests/${payload.appointmentId}/approve`,
      `/appointment-requests/${payload.appointmentId}/approve`,
    ],
    {
      method: "PATCH",
      body: { appointmentUrl: payload.appointmentUrl },
    },
  );
}

export function getSchedules() {
  return requestWithFallback<ApiResponse<Schedule[] | Record<string, unknown>>>([
    "/user/schedules",
  ]).then((response) =>
    normalizeListResponse<Schedule>(response, [
      "schedules",
      "items",
      "results",
      "docs",
    ]),
  );
}

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<Appointment>>("/user/book-appointment", {
    method: "POST",
    body: payload,
  });
}

export function getMyAppointment() {
  return apiClient<ApiResponse<Appointment>>("/user/my-appointment", {
    method: "POST",
  });
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
  return requestWithFallback<ApiResponse<Payment[] | Record<string, unknown>>>([
    "/payments/my-payments",
  ]).then((response) =>
    normalizeListResponse<Payment>(response, [
      "payments",
      "items",
      "results",
      "docs",
    ]),
  );
}

export function getMyShares() {
  return apiClient<ApiResponse<ShareSummary>>("/share/my-shares");
}
