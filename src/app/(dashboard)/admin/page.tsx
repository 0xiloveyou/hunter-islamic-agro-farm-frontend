"use client";

import { CalendarPlus, CheckCircle2, FolderPlus } from "lucide-react";
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

const metricCards = [
{
keys: ["totalUsers", "users", "userCount"],
label: "Users",
},
{
keys: ["totalInvestors", "investors", "investorCount"],
label: "Investors",
},
{
keys: ["totalSharks", "sharks", "sharkCount"],
label: "Sharks",
},
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

function findNumber(
value: unknown,
keys: readonly string[],
): number {
const record = asRecord(value);

if (!record) {
return 0;
}

for (const key of keys) {
const rawValue = record[key];

if (rawValue === undefined || rawValue === null) {
  continue;
}

const amount = Number(rawValue);

if (Number.isFinite(amount)) {
  return amount;
}


}

for (const nestedValue of Object.values(record)) {
const amount = findNumber(nestedValue, keys);


if (amount !== 0) {
  return amount;
}


}

return 0;
}

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
  apiError.message ??
  "An unexpected error occurred."
);


}

return "An unexpected error occurred.";
}

export default function AdminDashboard() {
const [scheduledAt, setScheduledAt] = useState("");
const [appointmentUrl, setAppointmentUrl] = useState("");
const [selectedAppointment, setSelectedAppointment] = useState("");

const { data: analytics } = useAdminAnalytics();
const { data: appointments } = useAppointmentRequests();
const { data: projects } = useProjects({
page: 1,
limit: 1,
});

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

const projectCount =
projects?.meta?.total ??
findNumber(analytics?.data, [
"totalProjects",
"projects",
"projectCount",
]);

const spendingTotal = findNumber(
analytics?.data,
spendingKeys,
);

// Create shark schedule
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

const payload = {
  scheduledAt: scheduleDate.toISOString(),
};

console.log("[AdminDashboard] Schedule payload:", payload);

createSchedule(payload, {
  onSuccess: (response) => {
    console.log(
      "[AdminDashboard] Schedule created successfully:",
      response,
    );

    setScheduledAt("");

    toast.add({
      title: "Schedule created successfully!",
      type: "success",
    });
  },

  onError: (error) => {
    console.error(
      "[AdminDashboard] Schedule creation failed:",
      error,
    );

    toast.add({
      title: "Schedule creation failed",
      description: getErrorMessage(error),
      type: "error",
    });
  },
});


};

// Create project
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

if (!title || !description) {
  toast.add({
    title: "Title and description are required.",
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
  ...(imageUrl ? { imageUrl } : {}),
  ...(location ? { location } : {}),
  ...(startDate ? { startDate } : {}),
  ...(endDate ? { endDate } : {}),
};

console.log(
  "[AdminDashboard] Project payload:",
  payload,
);

createProject(payload, {
  onSuccess: (response) => {
    console.log(
      "[AdminDashboard] Project created successfully:",
      response,
    );

    form.reset();

    toast.add({
      title: "Project created successfully!",
      type: "success",
    });
  },

  onError: (error) => {
    console.error(
      "[AdminDashboard] Project creation failed:",
      error,
    );

    toast.add({
      title: "Project creation failed",
      description: getErrorMessage(error),
      type: "error",
    });
  },
});


};

// Approve appointment
const handleApproveAppointment = () => {
const meetingUrl = appointmentUrl.trim();

if (!selectedAppointment || !meetingUrl) {
  toast.add({
    title: "Select an appointment and enter its meeting URL.",
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
    },

    onError: (error) => {
      console.error(
        "[AdminDashboard] Appointment approval failed:",
        error,
      );

      toast.add({
        title: "Appointment approval failed",
        description: getErrorMessage(error),
        type: "error",
      });
    },
  },
);


};

return ( <section className="space-y-5 p-5">
{/* Dashboard heading */} <div> <h1 className="text-2xl font-semibold">
Admin dashboard </h1>


    <p className="text-sm text-muted-foreground">
      Manage analytics, projects, schedules, and appointment approvals.
    </p>
  </div>

  {/* Dashboard metrics */}
  <div className="grid gap-3 md:grid-cols-3">
    {metricCards.map((metric) => (
      <Card key={metric.label}>
        <CardHeader>
          <CardTitle>{metric.label}</CardTitle>
        </CardHeader>

        <CardContent className="text-2xl font-semibold">
          {findNumber(
            analytics?.data,
            metric.keys,
          ).toLocaleString()}
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
          />

          <Button
            type="submit"
            disabled={isCreatingSchedule}
          >
            {isCreatingSchedule
              ? "Creating..."
              : "Create schedule"}
          </Button>
        </form>
      </CardContent>
    </Card>

    {/* Approve appointment */}
    <Card>
      <CardHeader>
        <CardTitle>
          <CheckCircle2 className="mr-2 inline size-5" />
          Approve appointment
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        <select
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          value={selectedAppointment}
          onChange={(event) =>
            setSelectedAppointment(event.target.value)
          }
        >
          <option value="">
            Select appointment request
          </option>

          {(appointments?.data ?? []).map(
            (appointment) => (
              <option
                key={appointment.id}
                value={appointment.id}
              >
                {appointment.user?.email ??
                  appointment.purpose ??
                  appointment.id}
              </option>
            ),
          )}
        </select>

        <Input
          type="url"
          placeholder="Appointment meeting URL"
          value={appointmentUrl}
          onChange={(event) =>
            setAppointmentUrl(event.target.value)
          }
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
  </div>

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
        />

        <Input
          name="location"
          placeholder="Location"
          required
        />

        <Input
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          required
        />

        <Input
          name="totalCost"
          type="number"
          min="0.01"
          step="any"
          placeholder="Total cost"
          required
        />

        <Input
          name="currency"
          placeholder="Currency"
          defaultValue="USD"
          required
        />

        <Input
          name="startDate"
          type="date"
          required
        />

        <Input
          name="endDate"
          type="date"
          required
        />

        <Textarea
          name="description"
          placeholder="Project description"
          required
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
