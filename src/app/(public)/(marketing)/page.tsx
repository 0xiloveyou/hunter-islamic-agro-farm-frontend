import {
  ArrowRight,
  CalendarDays,
  Leaf,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Investor share", value: "$1,000" },
  { label: "Shark share", value: "$50,000" },
  { label: "Appointment slots", value: "30 min" },
];

const features = [
  {
    title: "Verified projects",
    description:
      "Browse public agro projects with costs, locations, dates, and funding status.",
    icon: Sprout,
  },
  {
    title: "Share checkout",
    description:
      "Investors and sharks can buy shares through the Stripe checkout flow.",
    icon: ShieldCheck,
  },
  {
    title: "Shark appointments",
    description:
      "Approved sharks can schedule focused investment meetings with admins.",
    icon: CalendarDays,
  },
];

export default function HomePage() {
  return (
    <div className="bg-background">
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <Image
          src="/3463766.jpg"
          alt="Agro farm field"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-16 text-white">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex w-fit border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              Ethical agro investment platform
            </span>
            <h1 className="text-4xl font-semibold tracking-normal md:text-6xl">
              Hunter Islamic Agro Farm
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Invest in agricultural projects with a clear role path for
              investors, sharks, and admins. Track projects, buy verified
              shares, and coordinate appointments from one focused platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                render={<Link href="/projects" />}
                nativeButton={false}
              >
                View Projects <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                render={<Link href="/blogs" />}
                nativeButton={false}
              >
                View Blogs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                render={<Link href="/about-us" />}
                nativeButton={false}
              >
                About Us
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="size-5" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <Leaf className="mb-4 size-7" />
            <h2 className="text-2xl font-semibold">
              From Vision to Ethical Investment
            </h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Start by browsing public projects, then register as an investor to
            buy shares. Investors can apply to become sharks, and approved
            sharks can book appointment slots with admins for larger project
            conversations.
          </p>
        </div>
      </section>
    </div>
  );
}
