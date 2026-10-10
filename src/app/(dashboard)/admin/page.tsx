"use client";

import {
  CalendarPlus,
  CheckCircle2,
  FolderPlus,
  Users,
  UserRound,
  HandCoins,
  ShoppingBag,
  FolderKanban,
  Wallet,
} from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

import {
  useAdminAnalytics,
  useAppointmentRequests,
  useApproveAppointment,
  useCreateProject,
  useCreateSchedule,
  useProjects,
} from "@/hooks";

import { formatCurrency } from "@/lib/dashboard-money";

import type { CreateProjectPayload } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface AdminAnalyticsData {
  users?: {
    total?: number;
    investors?: number;
    sharks?: number;
    admins?: number;
  };

  shares?: {
    totalPurchased?: number;
  };

  payments?: {
    total?: number;
    verified?: number;
    pending?: number;
    failed?: number;
    refunded?: number;
  };

  investments?: {
    totalAmount?: number;
    verifiedAmount?: number;
    currency?: string;
  };

  sharkApplications?: {
    pending?: number;
    approved?: number;
  };

  projects?: {
    total?: number;
    totalCost?: number;
    fundedAmount?: number;
    fundingPercentage?: number;
    status?: {
      draft?: number;
      funding?: number;
      funded?: number;
      inProgress?: number;
      completed?: number;
      cancelled?: number;
    };
  };
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const apiError = error as Error & {
      data?: {
        message?: string;
        error?: string;
      };
      response?: {
        _data?: {
          message?: string;
          error?: string;
        };
      };
    };

    return (
      apiError.data?.message ??
      apiError.data?.error ??
      apiError.response?._data?.message ??
      apiError.response?._data?.error ??
      apiError.message
    );
  }

  return "An unexpected error occurred.";
}

function getAnalyticsData(
  value: unknown,
): AdminAnalyticsData {
  if (
    value &&
    typeof value === "object" &&
    "data" in value
  ) {
    const response = value as {
      data?: AdminAnalyticsData;
    };

    return response.data ?? {};
  }

  return (value as AdminAnalyticsData | undefined) ?? {};
}

function formatNumber(value: number | undefined): string {
  return (value ?? 0).toLocaleString();
}

/* -------------------------------------------------------------------------- */
/*                              Admin Dashboard                               */
/* -------------------------------------------------------------------------- */

export default function AdminDashboard() {
  const [scheduledAt, setScheduledAt] = useState("");
  const [appointmentUrl, setAppointmentUrl] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState("");

  /* -------------------------------- Queries ------------------------------- */

  const {
    data: analyticsResponse,
    isLoading: isLoadingAnalytics,
    isError: isAnalyticsError,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useAdminAnalytics();

  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    isError: isAppointmentsError,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useAppointmentRequests();

  const {
    data: projectsResponse,
    isLoading: isLoadingProjects,
  } = useProjects({
    page: 1,
    limit: 1,
  });

  /* -------------------------------- Mutations ----------------------------- */

  const {
    mutate: createSchedule,
    isPending: isCreatingSchedule,
  } = useCreateSchedule();

  const {
    mutate: approveAppointment,
    isPending: isApprovingAppointment,
  } = useApproveAppointment();

  const {
    mutate: createProject,
    isPending: isCreatingProject,
  } = useCreateProject();

  /* ------------------------------ API response --------------------------- */

  const analytics = getAnalyticsData(analyticsResponse);

  const users = analytics.users;
  const shares = analytics.shares;
  const payments = analytics.payments;
  const investments = analytics.investments;
  const projectAnalytics = analytics.projects;

  const projectCount =
    projectsResponse?.meta?.total ??
    projectAnalytics?.total ??
    0;

  /* ------------------------------ Metric cards --------------------------- */

  const metrics = [
    {
      label: "Total users",
      value: users?.total,
      icon: Users,
      description: "All registered users",
    },
    {
      label: "Investors",
      value: users?.investors,
      icon: UserRound,
      description: "Registered investors",
    },
    {
      label: "Sharks",
      value: users?.sharks,
      icon: HandCoins,
      description: "Registered sharks",
    },
    {
      label: "Purchased shares",
      value: shares?.totalPurchased,
      icon: ShoppingBag,
      description: "Total shares purchased",
    },
    {
      label: "Projects",
      value: projectCount,
      icon: FolderKanban,
      description: "Total projects",
    },
    {
      label: "Verified investment",
      value: investments?.verifiedAmount,
      icon: Wallet,
      description: "Verified investment amount",
      isCurrency: true,
    },
  ];

  /* ---------------------------- Create schedule -------------------------- */

  const handleSchedule = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!scheduledAt) {
      toast.add({
        title: "Please select a date and time.",
        type: "error",
      });
      return;
    }

    const scheduleDate = new Date(scheduledAt);

    if (Number.isNaN(scheduleDate.getTime())) {
      toast.add({
        title: "Invalid schedule date.",
        type: "error",
      });
      return;
    }

    createSchedule(
      {
        scheduledAt: scheduleDate.toISOString(),
      },
      {
        onSuccess: () => {
          setScheduledAt("");

          toast.add({
            title: "Schedule created successfully!",
            type: "success",
          });
        },

        onError: (error) => {
          toast.add({
            title: "Schedule creation failed",
            description: getErrorMessage(error),
            type: "error",
          });
        },
      },
    );
  };

  /* ------------------------------ Create project ------------------------- */

  const handleProject = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(
      formData.get("title") ?? "",
    ).trim();

    const description = String(
      formData.get("description") ?? "",
    ).trim();

    const imageUrl = String(
      formData.get("imageUrl") ?? "",
    ).trim();

    const location = String(
      formData.get("location") ?? "",
    ).trim();

    const totalCost = Number(
      formData.get("totalCost"),
    );

    const currency = String(
      formData.get("currency") || "USD",
    ).trim();

    const startDate = String(
      formData.get("startDate") ?? "",
    );

    const endDate = String(
      formData.get("endDate") ?? "",
    );

    if (!title || !description || !location || !imageUrl) {
      toast.add({
        title: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    if (!Number.isFinite(totalCost) || totalCost <= 0) {
      toast.add({
        title: "Please enter a valid project cost.",
        type: "error",
      });
      return;
    }

    if (
      startDate &&
      endDate &&
      new Date(endDate).getTime() <
        new Date(startDate).getTime()
    ) {
      toast.add({
        title: "End date must be after the start date.",
        type: "error",
      });
      return;
    }

    const payload: CreateProjectPayload = {
      title,
      description,
      totalCost,
      currency,
      imageUrl,
      location,
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
    };

    createProject(payload, {
      onSuccess: () => {
        form.reset();

        toast.add({
          title: "Project created successfully!",
          type: "success",
        });
      },

      onError: (error) => {
        toast.add({
          title: "Project creation failed",
          description: getErrorMessage(error),
          type: "error",
        });
      },
    });
  };

  /* --------------------------- Approve appointment ------------------------ */

  const handleApproveAppointment = () => {
    const meetingUrl = appointmentUrl.trim();

    if (!selectedAppointment || !meetingUrl) {
      toast.add({
        title:
          "Select an appointment and enter its meeting URL.",
        type: "error",
      });
      return;
    }

    try {
      new URL(meetingUrl);
    } catch {
      toast.add({
        title: "Please enter a valid meeting URL.",
        type: "error",
      });
      return;
    }

    approveAppointment(
      {
        appointmentId: selectedAppointment,
        appointmentUrl: meetingUrl,
      },
      {
        onSuccess: () => {
          setAppointmentUrl("");
          setSelectedAppointment("");

          toast.add({
            title: "Appointment approved successfully!",
            type: "success",
          });

          refetchAppointments();
        },

        onError: (error) => {
          toast.add({
            title: "Appointment approval failed",
            description: getErrorMessage(error),
            type: "error",
          });
        },
      },
    );
  };

  /* ---------------------------------- UI --------------------------------- */

  return (
    <section className="space-y-6 p-5">
      {/* Dashboard heading */}

      <div>
        <h1 className="text-2xl font-semibold">
          Admin dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage analytics, projects, schedules, and
          appointment approvals.
        </p>
      </div>

      {/* Analytics error */}

      {isAnalyticsError && (
        <Card>
          <CardContent className="flex flex-col gap-3 pt-6">
            <p className="text-sm text-destructive">
              Failed to load analytics:{" "}
              {getErrorMessage(analyticsError)}
            </p>

            <Button
              variant="outline"
              className="w-fit"
              onClick={() => refetchAnalytics()}
            >
              Retry analytics
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Metric cards */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  {metric.label}
                </CardTitle>

                <Icon className="size-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-semibold">
                  {isLoadingAnalytics ||
                  isLoadingProjects
                    ? "..."
                    : metric.isCurrency
                      ? formatCurrency(
                          metric.value ?? 0,
                        )
                      : formatNumber(metric.value)}
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional financial metrics */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Total investment
            </CardTitle>
          </CardHeader>

          <CardContent className="text-xl font-semibold">
            {isLoadingAnalytics
              ? "..."
              : formatCurrency(
                  investments?.totalAmount ?? 0,
                )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Total payments
            </CardTitle>
          </CardHeader>

          <CardContent className="text-xl font-semibold">
            {isLoadingAnalytics
              ? "..."
              : formatNumber(payments?.total)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Pending payments
            </CardTitle>
          </CardHeader>

          <CardContent className="text-xl font-semibold">
            {isLoadingAnalytics
              ? "..."
              : formatNumber(payments?.pending)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Approved shark applications
            </CardTitle>
          </CardHeader>

          <CardContent className="text-xl font-semibold">
            {isLoadingAnalytics
              ? "..."
              : formatNumber(
                  analytics.sharkApplications?.approved,
                )}
          </CardContent>
        </Card>
      </div>

      {/* Schedule and appointment management */}
     
<div className="grid gap-4 xl:grid-cols-2">
        {/* Create schedule */}

        <Card>
          <CardHeader>
            <CardTitle>
              <CalendarPlus className="mr-2 inline size-5" />
              Create shark schedule
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSchedule}
              className="grid gap-3"
            >
              <Input
                name="scheduledAt"
                type="datetime-local"
                value={scheduledAt}
                onChange={(event) =>
                  setScheduledAt(event.target.value)
                }
                required
                disabled={isCreatingSchedule}
              />

              <Button
                type="submit"
                disabled={
                  isCreatingSchedule || !scheduledAt
                }
              >
                {isCreatingSchedule
                  ? "Creating..."
                  : "Create schedule"}
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
      
{/* Approve appointment */}

<Card>
  <CardHeader>
    <CardTitle>
      <CheckCircle2 className="mr-2 inline size-5" />
      Approve appointment
    </CardTitle>
  </CardHeader>

  <CardContent className="grid gap-3">
    {isAppointmentsError && (
      <div className="space-y-2">
        <p className="text-sm text-destructive">
          Failed to load appointments:{" "}
          {getErrorMessage(appointmentsError)}
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetchAppointments()}
        >
          Retry
        </Button>
      </div>
    )}

    <select
      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
      value={selectedAppointment}
      onChange={(event) =>
        setSelectedAppointment(event.target.value)
      }
      disabled={
        isLoadingAppointments ||
        isAppointmentsError ||
        isApprovingAppointment
      }
    >
      <option value="">
        {isLoadingAppointments
          ? "Loading appointments..."
          : "Select appointment request"}
      </option>

      {(appointments?.data ?? []).map((appointment) => (
        <option
          key={appointment.id}
          value={appointment.id}
        >
          {appointment.purpose ??
            `Appointment (${appointment.userId})`}
        </option>
      ))}
    </select>

    {!isLoadingAppointments &&
      !isAppointmentsError &&
      (appointments?.data ?? []).length === 0 && (
        <p className="text-xs text-muted-foreground">
          No appointment requests found.
        </p>
      )}

    <Input
      type="url"
      placeholder="Appointment meeting URL"
      value={appointmentUrl}
      onChange={(event) =>
        setAppointmentUrl(event.target.value)
      }
      disabled={isApprovingAppointment}
    />

    <Button
      type="button"
      disabled={
        !selectedAppointment ||
        !appointmentUrl.trim() ||
        isApprovingAppointment
      }
      onClick={handleApproveAppointment}
    >
      {isApprovingAppointment
        ? "Approving..."
        : "Approve appointment"}
    </Button>
  </CardContent>
</Card>
      {/* Create project */}

      <Card>
        <CardHeader>
          <CardTitle>
            <FolderPlus className="mr-2 inline size-5" />
            Create project
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleProject}
            className="grid gap-3 md:grid-cols-2"
          >
            <Input
              name="title"
              placeholder="Project title"
              required
              disabled={isCreatingProject}
            />

            <Input
              name="location"
              placeholder="Location"
              required
              disabled={isCreatingProject}
            />

            <Input
              name="imageUrl"
              type="url"
              placeholder="Image URL"
              required
              disabled={isCreatingProject}
            />

            <Input
              name="totalCost"
              type="number"
              min="0.01"
              step="any"
              placeholder="Total cost"
              required
              disabled={isCreatingProject}
            />

            <Input
              name="currency"
              placeholder="Currency"
              defaultValue="USD"
              required
              disabled={isCreatingProject}
            />

            <Input
              name="startDate"
              type="date"
              required
              disabled={isCreatingProject}
            />

            <Input
              name="endDate"
              type="date"
              required
              disabled={isCreatingProject}
            />

            <Textarea
              name="description"
              placeholder="Project description"
              required
              disabled={isCreatingProject}
              className="md:col-span-2"
            />

            <Button
              type="submit"
              className="md:col-span-2"
              disabled={isCreatingProject}
            >
              {isCreatingProject
                ? "Creating project..."
                : "Create project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

