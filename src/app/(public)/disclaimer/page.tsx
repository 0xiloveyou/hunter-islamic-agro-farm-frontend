
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";

export const metadata: Metadata = {
  title: "Disclaimer | Hunter Islamic Agro Farm",
  description:
    "Read the agricultural, financial, and investment risk disclaimer for Hunter Islamic Agro Farm.",
};

const sections = [
  {
    title: "1. General Information",
    content:
      "The information on the Hunter Islamic Agro Farm website is provided for general informational purposes. Although we aim to keep information accurate and current, we do not guarantee that every statement, estimate, projection, or project detail is complete, accurate, or up to date.",
  },
  {
    title: "2. Not Financial or Investment Advice",
    content:
      "Website content is not personalized financial, investment, tax, accounting, or legal advice. It should not be treated as a recommendation to invest. Consider obtaining independent professional advice before making financial decisions.",
  },
  {
    title: "3. No Guaranteed Returns",
    content:
      "Any projected revenue, expected yield, estimated profit, or financial forecast is an estimate based on assumptions that may not be achieved. Actual outcomes may be lower than projected, and losses may occur. No profit, return, or recovery of capital is guaranteed unless expressly stated in a valid agreement and permitted by applicable law.",
  },
  {
    title: "4. Agricultural and Operational Risks",
    content:
      "Farming is affected by factors that may be beyond our control, including weather, drought, floods, pests, crop disease, soil conditions, labor availability, transportation costs, equipment failure, market prices, supply-chain disruptions, and government policies. These factors may delay a project, reduce production, increase costs, or result in financial loss.",
  },
  {
    title: "5. Project Estimates and Images",
    content:
      "Project budgets, land estimates, production forecasts, timelines, and photographs may be illustrative, preliminary, or subject to change. Images may represent examples of farming activities rather than the exact current condition of a particular project. Refer to official project documents for verified details.",
  },
  {
    title: "6. Islamic and Shariah Compliance",
    content:
      "Hunter Islamic Agro Farm intends to conduct its agricultural activities in accordance with Islamic principles, including avoiding riba and prohibited business activities. However, this general statement is not a formal Shariah certification. The compliance of a specific investment structure depends on its contracts, ownership arrangements, risk allocation, operations, and implementation. Seek guidance from qualified Shariah advisers and review the applicable documentation before participating.",
  },
  {
    title: "7. Legal and Regulatory Requirements",
    content:
      "The availability of an investment opportunity may depend on your country of residence, investor eligibility, company registration, licensing, tax rules, securities laws, and other legal requirements. Not every project or service is necessarily available to every person or in every jurisdiction.",
  },
  {
    title: "8. Third-Party Information and Links",
    content:
      "Our website may include third-party links, services, or information. We do not control all third-party content and are not responsible for its accuracy, availability, or privacy practices. Accessing third-party services is at your own discretion and subject to their applicable terms.",
  },
  {
    title: "9. Limitation of Responsibility",
    content:
      "To the extent permitted by law, we disclaim responsibility for losses resulting from reliance on general website information or from circumstances outside our reasonable control. This disclaimer does not exclude liability that cannot legally be excluded and does not override rights or obligations established by a signed agreement or mandatory law.",
  },
  {
    title: "10. Independent Verification",
    content:
      "Before committing funds, verify the identity of the contracting entity, the legal status of the project, land ownership or lease rights, applicable permits, payment instructions, fees, risks, withdrawal conditions, and contractual terms. Use official company channels and do not rely solely on informal messages or verbal assurances.",
  },
  {
    title: "11. Updates to This Disclaimer",
    content:
      "We may revise this disclaimer as our website, services, or legal requirements change. The latest version will be published on this page.",
  },
  {
    title: "12. Contact Us",
    content:
      "If you have questions about this disclaimer or a particular agricultural project, contact Hunter Islamic Agro Farm through the official contact details published on our website.",
  },
];

export default function DisclaimerPage() {
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
              Important Notice
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Disclaimer
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              Effective date: October 9, 2026
            </p>

            <p className="mt-6 leading-7 text-muted-foreground">
              Please read this disclaimer carefully. It explains important
              limitations relating to agricultural information, project
              forecasts, potential investments, and the intended Islamic
              principles of Hunter Islamic Agro Farm.
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

          <div className="mt-12 rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
            <h2 className="font-semibold">Investment Risk Reminder</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Agricultural investments can result in partial or total loss of
              capital. Carefully review the relevant contracts and risks before
              making a financial commitment.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

