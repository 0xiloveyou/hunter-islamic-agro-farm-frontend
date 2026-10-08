"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import type { UserRole } from "@/types";

const routes = [
  { name: "Home", url: "/" },
  { name: "Projects", url: "/projects" },
  { name: "Shares", url: "/shares" },
  { name: "Blogs", url: "/blogs" },
  { name: "FAQs", url: "/faqs" },
  { name: "About", url: "/about-us" },
  { name: "Contact", url: "/contact" },
];

const dashboardRoute: Record<UserRole, string> = {
  ADMIN: "/admin",
  SHARK: "/shark",
  INVESTOR: "/investor",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();
  const role = data?.data?.role as UserRole | undefined;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out",
          description: "You have been signed out successfully.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something went wrong.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-muted-foreground transition hover:text-foreground"
            >
              {route.name}
            </Link>
          ))}
          {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          )}
        </div>

        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu />
        </Button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-3 md:hidden">
          <nav className="grid gap-3 text-sm">
            {routes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                onClick={() => setOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
          </nav>
        </div>
      )}
    </header>
  );
}
