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
} from "@/hooks";

const metricKeys = [
  ["totalUsers", "Users"],
  ["totalInvestors", "Investors"],
  ["totalSharks", "Sharks"],
  ["totalProjects", "Projects"],
  ["totalPurchasedShares", "Purchased shares"],
  ["verifiedInvestmentAmount", "Verified investment"],
] as const;

export default function AdminDashboard() {
  const [scheduledAt, setScheduledAt] = useState("");
  const [appointmentUrl, setAppointmentUrl] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const { data: analytics } = useAdminAnalytics();
  const { data: appointments } = useAppointmentRequests();
  const { mutate: createSchedule, isPending: isCreatingSchedule } =
    useCreateSchedule();
  const { mutate: approveAppointment, isPending: isApprovingAppointment } =
    useApproveAppointment();
  const { mutate: createProject, isPending: isCreatingProject } =
    useCreateProject();

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
    const formData = new FormData(event.currentTarget);
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
          event.currentTarget.reset();
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
        {metricKeys.map(([key, label]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {Number(analytics?.data?.[key] ?? 0).toLocaleString()}
            </CardContent>
          </Card>
        ))}
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
