
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";

export const metadata: Metadata = {
  title: "Terms & Conditions | Hunter Islamic Agro Farm",
  description:
    "Read the terms and conditions for using Hunter Islamic Agro Farm.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the Hunter Islamic Agro Farm website, you agree to these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using the website.",
  },
  {
    title: "2. About Our Platform",
    content:
      "Hunter Islamic Agro Farm is intended to provide information about agricultural projects, farming activities, and potential investment opportunities. Information displayed on this website does not, by itself, constitute an offer to sell securities or a solicitation to invest. Any investment opportunity is subject to separate documentation, eligibility requirements, and applicable law.",
  },
  {
    title: "3. User Accounts",
    content:
      "Users are responsible for providing accurate information, maintaining the confidentiality of their account credentials, and notifying us of suspected unauthorized access. You must not impersonate another person, submit misleading information, or use the platform for unlawful purposes.",
  },
  {
    title: "4. Investment Information",
    content:
      "Project descriptions, estimated costs, timelines, crop projections, and financial figures are provided for informational purposes and may change. Past performance, projected yields, and estimated returns do not guarantee future results. Please review the relevant project documents and contractual terms before making any financial commitment.",
  },
  {
    title: "5. Funding and Allocation",
    content:
      "Submitting an inquiry or creating an account does not guarantee participation in a project. Project selection, funding acceptance, and allocation are subject to the platform's approval process, project availability, applicable law, and the terms of the relevant agreement. Unless a signed agreement expressly provides otherwise, users cannot assume that they may choose or control the allocation of their funds.",
  },
  {
    title: "6. Islamic Principles",
    content:
      "The platform aims to support agricultural activities structured in accordance with Islamic principles. The intended approach is to avoid riba (interest), prohibited business activities, and impermissible transactions. However, a general statement of intention is not a guarantee of Shariah compliance. Specific contracts and operating arrangements should be reviewed by qualified Shariah advisers. Returns, where applicable, must be governed by the relevant agreement and must not be represented as guaranteed unless legally and contractually justified.",
  },
  {
    title: "7. Risks of Agricultural Activities",
    content:
      "Agriculture involves risks, including adverse weather, drought, flooding, pests, disease, crop failure, price fluctuations, transport disruptions, regulatory changes, and other unforeseen events. You may lose some or all of the money committed under an investment agreement. Only participate after understanding the applicable risks and contractual protections.",
  },
  {
    title: "8. Payments and Refunds",
    content:
      "Payment methods, accepted currencies, fees, refunds, withdrawal rights, and payment processing arrangements will be specified in the applicable payment policy or signed agreement. Do not assume that a payment is refundable or withdrawable on demand unless the applicable terms expressly provide for it. Never send funds to an account that has not been verified through an official company channel.",
  },
  {
    title: "9. Appointments and Communications",
    content:
      "Appointments with our team are subject to availability and confirmation. Meeting invitations, online meeting links, and project updates may be provided electronically. Appointment confirmation does not constitute approval of an investment or create a financial commitment.",
  },
  {
    title: "10. Intellectual Property",
    content:
      "Unless otherwise stated, the website's text, branding, graphics, design, and other materials belong to Hunter Islamic Agro Farm or their respective rights holders. You may not reproduce, distribute, or commercially exploit these materials without appropriate permission.",
  },
  {
    title: "11. Prohibited Activities",
    content:
      "You must not misuse the website, interfere with its security, attempt unauthorized access, upload malicious code, submit fraudulent information, or use the platform in violation of applicable laws.",
  },
  {
    title: "12. Limitation of Liability",
    content:
      "To the extent permitted by applicable law, Hunter Islamic Agro Farm is not responsible for indirect or consequential losses arising from ordinary website use or reliance on general informational content. Nothing in these terms excludes liability that cannot lawfully be excluded. Investment-related rights and liabilities are governed by the applicable signed agreements and mandatory law.",
  },
  {
    title: "13. Changes to These Terms",
    content:
      "We may update these terms when our services, operations, or legal requirements change. Updated terms will be published on this page with a revised effective date where appropriate. Continued use of the website after an update is subject to applicable law and any consent requirements.",
  },
  {
    title: "14. Governing Law",
    content:
      "These terms are subject to the laws and dispute-resolution arrangements identified in the applicable contract or official company documentation. The relevant jurisdiction must be confirmed before these terms are used for live operations.",
  },
  {
    title: "15. Contact Us",
    content:
      "For questions about these terms, please contact Hunter Islamic Agro Farm through the official contact details published on our website.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <div className="mb-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Legal Information
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Terms &amp; Conditions
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              Effective date: October 9, 2026
            </p>

            <p className="mt-6 leading-7 text-muted-foreground">
              These Terms &amp; Conditions explain the rules for accessing and
              using the Hunter Islamic Agro Farm website and related services.
              Please read them carefully before using the platform.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="leading-7 text-muted-foreground">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-lg border bg-muted/30 p-5">
            <p className="text-sm leading-6 text-muted-foreground">
              These terms are a general template and should be reviewed by a
              qualified lawyer before being used to accept payments or
              investments.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

