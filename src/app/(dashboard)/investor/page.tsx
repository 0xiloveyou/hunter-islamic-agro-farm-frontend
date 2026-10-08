"use client";

import { BadgeDollarSign, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useApplyAsShark, useMyPayments, useMyShares } from "@/hooks";
import { formatCurrency, getTotalSpendAmount } from "@/lib/dashboard-money";

export default function InvestorDashboard() {
  const { data: shares } = useMyShares();
  const { data: payments } = useMyPayments();
  const { mutate: applyAsShark, isPending } = useApplyAsShark();
  const totalSpend = getTotalSpendAmount(shares?.data, payments?.data);

  const handleApply = () => {
    applyAsShark(undefined, {
      onSuccess: () =>
        toast.add({
          title: "Application submitted",
          description: "Admin will review your shark request.",
          type: "success",
        }),
      onError: () =>
        toast.add({
          title: "Application failed",
          description: "Could not submit shark request.",
          type: "error",
        }),
    });
  };

  return (
    <section className="space-y-5 p-5">
      <div>
        <h1 className="text-2xl font-semibold">Investor dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track shares, payments, and apply to become a shark.
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <BadgeDollarSign className="mr-2 inline size-5" />
              Buy investor shares
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Investor shares are USD 1,000 each and redirect to Stripe
              checkout.
            </p>
            <Button render={<Link href="/shares" />} nativeButton={false}>
              Buy share
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <ShieldCheck className="mr-2 inline size-5" />
              Apply as shark
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Submit your application for admin approval and unlock the shark
              dashboard after review.
            </p>
            <Button onClick={handleApply} disabled={isPending}>
              {isPending ? "Submitting..." : "Apply as shark"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
