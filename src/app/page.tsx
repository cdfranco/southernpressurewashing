import { PageHeader } from "@/components/page-header";
import { brand } from "@/content/site";

export default function Home() {
  return <PageHeader kicker={brand.tagline} title="Your menu, your specials, your brand — on a screen that runs itself." />;
}
