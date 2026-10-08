import { BadgeDollarSign, Handshake, Sprout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
  {
    title: "Project transparency",
    description:
      "Public project listings show core details before users enter a protected buying flow.",
    icon: Sprout,
  },
  {
    title: "Role-based access",
    description:
      "Admins, investors, and sharks each get dashboards matched to their platform work.",
    icon: Handshake,
  },
  {
    title: "Verified investment",
    description:
      "Share purchase flows connect to Stripe checkout and verified payment records.",
    icon: BadgeDollarSign,
  },
];

export default function AboutUsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">About us</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Hunter Islamic Agro Farm is built for ethical agricultural investment,
          helping public visitors explore projects while giving authenticated
          investors, sharks, and admins the tools they need to manage shares,
          applications, appointments, and project operations.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title}>
            <CardHeader>
              <value.icon className="size-5" />
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {value.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
