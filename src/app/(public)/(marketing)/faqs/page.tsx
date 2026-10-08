import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  [
    "Who can buy shares?",
    "Registered investors and approved sharks can buy shares after logging in.",
  ],
  [
    "How much is one share?",
    "Investor shares are USD 1,000 each, while shark shares are USD 50,000 each.",
  ],
  [
    "How do shark appointments work?",
    "Admins create schedules, sharks book an available slot, and admins approve the request with an appointment URL.",
  ],
  [
    "Are projects public?",
    "Yes. The projects page is public and fetches project data from the backend.",
  ],
];

export default function FaqsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold">FAQs</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Common answers for investors, sharks, and public project visitors.
        </p>
      </div>
      <div className="grid gap-4">
        {faqs.map(([question, answer]) => (
          <Card key={question}>
            <CardHeader>
              <CardTitle>{question}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {answer}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
