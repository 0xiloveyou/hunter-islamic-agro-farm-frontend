import Link from "next/link";
import Logo from "@/assets/svg/Logo";

const quickLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Shares", href: "/shares" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
  { label: "About us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Disclaimer",
    href: "/disclaimer",
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand Information */}
        <div className="space-y-4">
          <Link
            href="/"
            aria-label="Hunter Islamic Agro Farm home"
            className="inline-flex"
          >
            <Logo />
          </Link>

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Hunter Islamic Agro Farm connects ethical agro projects with
            investors and sharks through verified shares, appointments,
            and transparent project updates.
          </p>

          <p className="text-xs text-muted-foreground">
            Email:{" "}
            <a
              href="mailto:support@hunteragrofarm.com"
              className="transition-colors hover:text-foreground"
            >
              support@hunteragrofarm.com
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-sm font-semibold">Quick Links</h2>

          <nav
            aria-label="Quick links"
            className="mt-4 grid gap-2 text-sm text-muted-foreground"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Legal Links */}
        <div>
          <h2 className="text-sm font-semibold">Legal</h2>

          <nav
            aria-label="Legal links"
            className="mt-4 grid gap-2 text-sm text-muted-foreground"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        Copyright © {new Date().getFullYear()} Hunter Islamic Agro Farm.
        All rights reserved.
      </div>
    </footer>
  );
}

