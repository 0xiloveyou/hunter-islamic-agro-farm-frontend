import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applyAsShark,
  approveAppointment,
  approveSharkApplication,
  bookAppointment,
  createCheckout,
  createProject,
  createSchedule,
  getAdminAnalytics,
  getAllSharkApplications,
  getAppointmentRequests,
  getMyAppointment,
  getMyPayments,
  getMyShares,
  getProjects,
  getSchedules,
} from "@/api";
import type { ProjectParams } from "@/types";

export function useProjects(params?: ProjectParams) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useAdminAnalytics() {
  return useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAdminAnalytics,
  });
}

export function useSharkApplications() {
  return useQuery({
    queryKey: ["shark-applications"],
    queryFn: getAllSharkApplications,
  });
}

export function useApproveSharkApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveSharkApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shark-applications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
    },
  });
}

export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schedules"] }),
  });
}

export function useAppointmentRequests() {
  return useQuery({
    queryKey: ["appointment-requests"],
    queryFn: getAppointmentRequests,
  });
}

export function useApproveAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-appointment"] });
    },
  });
}

export function useSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["my-appointment"] });
    },
  });
}

export function useMyAppointment() {
  return useQuery({
    queryKey: ["my-appointment"],
    queryFn: getMyAppointment,
    retry: false,
  });
}

export function useApplyAsShark() {
  return useMutation({
    mutationFn: applyAsShark,
  });
}

export function useCreateCheckout() {
  return useMutation({
    mutationFn: createCheckout,
  });
}

export function useMyPayments() {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
}

export function useMyShares() {
  return useQuery({
    queryKey: ["my-shares"],
    queryFn: getMyShares,
  });
}
