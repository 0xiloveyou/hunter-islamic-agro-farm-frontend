import { ArrowLeft, RefreshCcw, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-16">
      <div className="space-y-5">
        <div className="inline-flex size-12 items-center justify-center border bg-muted text-muted-foreground">
          <XCircle className="size-6" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
            Payment cancelled
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Checkout was closed before payment was completed. No share purchase
            has been recorded, and you can start a new checkout whenever you are
            ready.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href="/shares" />} nativeButton={false}>
            <RefreshCcw /> Try again
          </Button>
          <Button
            variant="outline"
            render={<Link href="/projects" />}
            nativeButton={false}
          >
            <ArrowLeft /> Back to projects
          </Button>
        </div>
      </div>
    </section>
  );
}
