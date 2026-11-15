import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "How Athena Boards packages and care plans are sold: the agreement, ownership, plan terms, cancellation and support.",
  robots: { index: false, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "The agreement",
    body: (
      <p>
        Every engagement is a short written agreement you can read and accept online or on paper. You see and approve the finished
        board before go-live; the package fee is invoiced on approval and due within seven days. Pricing is as published on the{" "}
        <Link href="/pricing">pricing page</Link> on the date of the agreement, before applicable sales tax.
      </p>
    ),
  },
  {
    heading: "Ownership",
    body: (
      <p>
        Hardware you buy in a package is yours on payment, and its manufacturer warranty is registered in your name. The board
        design and our software remain ours and are licensed to you for as long as you are on a care plan (or, for a Board Kit with
        no plan, for the board as delivered). Your content, brand and photographs remain yours; you grant us a license to use them
        to build and run the board and, unless you say otherwise, to show the finished board in our portfolio.
      </p>
    ),
  },
  {
    heading: "Care plans",
    body: (
      <p>
        {
          "Plans are billed monthly in advance. Essential is month to month. Pro is a 12-month term and Premier a 24-month term, each with $200 off the package; after the term they continue month to month. Any plan can be cancelled with 30 days' written notice at the end of its term. Content-change allowances, response times and hardware-replacement commitments are those published for the plan on the pricing page and restated in the agreement."
        }
      </p>
    ),
  },
  {
    heading: "Changes outside your plan",
    body: (
      <p>
        Changes not covered by your plan are quoted in writing at the published change fees and done only after you confirm.
      </p>
    ),
  },
  {
    heading: "Installation",
    body: (
      <p>
        Installed packages include one visit and mounting to a sound wall with a grounded outlet within reach and working Wi-Fi.
        Electrical work, in-wall cabling and permits are done by licensed contractors and quoted separately. You are responsible
        for landlord permission and for the wall.
      </p>
    ),
  },
  {
    heading: "Support and liability",
    body: (
      <p>
        We support the board and the hardware as described in your plan. We are not responsible for outages caused by your power or
        internet, by changes you make to the hardware, or by events outside our reasonable control. Our total liability is capped
        as stated in the agreement; neither of us is liable to the other for indirect or consequential losses.
      </p>
    ),
  },
  {
    heading: "Chains",
    body: (
      <p>
        Multi-location programs are governed by a master services agreement with per-location order schedules and SLA, security and
        insurance exhibits. See the <Link href="/franchise">chain program</Link> and{" "}
        <Link href="/trust">security and trust</Link> pages.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: <p>Georgia law; disputes in the courts of Athens-Clarke County, Georgia, unless the agreement says otherwise.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Terms, in summary"
      title="How we sell a board, in plain English."
      lead="Effective September 11, 2026. This page summarizes the standard terms. The agreement you sign controls; chain accounts sign a master services agreement with schedules and exhibits instead. Nothing here is legal advice."
      sections={sections}
    />
  );
}
