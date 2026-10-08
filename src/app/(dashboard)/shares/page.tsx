"use client";

import { CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useCreateCheckout, useGetMe } from "@/hooks";

const rolePrice = {
  INVESTOR: 1000,
  SHARK: 50000,
  ADMIN: 1000,
};

export default function SharesPage() {
  const [numberOfShares, setNumberOfShares] = useState(1);
  const { data } = useGetMe();
  const { mutate: createCheckout, isPending } = useCreateCheckout();
  const role = (data?.data?.role ?? "INVESTOR") as keyof typeof rolePrice;
  const pricePerShare = rolePrice[role];
  const total = numberOfShares * pricePerShare;

  const handleBuy = () => {
    createCheckout(
      { numberOfShares },
      {
        onSuccess: (res) => {
          const checkoutUrl = res.data.checkoutUrl ?? res.data.url;
          if (checkoutUrl) {
            window.location.href = checkoutUrl;
            return;
          }
          toast.add({
            title: "Checkout created",
            description: "Payment session created successfully.",
            type: "success",
          });
        },
        onError: () => {
          toast.add({
            title: "Checkout failed",
            description: "Could not start the payment flow.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <section className="mx-auto max-w-5xl p-5">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Buy shares</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose your share count and continue to Stripe checkout. Investors buy
          at USD 1,000 per share; sharks buy at USD 50,000 per share.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <ShieldCheck className="size-5" />
            <CardTitle>
              {role === "SHARK"
                ? "Buy share as shark"
                : "Buy share as investor"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2 text-sm">
              <label htmlFor="numberOfShares">Number of shares</label>
              <Input
                id="numberOfShares"
                min={1}
                type="number"
                value={numberOfShares}
                onChange={(event) =>
                  setNumberOfShares(Math.max(1, Number(event.target.value)))
                }
              />
            </div>
            <Button onClick={handleBuy} disabled={isPending} size="lg">
              <CreditCard /> {isPending ? "Opening checkout..." : "Buy share"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Role</span>
              <strong>{role}</strong>
            </div>
            <div className="flex justify-between">
              <span>Price per share</span>
              <strong>${pricePerShare.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span>Shares</span>
              <strong>{numberOfShares}</strong>
            </div>
            <div className="border-t pt-3 flex justify-between text-base">
              <span>Total</span>
              <strong>${total.toLocaleString()}</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
