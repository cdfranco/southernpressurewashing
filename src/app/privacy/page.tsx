import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Athena Boards collects on this website and from installed boards, and what it does with it.",
  robots: { index: false, follow: true },
};

const mailto = `mailto:${brand.email}`;

const sections: LegalSection[] = [
  {
    heading: "This website",
    body: (
      <p>
        {
          "We collect what you type into the contact form: your name, business, email, phone, number of locations, what you're interested in, and your message, plus the page you sent it from, your browser's user-agent string and IP address (for spam protection). We store it privately, use it only to reply to you and to prepare what you asked for, and never sell or share it with anyone except the service providers that host our site and deliver our email. We do not run analytics trackers or advertising pixels on this site, and we set no cookies of our own. Live demo boards embedded on this site are served from our own hosting and load a public weather forecast for the board's location; they do not identify you."
        }
      </p>
    ),
  },
  {
    heading: "Installed boards and players",
    body: (
      <p>
        {
          "A board displays content; it does not observe. Our player software and the boards it shows collect no data about the people in the room. The only information a device transmits is a periodic check-in to us (a device identifier, software version, uptime and the board URL it is showing) and requests to our hosting and a weather service, which see the device's IP address as any web request does. Our kiosk software declares no camera, microphone, location or storage permissions."
        }
      </p>
    ),
  },
  {
    heading: "Client content",
    body: (
      <p>
        Menus, prices, photos and logos you give us are used to build and run your board and, with your permission, to show the
        finished board in our portfolio. You own them; we license them only for those purposes and delete or return them at the end
        of an engagement on request.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        {
          "Ask us what we hold about you and we'll tell you; ask us to delete it and we will, unless we need it to keep a signed agreement's records. Email "
        }
        <a href={mailto}>{brand.email}</a>.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: (
      <p>
        {
          "If this policy changes we'll update the date above. Material changes affecting clients under agreement are communicated in writing."
        }
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy policy"
      title={"What we collect, and what we don't."}
      lead={
        <>
          Effective September 11, 2026. Plain language on purpose; if anything here is unclear, email{" "}
          <a href={mailto}>{brand.email}</a>.
        </>
      }
      sections={sections}
    />
  );
}
