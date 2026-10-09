
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | Hunter Islamic Agro Farm",
  description:
    "Learn how Hunter Islamic Agro Farm collects, uses, and protects personal information.",
};

const sections = [
  {
    title: "1. Introduction",
    content:
      "Hunter Islamic Agro Farm respects your privacy. This Privacy Policy explains how we may collect, use, store, and share information when you visit our website, create an account, contact our team, or use our services.",
  },
  {
    title: "2. Information We May Collect",
    content:
      "Depending on how you use the platform, we may collect your name, email address, phone number, account details, profile image, appointment information, communications with our team, and information you voluntarily provide. We may also collect technical information such as browser type, device information, approximate location derived from technical data, IP address, and website usage information.",
  },
  {
    title: "3. Google Sign-In",
    content:
      "If you choose to sign in using Google, we may receive information made available through the Google authentication process, such as your name, email address, profile image, and authentication identifier. We use this information to create or authenticate your account and provide platform services. Google's handling of your information is also subject to Google's own privacy terms.",
  },
  {
    title: "4. How We Use Information",
    content:
      "We may use your information to create and manage accounts, authenticate users, respond to inquiries, arrange appointments, administer project participation, process or verify payments, provide updates, maintain platform security, prevent fraud, comply with legal obligations, and improve our services.",
  },
  {
    title: "5. Payments and Financial Information",
    content:
      "Payments may be handled by third-party payment providers. Where applicable, those providers may collect and process payment information under their own privacy policies. We aim to collect only the information necessary to administer transactions and maintain relevant records. Do not submit payment card details through an ordinary contact form or email.",
  },
  {
    title: "6. How We Share Information",
    content:
      "We may share relevant information with authorized staff, service providers, hosting providers, authentication providers, payment processors, professional advisers, or public authorities when reasonably necessary to operate the platform, provide requested services, protect rights, prevent fraud, or comply with the law. We do not promise that information will never be shared; any sharing must have an appropriate legal basis.",
  },
  {
    title: "7. Cookies and Similar Technologies",
    content:
      "The website may use essential cookies or similar technologies to support authentication, security, user preferences, and website functionality. If analytics or advertising technologies are introduced, we will provide additional information and obtain consent where required by applicable law.",
  },
  {
    title: "8. Data Security",
    content:
      "We use reasonable technical and organizational measures intended to protect personal information against unauthorized access, loss, misuse, or alteration. No internet transmission or storage system can be guaranteed to be completely secure.",
  },
  {
    title: "9. Data Retention",
    content:
      "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including providing services, maintaining financial and operational records, resolving disputes, and meeting legal obligations. Retention periods depend on the type of information and applicable law.",
  },
  {
    title: "10. Your Privacy Rights",
    content:
      "Depending on your location and applicable law, you may have rights to request access to, correction of, deletion of, or a copy of your personal information. You may also be able to object to or restrict certain processing. Some records may need to be retained where the law requires it. Contact us to make a privacy-related request.",
  },
  {
    title: "11. Children's Privacy",
    content:
      "Our services are not intended for children who are not legally permitted to enter into the relevant agreements. We do not knowingly collect children's personal information in violation of applicable law. If you believe a child has provided personal information improperly, please contact us.",
  },
  {
    title: "12. Third-Party Services",
    content:
      "Our website may link to or integrate with third-party services. We do not control the privacy practices of independent third parties. Please review their privacy policies before sharing information with them.",
  },
  {
    title: "13. International Data Transfers",
    content:
      "If our infrastructure or service providers operate in other countries, your information may be processed or stored outside your country of residence. Where required, we will implement appropriate safeguards for international transfers.",
  },
  {
    title: "14. Changes to This Policy",
    content:
      "We may update this Privacy Policy to reflect changes to our services, technology, or legal obligations. The revised version will be published on this page, with an updated effective date where appropriate.",
  },
  {
    title: "15. Contact Us",
    content:
      "For questions, access requests, or concerns about your personal information, contact Hunter Islamic Agro Farm using the official contact details published on our website.",
  },
];

export default function PrivacyPolicyPage() {
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
              Your Privacy Matters
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm text-muted-foreground">
              Effective date: October 9, 2026
            </p>

            <p className="mt-6 leading-7 text-muted-foreground">
              This policy describes how Hunter Islamic Agro Farm handles
              personal information when you access our website, register for an
              account, contact us, or use our services.
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
              Before publishing, ensure this policy accurately reflects your
              actual database, authentication, hosting, analytics, and payment
              providers. Do not promise security practices or privacy rights
              that your service does not implement.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

