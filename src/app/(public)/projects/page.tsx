"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/hooks";
import type { Project } from "@/types";

const fallbackProjects: Project[] = [
  {
    id: "sample-maize",
    title: "Uganda 3,000 Acre Maize Farm",
    description:
      "Large-scale maize farming project designed for staged funding and seasonal crop planning.",
    imageUrl: "/3463766.jpg",
    location: "Uganda",
    totalCost: 2500000,
    currency: "USD",
    status: "FUNDING",
    startDate: "2026-10-01",
    endDate: "2029-10-01",
  },
];

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useProjects({
    page: 1,
    limit: 20,
    searchTerm,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const projects = data?.data?.length ? data.data : fallbackProjects;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="mb-8 grid gap-5 md:grid-cols-[1fr_360px] md:items-end">
            <div>
              <h1 className="text-3xl font-semibold">Projects</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Public agro investment projects fetched from the backend, with
                fallback sample content while the API is offline.
              </p>
            </div>
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title, location, description"
              type="search"
            />
          </div>

          {isError && (
            <p className="mb-4 border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              Could not reach the project API, showing sample project data.
            </p>
          )}
          {isLoading && (
            <p className="mb-4 text-sm text-muted-foreground">
              Loading projects...
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="relative aspect-[16/9] bg-muted">
                  <Image
                    src={project.imageUrl || "/3463766.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3" />
                      {project.location}
                    </span>
                    <span>{project.status ?? "FUNDING"}</span>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>{project.description}</p>
                  <p className="font-medium text-foreground">
                    Total cost:{" "}
                    {formatMoney(project.totalCost, project.currency)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button render={<Link href="/shares" />} nativeButton={false}>
                    Buy shares <ArrowRight />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
