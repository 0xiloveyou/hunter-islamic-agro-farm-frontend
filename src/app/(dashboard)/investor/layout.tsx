import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["INVESTOR"]}>
      <DashboardShell role="INVESTOR">{children}</DashboardShell>
    </RoleGuard>
  );
}
