import SharkApprovalTabs from "@/components/shark/shark-approval-tabs";

export default function ApproveSharkPage() {
  return (
    <section className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Shark approval</h1>
        <p className="text-sm text-muted-foreground">
          Review investor applications and approve shark access.
        </p>
      </div>
      <SharkApprovalTabs />
    </section>
  );
}
