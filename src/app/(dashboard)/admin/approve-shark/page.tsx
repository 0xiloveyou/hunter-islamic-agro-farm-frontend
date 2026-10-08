import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";

export default function page() {
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl"> Shark approval </h1>
        <p>Review the Shark application and approve or reject them.</p>
      </div>
      <DoctorApprovalTabs />
    </section>
  );
}
