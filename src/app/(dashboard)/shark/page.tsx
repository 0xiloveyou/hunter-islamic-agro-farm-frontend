"use client";

import {
CalendarCheck,
CreditCard,
WalletCards,
} from "lucide-react";
import Link from "next/link";
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
useBookAppointment,
useMyAppointment,
useMyPayments,
useMyShares,
useSchedules,
} from "@/hooks";

import {
formatCurrency,
getTotalSpendAmount,
} from "@/lib/dashboard-money";

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

export default function SharkDashboard() {
const [scheduleId, setScheduleId] = useState("");

const {
data: schedules,
isLoading: isLoadingSchedules,
isError: isSchedulesError,
error: schedulesError,
} = useSchedules();

const {
data: appointment,
isLoading: isLoadingAppointment,
isError: isAppointmentError,
error: appointmentError,
refetch: refetchAppointment,
} = useMyAppointment();

const { data: shares } = useMyShares();
const { data: payments } = useMyPayments();

const {
mutate: bookAppointment,
isPending,
} = useBookAppointment();

const totalSpend = getTotalSpendAmount(
shares?.data,
payments?.data,
);

const handleBook = (
event: FormEvent<HTMLFormElement>,
) => {
event.preventDefault();


const form = event.currentTarget;
const formData = new FormData(form);

const purpose = String(
  formData.get("purpose") ?? "",
).trim();

const notes = String(
  formData.get("notes") ?? "",
).trim();

if (!scheduleId) {
  toast.add({
    title: "Please select an available schedule.",
    type: "error",
  });
  return;
}

if (!purpose) {
  toast.add({
    title: "Please enter the appointment purpose.",
    type: "error",
  });
  return;
}

const payload = {
  scheduleId,
  purpose,
  notes,
};

console.log(
  "[SharkDashboard] Booking payload:",
  payload,
);

bookAppointment(payload, {
  onSuccess: async (response) => {
    console.log(
      "[SharkDashboard] Booking response:",
      response,
    );

    setScheduleId("");
    form.reset();

    toast.add({
      title: "Appointment requested successfully!",
      type: "success",
    });

    // Refresh the appointment displayed on the dashboard.
    await refetchAppointment();
  },

  onError: (error) => {
    console.error(
      "[SharkDashboard] Booking failed:",
      error,
    );

    toast.add({
      title: "Appointment booking failed",
      description: getErrorMessage(error),
      type: "error",
    });
  },
});


};

const appointmentData = appointment?.data;

return ( <section className="space-y-5 p-5">
{/* Dashboard heading */} <div> <h1 className="text-2xl font-semibold">
Shark dashboard </h1>


    <p className="text-sm text-muted-foreground">
      Book admin appointments and buy higher-value project shares.
    </p>
  </div>

  {/* Dashboard metrics */}
  <div className="grid gap-4 md:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>Total shares</CardTitle>
      </CardHeader>

      <CardContent className="text-2xl font-semibold">
        {shares?.data?.totalShares ?? 0}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Total spending</CardTitle>
      </CardHeader>

      <CardContent className="text-2xl font-semibold">
        {formatCurrency(totalSpend)}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>

      <CardContent className="text-2xl font-semibold">
        {payments?.data?.length ?? 0}
      </CardContent>
    </Card>
  </div>

  {/* Appointment section */}
  <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
    {/* Book appointment */}
    <Card>
      <CardHeader>
        <CardTitle>
          <CalendarCheck className="mr-2 inline size-5" />
          Book appointment
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleBook}
          className="grid gap-3"
        >
          <select
            name="scheduleId"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            value={scheduleId}
            onChange={(event) =>
              setScheduleId(event.target.value)
            }
            required
            disabled={
              isLoadingSchedules ||
              isPending ||
              isSchedulesError
            }
          >
            <option value="">
              {isLoadingSchedules
                ? "Loading schedules..."
                : "Select available schedule"}
            </option>

            {(schedules?.data ?? []).map(
              (schedule) => (
                <option
                  key={schedule.id}
                  value={schedule.id}
                >
                  {new Date(
                    schedule.scheduledAt,
                  ).toLocaleString()}
                </option>
              ),
            )}
          </select>

          {isSchedulesError && (
            <p className="text-sm text-destructive">
              Failed to load schedules:{" "}
              {getErrorMessage(schedulesError)}
            </p>
          )}

          {!isLoadingSchedules &&
            !isSchedulesError &&
            (schedules?.data ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No schedules are currently available.
              </p>
            )}

          <Input
            name="purpose"
            placeholder="Purpose"
            defaultValue="Discuss investment opportunities"
            required
            disabled={isPending}
          />

          <Textarea
            name="notes"
            placeholder="Notes"
            defaultValue="I would like to discuss the agricultural investment projects."
            disabled={isPending}
          />

          <Button
            type="submit"
            disabled={
              !scheduleId ||
              isPending ||
              isLoadingSchedules
            }
          >
            {isPending
              ? "Booking..."
              : "Book appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>

    {/* My appointment */}
    <Card>
      <CardHeader>
        <CardTitle>My appointment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {isLoadingAppointment ? (
          <p className="text-muted-foreground">
            Loading appointment...
          </p>
        ) : isAppointmentError ? (
          <div className="space-y-3">
            <p className="text-destructive">
              Failed to load your appointment.
            </p>

            <p className="break-words text-xs text-muted-foreground">
              {getErrorMessage(appointmentError)}
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetchAppointment()}
            >
              Try again
            </Button>
          </div>
        ) : appointmentData ? (
          <>
            <p>
              <span className="font-medium">
                Status:
              </span>{" "}
              {appointmentData.status ?? "PENDING"}
            </p>

            <p>
              <span className="font-medium">
                Purpose:
              </span>{" "}
              {appointmentData.purpose ?? "-"}
            </p>

            {appointmentData.notes && (
              <p>
                <span className="font-medium">
                  Notes:
                </span>{" "}
                {appointmentData.notes}
              </p>
            )}

           {appointmentData.schedule?.scheduledAt && (
  <p>
    <span className="font-medium">Scheduled at:</span>{" "}
    {new Date(
      appointmentData.schedule.scheduledAt,
    ).toLocaleString()}
  </p>
)}

            {appointmentData.appointmentUrl && (
              <a
                className="inline-block text-foreground underline"
                href={appointmentData.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join appointment
              </a>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetchAppointment()}
            >
              Refresh appointment
            </Button>
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-muted-foreground">
              No appointment found.
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetchAppointment()}
            >
              Refresh
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  </div>

  {/* Share purchase */}
  <Card>
    <CardHeader>
      <CardTitle>
        <CreditCard className="mr-2 inline size-5" />
        Share purchase
      </CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">
        Sharks can purchase shares at USD 50,000 per share through Stripe checkout.
      </p>

      <Button
        render={<Link href="/shares" />}
        nativeButton={false}
      >
        <WalletCards />
        Buy shark share
      </Button>
    </CardContent>
  </Card>
</section>

);
}
