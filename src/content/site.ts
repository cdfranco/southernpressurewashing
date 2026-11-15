/**
 * Athena Boards — shared site content.
 *
 * Brand details, navigation, the board portfolio and the published prices live
 * here so every page reads the same numbers. Page-specific copy lives next to
 * the page that uses it.
 */

export const brand = {
  name: "Athena Boards",
  legalName: "Athena Boards (Franco Creative Agency)",
  url: "https://athena-boards.vercel.app",
  tagline: "Digital boards · designed, installed, kept current",
  metaDescription:
    "Athena Boards designs a branded digital board for your business, installs the screen, and keeps it current under a monthly care plan. Installed packages from $950, or $500 on a TV you already own. One screen for a café or one system for hundreds of locations.",
  ogDescription:
    "Your menu, your specials, your brand — on a screen that runs itself. Installed packages from $950. Care plans from $49/month. You see your board before you pay.",
  footerBlurb:
    "Branded digital boards for the businesses on your street and the chains on every street — designed, installed and kept current by us.",
  phone: "(706) 521-4024",
  phoneHref: "tel:+17065214024",
  phoneE164: "+17065214024",
  email: "cdfranco@gmail.com",
  founder: "Caleb Franco",
  location: "Athens, Georgia",
  serviceArea: "Athens, Georgia · serving Atlanta and the Southeast · chain rollouts nationwide",
  primaryCta: { label: "Get your free draft board", href: "/contact" },
};

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavLink[] };

export const navigation: NavItem[] = [
  {
    label: "How it works",
    href: "/how-it-works",
    children: [
      { label: "Design", href: "/how-it-works#design", description: "We start from your brand, not from a template." },
      { label: "Equipment", href: "/how-it-works#equipment", description: "Hardware chosen for walls that run all day." },
      { label: "Software", href: "/how-it-works#software", description: "Built to run for years without a hand on it." },
      { label: "After go-live", href: "/how-it-works#after", description: "Text us the change. That's the whole process." },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    children: [
      { label: "Packages", href: "/pricing#packages", description: "Design, display, mount and installation. One-time." },
      { label: "Care plans", href: "/pricing#plans", description: "Keeps it running and current, from $49 a month." },
      { label: "Chain pricing", href: "/pricing#chains", description: "One price per location, with a rollout calculator." },
      { label: "Change fees", href: "/pricing#changes", description: "If it isn't in your plan, it's on this list." },
    ],
  },
  { label: "Chains & franchises", href: "/franchise" },
  { label: "Our work", href: "/work" },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About", href: "/about", description: "Built in Athens, Georgia. Built to roll out." },
      { label: "Security & trust", href: "/trust", description: "Written for IT, Legal and Purchasing." },
      { label: "Contact", href: "/contact", description: "Tell us about the wall." },
    ],
  },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Care plans", href: "/pricing#plans" },
      { label: "Equipment", href: "/how-it-works#equipment" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security & trust", href: "/trust" },
      { label: "Our work", href: "/work" },
      { label: "Chains & franchises", href: "/franchise" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Live demo boards",
    links: [
      { label: "Restaurant specials board", href: "https://lalos-tacos-cantina-board.vercel.app" },
      { label: "Breakfast menu board", href: "https://mamas-boy-board.vercel.app" },
      { label: "Rec-center schedule board", href: "https://ywco-board.vercel.app" },
      { label: "Portrait photo board", href: "https://kiques-kitchen-portrait-board.vercel.app" },
    ],
  },
];

export const footerDisclaimer =
  "Demo boards show each business's public menu and brand for illustration. Names and marks belong to their owners; a demo is not an endorsement.";

/* ── Portfolio ─────────────────────────────────────────────────────── */

export type BoardCategory = "restaurants" | "coffee" | "services";

export type Board = {
  slug: string;
  name: string;
  /** Caption shown on the Our work page. */
  caption: string;
  alt: string;
  category: BoardCategory;
  /** Live board URL. Boards without one are private previews shown as screenshots. */
  liveUrl?: string;
  portrait?: boolean;
};

export const boardCategories: { id: BoardCategory; kicker: string; heading: string; short: string }[] = [
  { id: "restaurants", kicker: "Restaurants", heading: "Specials that know what day it is.", short: "Restaurants" },
  {
    id: "coffee",
    kicker: "Coffee, chocolate & baking",
    heading: "Menus that look like the bag on the shelf.",
    short: "Coffee & bakeries",
  },
  {
    id: "services",
    kicker: "Services, schedules & visitors",
    heading: "Not every wall is a menu.",
    short: "Services & schedules",
  },
];

export const boards: Board[] = [
  {
    slug: "mamas-boy",
    name: "Mama's Boy at the Falls",
    caption: "Live · diner menu · every price from the printed menu",
    alt: "Mama's Boy board: featured breakfast dish, menu with published prices, live open/closed badge",
    category: "restaurants",
    liveUrl: "https://mamas-boy-board.vercel.app/",
  },
  {
    slug: "lalos",
    name: "LALO's Tacos & Cantina",
    caption: "Live · weekly specials · partner panel",
    alt: "LALO's Tacos & Cantina board: featured dish, weekly specials grid with today highlighted, partner panel",
    category: "restaurants",
    liveUrl: "https://lalos-tacos-cantina-board.vercel.app/",
  },
  {
    slug: "first-watch",
    name: "First Watch — concept board",
    caption: "Live · not a customer · 678 stores from one file",
    alt: "First Watch concept board: seasonal features, menu prices from the store's public ordering menu, waitlist prompt",
    category: "restaurants",
    liveUrl: "https://first-watch-board.vercel.app/",
  },
  {
    slug: "agua-linda",
    name: "Agua Linda",
    caption: "Live · two locations, one board",
    alt: "Agua Linda board: featured dishes, lunch specials and hours for two locations",
    category: "restaurants",
    liveUrl: "https://agua-linda-board.vercel.app/",
  },
  {
    slug: "kiques",
    name: "Kique's Kitchen",
    caption: "Live · birria menu · Friday specials",
    alt: "Kique's Kitchen board: birria menu with prices, Friday specials strip",
    category: "restaurants",
    liveUrl: "https://kiques-kitchen-board.vercel.app/",
  },
  {
    slug: "kiques-portrait",
    name: "Kique's Kitchen — portrait",
    caption: "Live · 43\" upright · chosen by the restaurant",
    alt: "Kique's Kitchen portrait board: full-bleed dish photo, weekly specials with today highlighted, partner panel",
    category: "restaurants",
    liveUrl: "https://kiques-kitchen-portrait-board.vercel.app/",
    portrait: true,
  },
  {
    slug: "los-plebes",
    name: "Tacos Los Plebes",
    caption: "Live · bilingual · meat × style price grid",
    alt: "Tacos Los Plebes board: bilingual price grid of meats by style, clock and weather in the header",
    category: "restaurants",
    liveUrl: "https://tacos-los-plebes-board.vercel.app/",
  },
  {
    slug: "cali-n-titos",
    name: "Cali-N-Tito's",
    caption: "Live · two locations · Cuban & Peruvian menu",
    alt: "Cali-N-Tito's board: Cuban and Peruvian menu with prices, two-location switch",
    category: "restaurants",
    liveUrl: "https://cali-n-titos-board.vercel.app/",
  },
  {
    slug: "farm-441",
    name: "Farm 441 at Thomas Orchards",
    caption: "Screenshot · private preview · farm store & weekend barbecue",
    alt: "Farm 441 board: farm store hours, weekend barbecue menu with prices, pavilion rental",
    category: "restaurants",
  },
  {
    slug: "jittery-joes",
    name: "Jittery Joe's Coffee",
    caption: "Live · café offers · partner panel",
    alt: "Jittery Joe's Coffee board: rotating offers, coffee menu, partner ad panel",
    category: "coffee",
    liveUrl: "https://jittery-joes-board.vercel.app/",
  },
  {
    slug: "thousand-faces",
    name: "1000 Faces Coffee",
    caption: "Live · roaster · on-the-bar coffees",
    alt: "1000 Faces Coffee board: drink menu, the four coffees on the bar, retail bags",
    category: "coffee",
    liveUrl: "https://thousand-faces-board.vercel.app/",
  },
  {
    slug: "thousand-faces-portrait",
    name: "1000 Faces — portrait",
    caption: "Screenshot · private preview · behind-the-bar menu nook",
    alt: "1000 Faces Coffee portrait board: full drink menu styled after the shop's letter boards",
    category: "coffee",
    portrait: true,
  },
  {
    slug: "choco-coffee",
    name: "Choco Coffee",
    caption: "Screenshot · private preview · Ecuadorian roaster",
    alt: "Choco Coffee board: Ecuadorian roaster's bags and café menu in a retro-pop style",
    category: "coffee",
  },
  {
    slug: "condor-chocolates",
    name: "Condor Chocolates",
    caption: "Screenshot · private preview · two shops",
    alt: "Condor Chocolates board: chocolate counter prices and hours for two shops",
    category: "coffee",
  },
  {
    slug: "mollys-coffee",
    name: "Molly's Coffee Company",
    caption: "Screenshot · private preview · café menu",
    alt: "Molly's Coffee Company board: café menu with prices and daily specials",
    category: "coffee",
  },
  {
    slug: "sips-espresso",
    name: "Sips Espresso Café",
    caption: "Screenshot · private preview · roasts its own",
    alt: "Sips Espresso Café board: espresso menu and house-roasted coffee",
    category: "coffee",
  },
  {
    slug: "independent-baking",
    name: "Independent Baking Co.",
    caption: "Screenshot · private preview · day-of-week bake list",
    alt: "Independent Baking Co. board: the day's bake list highlighted by weekday",
    category: "coffee",
  },
  {
    slug: "farm-441-instagram",
    name: "Farm 441 — Instagram edition",
    caption: "Screenshot · private preview · live social gallery panel",
    alt: "Farm 441 Instagram edition board: a rotating gallery of the farm's own posts",
    category: "coffee",
  },
  {
    slug: "ywco",
    name: "YWCO Athens",
    caption: "Live · class & pool schedule · 5-day weather",
    alt: "YWCO Athens board: today's class schedule, pool hours and a five-day forecast",
    category: "services",
    liveUrl: "https://ywco-board.vercel.app/",
  },
  {
    slug: "visit-athens",
    name: "Visit Athens GA",
    caption: "Screenshot · private preview · events feed · gameday",
    alt: "Visit Athens GA welcome center board: upcoming events, weather and game-day strip",
    category: "services",
  },
  {
    slug: "bulldog-laundry",
    name: "Bulldog Laundry",
    caption: "Live · services · pickup & delivery",
    alt: "Bulldog Laundry board: services and prices, pickup and delivery panel, live weather",
    category: "services",
    liveUrl: "https://bulldog-laundry-board.vercel.app/",
  },
];

export const boardBySlug = (slug: string): Board => {
  const board = boards.find((b) => b.slug === slug);
  if (!board) throw new Error(`Unknown board: ${slug}`);
  return board;
};

export const boardImage = (slug: string, size: "sm" | "lg" = "sm") => `/img/${slug}-${size}.webp`;

/* ── Multi-location concept demo (store picker) ────────────────────── */

export const fleetDemo = {
  baseUrl: "https://first-watch-board.vercel.app/",
  label: "Choose a First Watch store",
  hint: "Pick a store — address, weather and prices follow.",
  groups: [
    {
      label: "Georgia — per-store prices loaded",
      stores: [
        ["athens", "Athens, GA"],
        ["windward-parkway", "Windward Parkway · Alpharetta, GA"],
        ["madison-yards", "Madison Yards · Atlanta, GA"],
        ["perimeter", "Perimeter · Atlanta, GA"],
        ["crane-creek", "Crane Creek · Augusta, GA"],
        ["braselton", "Braselton, GA"],
        ["buford", "Buford, GA"],
        ["chamblee", "Chamblee, GA"],
        ["columbus", "Columbus, GA"],
        ["midland", "Midland · Columbus, GA"],
        ["cumming", "Cumming, GA"],
        ["dawsonville", "Dawsonville, GA"],
        ["decatur", "Decatur, GA"],
        ["gainesville", "Gainesville, GA"],
        ["hinesville", "Hinesville, GA"],
        ["johns-creek", "John's Creek, GA"],
        ["barrett-parkway", "Barrett Parkway · Kennesaw, GA"],
        ["kennesaw", "Kennesaw, GA"],
        ["loganville", "Loganville, GA"],
        ["east-cobb", "East Cobb · Marietta, GA"],
        ["sandy-plains", "Sandy Plains · Marietta, GA"],
        ["jodeco-road", "Jodeco Road · McDonough, GA"],
        ["peachtree-corners", "Peachtree Corners, GA"],
        ["pooler", "Pooler, GA"],
        ["rome", "Rome, GA"],
        ["vinings", "Vinings · Smyrna, GA"],
        ["snellville", "Snellville, GA"],
        ["tucker", "Tucker, GA"],
      ],
    },
    {
      label: "Elsewhere — address & weather (Athens prices until pulled)",
      stores: [
        ["bradenton", "Bradenton · Bradenton, FL"],
        ["carrollwood", "Carrollwood · Tampa, FL"],
        ["downtown-nashville", "Downtown Nashville · Nashville, TN"],
        ["ballantyne", "Ballantyne · Charlotte, NC"],
        ["shoal-creek", "Shoal Creek · Kansas City, MO"],
        ["agua-fria", "Agua Fria · Phoenix, AZ"],
        ["addison", "Addison · Dallas, TX"],
      ],
    },
  ] as { label: string; stores: [string, string][] }[],
  disclaimer:
    "Concept board — built from First Watch's public menu; not a customer. Shown to demonstrate the system. Not affiliated with or endorsed by First Watch.",
};

/* ── Chain pricing bands (shared by the pricing table and the calculator) ── */

export const chainPricing = {
  bands: [
    { min: 1, max: 9, once: 1500, monthly: 99, label: "1–9 locations (list)", tableLabel: "1–9 (pilot, list)" },
    { min: 10, max: 49, once: 1450, monthly: 89, label: "10–49 locations", tableLabel: "10–49" },
    { min: 50, max: 199, once: 1395, monthly: 79, label: "50–199 locations", tableLabel: "50–199" },
    { min: 200, max: 599, once: 1295, monthly: 69, label: "200–599 locations", tableLabel: "200–599" },
    { min: 600, max: 100000, once: 1195, monthly: 59, label: "600+ locations", tableLabel: "600+" },
  ],
  displayAdj: { pro43: 0, pro55: 400, byo: -650 } as Record<string, number>,
  brandBuild: 4500,
  brandBuildWaivedAt: 200,
};

/* ── The film: chapter start times match the timeline in video/film.js ── */

export const film = {
  title: "Athena Boards in 41 seconds",
  poster: "/video/athena-boards-film.jpg",
  mp4: "/video/athena-boards-film.mp4",
  webm: "/video/athena-boards-film.webm",
  /** Total length in seconds. */
  duration: 41,
  caption:
    "The café in the film is a made-up example. The boards on the other walls were designed for real Athens-area businesses; a demo is not an endorsement.",
  chapters: [
    {
      id: "build",
      step: "1",
      label: "We build your board",
      when: "Days 1–3 · no charge",
      start: 0,
      body: "Send us your website or menu. We design the board in your brand and send you a private link to review — on your phone, your laptop, or a TV in your dining room.",
    },
    {
      id: "approve",
      step: "2",
      label: "You approve it",
      when: "Days 3–5",
      start: 10,
      body: "Tell us what to fix — a price, a photo, a dish that's gone. One round of corrections is included. You accept a short, plain-English agreement on your phone and pay the one-time package fee.",
    },
    {
      id: "install",
      step: "3",
      label: "We install it",
      when: "Days 7–14 · one visit",
      start: 19.5,
      body: "We deliver the display, mount it where we agreed, connect it to your Wi-Fi and bring the board live in one visit. Portrait or landscape. We leave the remote with the manager, behind the counter.",
    },
    {
      id: "fresh",
      step: "4",
      label: "We keep it fresh",
      when: "Every day after",
      start: 29.5,
      body: "Your care plan covers hosting, monitoring and content changes. Text us the change; it's live within your plan's turnaround. Seasonal menus switch themselves on the date you choose.",
    },
  ],
};

/* ── Home page: hero slides (illustrated venues with real boards on screen) ── */

export const heroSlides = [
  {
    image: "/img/scenes/cafe.webp",
    alt: "Illustration of a café wall with a mounted screen showing the Mama's Boy breakfast board",
    board: "mamas-boy",
    value: 21,
    prefix: "",
    suffix: "",
    label: "boards designed for 18 businesses in Athens, GA",
  },
  {
    image: "/img/scenes/taqueria.webp",
    alt: "Illustration of a taquería wall with a mounted screen showing the LALO's weekly specials board",
    board: "lalos",
    value: 30,
    prefix: "",
    suffix: " min",
    label: "from a change to a screen on our player app",
  },
  {
    image: "/img/scenes/roastery.webp",
    alt: "Illustration of a coffee bar with an upright screen showing the 1000 Faces menu board",
    board: "thousand-faces",
    value: 0,
    prefix: "$",
    suffix: "",
    label: "due until you've seen your board",
  },
  {
    image: "/img/scenes/lobby.webp",
    alt: "Illustration of a rec-center lobby with a mounted screen showing the YWCO class schedule board",
    board: "ywco",
    value: 12,
    prefix: "",
    suffix: "",
    label: "boards you can open live, right now",
  },
];

export const builtFor = [
  { label: "Restaurants", icon: "utensils" },
  { label: "Coffee shops", icon: "cup" },
  { label: "Bakeries", icon: "storefront" },
  { label: "Laundromats", icon: "refresh" },
  { label: "Rec centers", icon: "heart" },
  { label: "Welcome centers", icon: "map-pin" },
  { label: "Franchise & corporate chains", icon: "office" },
];

/* ── Home page: live boards shown in the showcase ── */

export const liveShowcase = [
  {
    board: "mamas-boy",
    kicker: "Diner menu · every price from the printed menu",
    body: "A real board, running right now: live clock, local weather, today's menu with the restaurant's published prices.",
  },
  {
    board: "lalos",
    kicker: "Weekly specials · today auto-highlighted",
    body: "Weekly specials with today highlighted. It changes at midnight without anyone touching it.",
  },
  {
    board: "ywco",
    kicker: "Class & pool schedule · clock-driven",
    body: "A rec-center board: every class, instructor and pool block on it is real, and the panel follows the clock through the day.",
  },
  {
    board: "jittery-joes",
    kicker: "Café offers · partner panel",
    body: "Rotating offers, the coffee menu, and a small partner panel for local businesses the café approves.",
  },
];
