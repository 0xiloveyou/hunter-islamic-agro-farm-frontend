"use client";

import { CheckCircle2, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useApproveSharkApplication, useSharkApplications } from "@/hooks";

function getUserId(application: {
  userId?: string;
  id?: string;
  user?: { id: string };
}) {
  return application.userId ?? application.user?.id ?? application.id ?? "";
}

export default function SharkApprovalTabs() {
  const { data, isLoading, isError } = useSharkApplications();
  const { mutate: approve, isPending } = useApproveSharkApplication();
  const applications = data?.data ?? [];

  const handleApprove = (userId: string) => {
    approve(userId, {
      onSuccess: () =>
        toast.add({
          title: "Shark approved",
          description: "Application has been accepted.",
          type: "success",
        }),
      onError: () =>
        toast.add({
          title: "Approval failed",
          description: "Could not approve this application.",
          type: "error",
        }),
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-muted-foreground">
          Loading shark applications...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-8 text-sm text-destructive">
          Could not load shark applications.
        </CardContent>
      </Card>
    );
  }

  if (!applications.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
          <SearchX className="size-5" />
          No shark applications found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-3">
      {applications.map((application) => {
        const userId = getUserId(application);
        const status =
          application.status ?? application.verificationStatus ?? "PENDING";
        const name = application.user?.name ?? application.name ?? "Applicant";
        const email =
          application.user?.email ?? application.email ?? "No email provided";

        return (
          <Card key={userId || email}>
            <CardContent className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Status: {status}
                </p>
              </div>
              <Button
                disabled={!userId || status === "APPROVED" || isPending}
                onClick={() => handleApprove(userId)}
              >
                <CheckCircle2 />{" "}
                {status === "APPROVED" ? "Approved" : "Accept shark"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
