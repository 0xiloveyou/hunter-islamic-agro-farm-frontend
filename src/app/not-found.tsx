import { Home, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <section className="max-w-xl space-y-5 text-center">
        <div className="mx-auto inline-flex size-12 items-center justify-center border bg-muted text-muted-foreground">
          <SearchX className="size-6" />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
            Page not found
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            The page you requested does not exist or may have been moved.
          </p>
        </div>
        <Button render={<Link href="/" />} nativeButton={false}>
          <Home /> Go home
        </Button>
      </section>
    </main>
  );
}
