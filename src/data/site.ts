export type BridgeRole =
  "Bridge Direct Lending" | "Financing Secured by Bridge";

export interface FinancingResult {
  slug: string;
  category: string;
  result: string;
  detail: string;
  role: BridgeRole;
  status: "Funded" | "Closed" | "In progress";
  image: string;
  imageAlt: string;
}

export interface CustomerStory {
  slug: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  result: string;
  resultLabel: string;
  financingType: string;
  role: BridgeRole;
  image: string;
  imageAlt: string;
  summary: string;
}

export interface FinancingProduct {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface FinancingPath {
  slug: "hotel-financing" | "consumer-brands";
  shortName: string;
  title: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  /** Optional looping background video for the financing page hero. */
  heroVideo?: string;
  recentResult: FinancingResult;
  products: FinancingProduct[];
  eligibility: string[];
  faqs: Faq[];
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface ProofPoint {
  value: string;
  label: string;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  supportEmail: string;
  address: string;
  nmls: string;
  privacyUrl: string;
  termsUrl: string;
}

export const siteSettings: SiteSettings = {
  companyName: "Bridge",
  legalName: "Foro Holdings, Inc.",
  supportEmail: "support@bridgemarketplace.com",
  address: "New York, NY",
  nmls: "2566783",
  privacyUrl: "https://www.bridgemarketplace.com/privacy-policy",
  termsUrl: "https://www.bridgemarketplace.com/terms-of-use",
};

export const results: FinancingResult[] = [
  {
    slug: "tru-hilton-construction",
    category: "Hotel new construction",
    result: "Tru by Hilton",
    detail: "Senior construction loan · 106 keys",
    role: "Bridge Direct Lending",
    status: "In progress",
    image: "/images/wins/groundbreaking.png",
    imageAlt: "Groundbreaking ceremony for a new hotel development",
  },
  {
    slug: "hampton-refinance",
    category: "Hotel refinance",
    result: "$18,500,000",
    detail: "CMBS refinance with cash-out · Closed in 35 days",
    role: "Financing Secured by Bridge",
    status: "Closed",
    image: "/images/wins/hampton-refi.png",
    imageAlt: "Hampton hotel exterior",
  },
  {
    slug: "comfort-suites-acquisition",
    category: "Hotel acquisition",
    result: "$5,300,000",
    detail: "Comfort Suites acquisition · 88 keys",
    role: "Financing Secured by Bridge",
    status: "Closed",
    image: "/images/wins/comfort-suites.png",
    imageAlt: "Comfort Suites hotel exterior",
  },
  {
    slug: "dog-sauce-retail-launch",
    category: "Consumer brand production",
    result: "3,000 Walmart doors",
    detail: "New SKU launch and production financing",
    role: "Bridge Direct Lending",
    status: "Funded",
    image: "/images/wins/dog-sauce.png",
    imageAlt: "DogSauce products displayed in a retail aisle",
  },
  {
    slug: "walmart-supplier-order",
    category: "Purchase order financing",
    result: "$500,000",
    detail: "Production financing for a Walmart order",
    role: "Bridge Direct Lending",
    status: "Funded",
    image: "/images/wins/ice-cream.png",
    imageAlt: "Consumer food products ready for retail distribution",
  },
];

export const stories: CustomerStory[] = [
  {
    slug: "dog-sauce",
    name: "Dakota Sheets",
    title: "Founder",
    company: "DogSauce",
    quote:
      "When Walmart calls with an expansion like this, you don’t say no. Bridge makes it possible to fill the orders without giving up equity.",
    result: "3,000+",
    resultLabel: "Walmart stores",
    financingType: "Production financing",
    role: "Bridge Direct Lending",
    image: "/images/wins/dog-sauce.png",
    imageAlt: "DogSauce products on a Walmart shelf",
    summary:
      "Production capital helped DogSauce fulfill a national retail expansion while preserving cash and ownership.",
  },
  {
    slug: "triumph-systems",
    name: "Jared Ogden",
    title: "Founder and CEO",
    company: "Triumph Systems",
    quote:
      "We needed financing that matched the scale and timing of our Walmart launch. Bridge was the working capital we needed to move forward with confidence.",
    result: "$2.4M",
    resultLabel: "Order funded",
    financingType: "Production financing",
    role: "Bridge Direct Lending",
    image: "/stories/triumph-hero-brand.png",
    imageAlt: "Triumph Systems consumer products",
    summary:
      "Bridge provided production financing aligned to the timing and scale of Triumph Systems’ retail launch.",
  },
];

export const paths: FinancingPath[] = [
  {
    slug: "hotel-financing",
    shortName: "Hotels",
    title: "Hotel Financing",
    eyebrow: "For owners and developers",
    description:
      "Direct lending for new construction and PIPs. Expert-led financing execution for acquisitions, refinancing, and other hotel needs.",
    heroImage: "/images/two-doors/1f8217b8-4668-4789-b359-dfe0461e6373.png",
    heroAlt: "Hotel financing opportunity",
    recentResult: results[0]!,
    products: [
      {
        title: "New construction",
        description:
          "Senior construction financing for qualified ground-up hotel developments.",
      },
      {
        title: "PIP and renovation",
        description:
          "Capital for brand-mandated improvements, renovations, and repositioning.",
      },
      {
        title: "Acquisition and refinance",
        description:
          "Expert-led capital execution for acquisitions, refinancing, and cash-out needs.",
      },
    ],
    eligibility: [
      "Experienced hotel owners and developers",
      "Branded and qualified independent properties",
      "Projects with a clear capital plan and supporting documentation",
    ],
    faqs: [
      {
        question: "Does Bridge provide the financing directly?",
        answer:
          "Bridge directly lends for select new-construction and PIP transactions. For other hotel needs, Bridge may structure and secure financing. The applicable role is stated clearly for every transaction.",
      },
      {
        question: "What information should I have ready?",
        answer:
          "Project details, ownership experience, sources and uses, property financials, and available brand or franchise documentation help the team evaluate the request.",
      },
      {
        question: "Is financing guaranteed?",
        answer:
          "No. All financing is subject to application, credit review, underwriting, approvals, and definitive documentation.",
      },
    ],
  },
  {
    slug: "consumer-brands",
    shortName: "Consumer brands",
    title: "Consumer Brand Financing",
    eyebrow: "For brands scaling into retail",
    description:
      "Direct financing for inventory, confirmed orders, receivables, working capital, and acquisitions—built around the realities of retail growth.",
    heroImage: "/images/two-doors/d48e5ee5-1662-4de3-8727-773851c125d8.png",
    heroAlt: "Consumer brand financing opportunity",
    recentResult: results[3]!,
    products: [
      {
        title: "Production and inventory",
        description:
          "Fund the cost of producing goods for confirmed retail demand.",
      },
      {
        title: "Orders and receivables",
        description:
          "Match capital to the timing between buyer commitment, delivery, and retailer payment.",
      },
      {
        title: "Working capital",
        description:
          "Flexible capital for brands managing growth, launches, and operating needs.",
      },
    ],
    eligibility: [
      "US-based consumer businesses",
      "Active or emerging relationships with major retailers",
      "Clear production costs, demand, and financial documentation",
    ],
    faqs: [
      {
        question: "How does production financing work?",
        answer:
          "Bridge evaluates the brand and retail demand, establishes a facility when approved, and funds eligible production draws. Repayment can align with retailer remittance.",
      },
      {
        question: "Do I need to give up equity?",
        answer:
          "Bridge financing is debt capital, so it does not require selling ownership in your company. Final structure and terms are subject to underwriting.",
      },
      {
        question: "How quickly can I receive terms?",
        answer:
          "Most complete production-financing submissions can receive indicative terms quickly, but timing varies with the request and documentation.",
      },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Opportunity",
    description: "A plan to grow, improve or acquire.",
  },
  {
    number: 2,
    title: "Financing Path",
    description: "Bridge evaluates, structures and provides solutions.",
  },
  {
    number: 3,
    title: "Funded Progress",
    description: "Capital deployed. Business moving forward.",
  },
];

export const proofPoints: ProofPoint[] = [
  { value: "$2.5B+", label: "Capital provided and secured" },
  { value: "1,000+", label: "Transactions completed" },
  { value: "24", label: "Average days to funding" },
  { value: "96%", label: "Repeat or referral relationships" },
];

export function getPath(slug: FinancingPath["slug"]) {
  return paths.find((path) => path.slug === slug)!;
}

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
