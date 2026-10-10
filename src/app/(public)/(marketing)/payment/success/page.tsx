"use client";

import { Suspense } from "react";
import { ArrowRight, CheckCircle2, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function PaymentSuccessContent() {
const searchParams = useSearchParams();
const sessionId = searchParams.get("session_id");

return ( <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center px-4 py-16"> <div className="grid w-full gap-8 lg:grid-cols-[1fr_360px] lg:items-center"> <div className="space-y-5"> <div className="inline-flex size-12 items-center justify-center border bg-primary text-primary-foreground"> <CheckCircle2 className="size-6" /> </div>


      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
          Payment successful
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Your share purchase has been confirmed. The dashboard will show
          the updated payment and spending totals after the backend records
          the Stripe session.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/shares" />} nativeButton={false}>
          View shares <ArrowRight />
        </Button>

        <Button
          variant="outline"
          render={<Link href="/projects" />}
          nativeButton={false}
        >
          Browse projects
        </Button>
      </div>
    </div>

    <Card>
      <CardContent className="space-y-4 py-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ReceiptText className="size-4" />
          Checkout reference
        </div>

        <div className="break-all border bg-muted/40 p-3 text-xs text-muted-foreground">
          {sessionId ?? "Session id was not provided."}
        </div>
      </CardContent>
    </Card>
  </div>
</section>


);
}

export default function PaymentSuccessPage() {
return (
<Suspense
fallback={ <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center px-4 py-16"> <p className="text-sm text-muted-foreground">
Loading payment details... </p> </section>
}
> <PaymentSuccessContent /> </Suspense>
);
}
