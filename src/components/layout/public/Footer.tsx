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
    label: "Terms & Condition",
    href: "https://theafricandreams.com/terms-condition/",
  },
  {
    label: "Privacy Policy",
    href: "https://theafricandreams.com/privacy-policy-2/",
  },
  { label: "Disclaimer", href: "https://theafricandreams.com/disclaimer/" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Hunter Islamic Agro Farm connects ethical agro projects with
            investors and sharks through verified shares, appointments, and
            transparent project updates.
          </p>
          <p className="text-xs text-muted-foreground">
            Email: support@hunteragrofarm.com
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Quick links</h2>
          <nav className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Legal</h2>
          <nav className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        Copyright {new Date().getFullYear()} Hunter Islamic Agro Farm. All
        rights reserved.
      </div>
    </footer>
  );
}
