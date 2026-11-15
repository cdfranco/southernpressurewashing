import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { brand } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — Digital menu boards and lobby screens, designed, installed and kept current`,
    template: `%s | ${brand.name}`,
  },
  description: brand.metaDescription,
  openGraph: {
    title: `${brand.name} — Digital boards, designed, installed and kept current`,
    description: brand.ogDescription,
    siteName: brand.name,
    type: "website",
    images: ["/img/mamas-boy-lg.webp"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: brand.url,
  telephone: brand.phoneE164,
  email: brand.email,
  founder: { "@type": "Person", name: brand.founder },
  address: { "@type": "PostalAddress", addressLocality: "Athens", addressRegion: "GA", addressCountry: "US" },
  areaServed: "US",
  description:
    "Branded digital menu boards and lobby screens: designed, installed and kept current, for independents and multi-location chains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-paper font-sans text-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
