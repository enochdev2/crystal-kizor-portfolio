export type Initiative = {
  name: string;
  eyebrow: string;
  description: string;
  audience: string;
  href: string;
  cta: string;
  external?: boolean;
  intent?: string;
};

export type InitiativeGroup = {
  key: "build" | "knowledge" | "impact";
  label: string;
  title: string;
  description: string;
  initiatives: Initiative[];
};

export const studioCoka: Initiative = {
  name: "Studio COKA",
  eyebrow: "Architecture · Interiors · Design + Build",
  description:
    "Crystal's architecture practice creates climate-responsive, context-led spaces from first sketch through delivery.",
  audience: "For clients planning homes, hospitality, commercial or civic projects.",
  href: "https://studiocoka.com/",
  cta: "Visit Studio COKA",
  external: true,
};

export const initiativeGroups: InitiativeGroup[] = [
  {
    key: "build",
    label: "Build",
    title: "Places and products",
    description:
      "Architecture and objects that respond to climate, context, material and everyday use.",
    initiatives: [
      {
        name: "ELEvated",
        eyebrow: "Furniture & Product Design",
        description:
          "Functional contemporary products rooted in African context, materials and ideas.",
        audience: "For people and spaces looking for useful, considered objects.",
        href: "#enquire",
        cta: "Discuss a collaboration",
        intent: "Partnership / collaboration",
      },
    ],
  },
  {
    key: "knowledge",
    label: "Learn & share",
    title: "Knowledge and influence",
    description:
      "Education, media, research and speaking that turn practice into useful knowledge for a wider audience.",
    initiatives: [
      {
        name: "The Effective Architect",
        eyebrow: "Architecture Education & Media",
        description:
          "Practical learning and career development for architects and built-environment professionals.",
        audience: "For professionals building stronger skills, careers and practices.",
        href: "#enquire",
        cta: "Explore education opportunities",
        intent: "Education / media",
      },
      {
        name: "Speaking, Research & Writing",
        eyebrow: "Ideas & Influence",
        description:
          "Conversations and ideas across architecture, African cities, climate-responsive design and entrepreneurship.",
        audience: "For organisations seeking informed perspectives grounded in practice.",
        href: "#enquire",
        cta: "Invite Crystal to speak",
        intent: "Speaking engagement",
      },
    ],
  },
  {
    key: "impact",
    label: "Impact",
    title: "Opportunity and community",
    description:
      "Initiatives that extend beyond commissioned design into education, identity, purpose and human development.",
    initiatives: [
      {
        name: "AKO Alliance",
        eyebrow: "Education & Opportunity",
        description:
          "An initiative focused on expanding access to education and opportunity for children and young people.",
        audience: "For partners who want to support access, learning and long-term opportunity.",
        href: "#enquire",
        cta: "Discuss a partnership",
        intent: "Partnership / collaboration",
      },
      {
        name: "Alive and Free",
        eyebrow: "Faith & Community",
        description:
          "A Christian youth movement centred on truth, healing, freedom, identity, purpose and life in Christ.",
        audience: "For young people seeking faith-rooted community, growth and purpose.",
        href: "#enquire",
        cta: "Connect with the initiative",
        intent: "General enquiry",
      },
    ],
  },
];

export const visitorPaths = [
  {
    label: "Start a design project",
    detail: "Architecture, interiors or design + build",
    href: "#enquire",
    intent: "Architecture / interior project",
  },
  {
    label: "Invite Crystal to speak",
    detail: "Design, cities, climate and entrepreneurship",
    href: "#enquire",
    intent: "Speaking engagement",
  },
  {
    label: "Collaborate",
    detail: "Products, education, media or partnerships",
    href: "#enquire",
    intent: "Partnership / collaboration",
  },
  {
    label: "Explore Studio COKA",
    detail: "Climate-responsive architecture and design",
    href: "https://studiocoka.com/",
    intent: "External Studio COKA visit",
    external: true,
  },
];

export const proofPoints = [
  {
    value: "95%",
    label: "diesel reduction",
    detail: "on Studio COKA's benchmark off-grid hospital project",
  },
  {
    value: "100%",
    label: "solar energy",
    detail: "in Studio COKA's flagship healthcare build",
  },
  {
    value: "7",
    label: "project stages",
    detail: "handled end-to-end by Studio COKA",
  },
];
