"use client";

import { CalendarCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useBookAppointment, useMyAppointment, useSchedules } from "@/hooks";

export default function SharkDashboard() {
  const [scheduleId, setScheduleId] = useState("");
  const { data: schedules } = useSchedules();
  const { data: appointment } = useMyAppointment();
  const { mutate: bookAppointment, isPending } = useBookAppointment();

  const handleBook = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    bookAppointment(
      {
        scheduleId,
        purpose: String(formData.get("purpose")),
        notes: String(formData.get("notes")),
      },
      {
        onSuccess: () =>
          toast.add({ title: "Appointment requested", type: "success" }),
        onError: () => toast.add({ title: "Booking failed", type: "error" }),
      },
    );
  };

  return (
    <section className="space-y-5 p-5">
      <div>
        <h1 className="text-2xl font-semibold">Shark dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Book admin appointments and buy higher-value project shares.
        </p>
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
              <Button disabled={!scheduleId || isPending}>
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
            Buy shark share
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
