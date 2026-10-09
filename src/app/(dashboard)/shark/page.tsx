"use client";

import { CalendarCheck, CreditCard, WalletCards } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { formatCurrency, getTotalSpendAmount } from "@/lib/dashboard-money";

export default function SharkDashboard() {
  const [scheduleId, setScheduleId] = useState("");
  const { data: schedules } = useSchedules();
  const { data: appointment } = useMyAppointment();
  const { data: shares } = useMyShares();
  const { data: payments } = useMyPayments();
  const { mutate: bookAppointment, isPending } = useBookAppointment();
  const totalSpend = getTotalSpendAmount(shares?.data, payments?.data);

  const handleBook = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const purpose = String(formData.get("purpose") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

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

  console.log("Booking appointment with payload:", payload);

  bookAppointment(payload, {
    onSuccess: (response) => {
      console.log("Booking response:", response);

      setScheduleId("");
      form.reset();

      toast.add({
        title: "Appointment requested successfully!",
        type: "success",
      });
    },

    onError: (error) => {
      console.error("Appointment booking failed:", error);

      const apiError = error as Error & {
        data?: {
          message?: string;
        };
        response?: {
          _data?: {
            message?: string;
          };
        };
      };

      toast.add({
        title: "Booking failed",
        description:
          apiError.data?.message ??
          apiError.response?._data?.message ??
          apiError.message ??
          "An unexpected error occurred.",
        type: "error",
      });
    },
  });
};

  return (
    <section className="space-y-5 p-5">
      <div>
        <h1 className="text-2xl font-semibold">Shark dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Book admin appointments and buy higher-value project shares.
        </p>
      </div>

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

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>
              <CalendarCheck className="mr-2 inline size-5" />
              Book appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBook} className="grid gap-3">
              <select
                className="h-8 border bg-background px-2 text-xs"
                value={scheduleId}
                onChange={(event) => setScheduleId(event.target.value)}
                required
              >
                <option value="">Select available schedule</option>
                {(schedules?.data ?? []).map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {new Date(schedule.scheduledAt).toLocaleString()}
                  </option>
                ))}
              </select>
              <Input
                name="purpose"
                placeholder="Purpose"
                defaultValue="Discuss investment opportunities"
              />
              <Textarea
                name="notes"
                placeholder="Notes"
                defaultValue="I would like to discuss the agricultural investment projects."
              />
              <Button
  type="submit"
  disabled={!scheduleId || isPending}
>
  {isPending ? "Booking..." : "Book appointment"}
</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {appointment?.data ? (
              <>
                <p>Status: {appointment.data.status ?? "PENDING"}</p>
                <p>Purpose: {appointment.data.purpose ?? "-"}</p>
                {appointment.data.appointmentUrl && (
                  <a
                    className="text-foreground underline"
                    href={appointment.data.appointmentUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join appointment
                  </a>
                )}
              </>
            ) : (
              <p>No appointment found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <CreditCard className="mr-2 inline size-5" />
            Share purchase
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Sharks can purchase shares at USD 50,000 per share through Stripe
            checkout.
          </p>
          <Button render={<Link href="/shares" />} nativeButton={false}>
            <WalletCards /> Buy shark share
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
