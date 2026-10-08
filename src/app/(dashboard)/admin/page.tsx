"use client";

import { CalendarPlus, CheckCircle2, FolderPlus } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const metricCards = [
  { keys: ["totalUsers", "users", "userCount"], label: "Users" },
  {
    keys: ["totalInvestors", "investors", "investorCount"],
    label: "Investors",
  },
  { keys: ["totalSharks", "sharks", "sharkCount"], label: "Sharks" },
  {
    keys: ["totalPurchasedShares", "purchasedShares", "shareCount"],
    label: "Purchased shares",
  },
] as const;

const spendingKeys = [
  "verifiedInvestmentAmount",
  "totalInvestmentAmount",
  "totalInvestedAmount",
  "totalSpentAmount",
  "totalSpendAmount",
  "totalPurchaseAmount",
  "fundedAmount",
] as const;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return null;
}

function findNumber(value: unknown, keys: readonly string[]): number {
  const record = asRecord(value);

  if (!record) {
    return 0;
  }

  for (const key of keys) {
    const amount = Number(record[key] ?? 0);

    if (Number.isFinite(amount) && amount > 0) {
      return amount;
    }
  }

  for (const nestedValue of Object.values(record)) {
    const amount = findNumber(nestedValue, keys);

    if (amount > 0) {
      return amount;
    }
  }

  return 0;
}

export default function AdminDashboard() {
  const [scheduledAt, setScheduledAt] = useState("");
  const [appointmentUrl, setAppointmentUrl] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const { data: analytics } = useAdminAnalytics();
  const { data: appointments } = useAppointmentRequests();
  const { data: projects } = useProjects({ page: 1, limit: 1 });
  const { mutate: createSchedule, isPending: isCreatingSchedule } =
    useCreateSchedule();
  const { mutate: approveAppointment, isPending: isApprovingAppointment } =
    useApproveAppointment();
  const { mutate: createProject, isPending: isCreatingProject } =
    useCreateProject();

  const projectCount =
    projects?.meta?.total ??
    findNumber(analytics?.data, ["totalProjects", "projects", "projectCount"]);
  const spendingTotal = findNumber(analytics?.data, spendingKeys);

  const handleSchedule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createSchedule(
      { scheduledAt: new Date(scheduledAt).toISOString() },
      {
        onSuccess: () => {
          setScheduledAt("");
          toast.add({ title: "Schedule created", type: "success" });
        },
        onError: () => toast.add({ title: "Schedule failed", type: "error" }),
      },
    );
  };

  const handleProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    createProject(
      {
        title: String(formData.get("title")),
        description: String(formData.get("description")),
        imageUrl: String(formData.get("imageUrl")),
        location: String(formData.get("location")),
        totalCost: Number(formData.get("totalCost")),
        currency: String(formData.get("currency") || "USD"),
        startDate: String(formData.get("startDate")),
        endDate: String(formData.get("endDate")),
      },
      {
        onSuccess: () => {
          form.reset();
          toast.add({ title: "Project created", type: "success" });
        },
        onError: () => toast.add({ title: "Project failed", type: "error" }),
      },
    );
  };

  const handleApproveAppointment = () => {
    approveAppointment(
      { appointmentId: selectedAppointment, appointmentUrl },
      {
        onSuccess: () => {
          setAppointmentUrl("");
          setSelectedAppointment("");
          toast.add({ title: "Appointment approved", type: "success" });
        },
        onError: () => toast.add({ title: "Approval failed", type: "error" }),
      },
    );
  };

  return (
    <section className="space-y-5 p-5">
      <div>
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage analytics, projects, schedules, and appointment approvals.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {metricCards.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle>{metric.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {findNumber(analytics?.data, metric.keys).toLocaleString()}
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {projectCount.toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total spending</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatCurrency(spendingTotal)}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <CalendarPlus className="mr-2 inline size-5" />
              Create shark schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSchedule} className="grid gap-3">
              <Input
                type="datetime-local"
                value={scheduledAt}
                onChange={(event) => setScheduledAt(event.target.value)}
                required
              />
              <Button disabled={isCreatingSchedule}>
                {isCreatingSchedule ? "Creating..." : "Create schedule"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CheckCircle2 className="mr-2 inline size-5" />
              Approve appointment
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <select
              className="h-8 border bg-background px-2 text-xs"
              value={selectedAppointment}
              onChange={(event) => setSelectedAppointment(event.target.value)}
            >
              <option value="">Select appointment request</option>
              {(appointments?.data ?? []).map((appointment) => (
                <option key={appointment.id} value={appointment.id}>
                  {appointment.user?.email ??
                    appointment.purpose ??
                    appointment.id}
                </option>
              ))}
            </select>
            <Input
              placeholder="Appointment meeting URL"
              value={appointmentUrl}
              onChange={(event) => setAppointmentUrl(event.target.value)}
            />
            <Button
              disabled={
                !selectedAppointment ||
                !appointmentUrl ||
                isApprovingAppointment
              }
              onClick={handleApproveAppointment}
            >
              Approve appointment
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <FolderPlus className="mr-2 inline size-5" />
            Create project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProject} className="grid gap-3 md:grid-cols-2">
            <Input name="title" placeholder="Project title" required />
            <Input name="location" placeholder="Location" required />
            <Input name="imageUrl" placeholder="Image URL" required />
            <Input
              name="totalCost"
              type="number"
              min="1"
              placeholder="Total cost"
              required
            />
            <Input
              name="currency"
              placeholder="Currency"
              defaultValue="USD"
              required
            />
            <Input name="startDate" type="date" required />
            <Input name="endDate" type="date" required />
            <Textarea
              name="description"
              placeholder="Description"
              required
              className="md:col-span-2"
            />
            <Button className="md:col-span-2" disabled={isCreatingProject}>
              {isCreatingProject ? "Creating..." : "Create project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
