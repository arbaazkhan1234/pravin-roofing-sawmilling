// Central content config — pulled directly from the client's research brief and
// copy draft (see the Obsidian vault: 03 Strategy/Website Copy - Draft.md and
// Website Technical & Design Brief.md). Edit copy here rather than in components.

export const business = {
  legalName: "Pravin Roofing and Sawmilling Company Ltd.",
  shortName: "Pravin",
  address: "#57 Katwaroo Branch Trace, Penal, Saint Patrick, Trinidad and Tobago",
  phone: "+1 868-378-5212",
  phoneHref: "tel:+18683785212",
  whatsappHref: "https://wa.me/18683785212",
  hours: "Monday–Friday, 7:00 AM – 4:00 PM",
  hoursClosed: "Closed Saturday & Sunday",
  mapEmbedSrc:
    "https://www.google.com/maps?q=57+Katwaroo+Branch+Trace,+Penal,+Trinidad+and+Tobago&output=embed",
  // Only social channel confirmed by research — see 01 Research/Location & Contact Info.md.
  // No confirmed Instagram/TikTok/X handles; do not add placeholder links for those.
  facebookHref:
    "https://www.facebook.com/people/Pravin-Roofing-and-Sawmilling-Company-Ltd/100085634141991/",
};

export const nav = [
  { label: "Our Craft", href: "#craft" },
  { label: "What We Build", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "The Wood", href: "#wood" },
  { label: "How It Works", href: "#process" },
  { label: "Why Pravin", href: "#why" },
  { label: "Get In Touch", href: "#contact" },
];

export const footer = {
  tagline: "Solid Wood. Built to Last.",
  wordmark: "PRAVIN",
  menu: nav,
  socials: [
    { label: "Facebook", href: business.facebookHref },
    { label: "WhatsApp", href: business.whatsappHref },
  ],
  resources: [
    { label: "View Our Doors", href: "#products" },
    { label: "Wood We Use", href: "#wood" },
  ],
  ctaLabel: "Get a Quote",
  ctaHref: "#contact",
};

// Client gave 3 hero headline options — first is picked as default (safest claim,
// doesn't imply on-site milling as strongly as options 2 & 3). Easy to swap.
export const hero = {
  eyebrow: "Est. in Penal, Trinidad",
  headlineOptions: [
    "Doors, Built From the Ground Up.",
    "From the Sawmill to Your Doorway.",
    "Solid Wood. Cut, Shaped, and Finished in Penal.",
  ],
  headline: "Doors, Built From the Ground Up.",
  subcopy:
    "Imported hardwoods, custom sizing, and doors built to hold up in Trinidad's climate — from a family business rooted in Penal.",
  ctaLabel: "Get a Quote",
  ctaHref: "#contact",
  secondaryCtaLabel: "View Our Doors",
  secondaryCtaHref: "#products",
  slides: [
    { src: "/images/hero/door-lineup-studio.jpg", alt: "Five solid wood door styles lined up in a studio — panel, shaker, slatted, glass-lite, and stained-glass oval designs" },
    { src: "/images/hero/door-catalog-grid.jpg", alt: "Four wooden door styles shown side by side — six-panel, plank, rich mahogany panel, and stained-glass oval" },
    { src: "/images/hero/walnut-door-hallway.jpg", alt: "Open walnut two-panel interior door in a sunlit hallway" },
    { src: "/images/hero/cottage-entrance-door.jpg", alt: "Wooden front door with an oval glass insert on a tropical cottage porch" },
  ],
};

export const about = {
  eyebrow: "Our Craft",
  paragraph:
    "Pravin Roofing and Sawmilling Company Ltd. has spent years supplying Trinidad with solid wood doors, custom lumber, and live-edge pieces built to last. We import quality hardwood from Brazil and mill and finish it ourselves — pitch pine, cedar, teak, mahogany, greenheart, and more — so every door leaving our yard in Penal is built from real wood, not shortcuts. Whether it's a standard interior door or a custom size for a job that doesn't fit the catalog, we build it here.",
  image: { src: "/images/about/workshop.jpg", alt: "Hands shaping solid wood with a chisel" },
};

export const productCategories = [
  {
    id: "solid-wood-doors",
    name: "Solid Wood Doors",
    description: "Panel doors in teak and pine, built solid, not hollow.",
    image: "/images/products/solid-wood-doors.jpg",
  },
  {
    id: "barn-doors",
    name: "Barn Doors",
    description: "Z-brace and X-brace styles, natural or charred finishes.",
    image: "/images/products/barn-doors.jpg",
  },
  {
    id: "glass-lite-french-doors",
    name: "Glass-Lite & French Doors",
    description: "Doors with glass panes and windows, for light and openness.",
    image: "/images/products/glass-french-doors.jpg",
  },
  {
    id: "interior-hdf-doors",
    name: "Interior & HDF Doors",
    description: "White and painted panel doors, ready for any room.",
    image: "/images/products/interior-hdf-doors.jpg",
  },
  {
    id: "cupboard-cabinet-doors",
    name: "Cupboard & Cabinet Doors",
    description: "Built to size for kitchens, closets, and built-ins.",
    image: "/images/products/cupboard-cabinet-doors.jpg",
  },
  {
    id: "live-edge-slabs",
    name: "Live-Edge Slabs & Custom Tables",
    description: "Natural-edge slabs for tables, counters, and statement pieces.",
    image: "/images/products/live-edge-slabs.jpg",
  },
  {
    id: "lumber-supply",
    name: "Lumber Supply",
    description: "Raw stock — pitch pine, cedar, teak, greenheart, mahogany, olivier.",
    image: "/images/products/lumber-supply.jpg",
  },
];

export const gallery = [
  { src: "/images/gallery/gallery-1.jpg", caption: "Panel door — pitch pine", alt: "Wooden door frame detail" },
  { src: "/images/gallery/gallery-2.jpg", caption: "Entry door — teak", alt: "Wooden door on a building surrounded by greenery" },
  { src: "/images/gallery/gallery-3.jpg", caption: "Live-edge table — mahogany", alt: "Live edge wood table in a living room" },
  { src: "/images/gallery/gallery-4.jpg", caption: "Cabinet door — cedar", alt: "Wooden cabinet door with hinge detail" },
  { src: "/images/gallery/gallery-5.jpg", caption: "Rough stock — greenheart", alt: "Stack of wooden logs" },
  { src: "/images/gallery/gallery-6.jpg", caption: "Grain detail — olivier", alt: "Close-up wood grain surface" },
];

// Two species (appamat, olivier) still need client-written one-liners — see vault.
export const woodSpecies = [
  {
    id: "teak",
    name: "Teak",
    description: "Dense and weather-resistant, with a rich golden grain that darkens beautifully over time.",
    image: "/images/wood/teak.jpg",
  },
  {
    id: "cedar",
    name: "Cedar",
    description: "Light, aromatic, and naturally resistant to rot and insects.",
    image: "/images/wood/cedar.jpg",
  },
  {
    id: "mahogany",
    name: "Mahogany",
    description: "A reddish-brown hardwood prized for its strength and classic finish.",
    image: "/images/wood/mahogany.jpg",
  },
  {
    id: "pitch-pine",
    name: "Pitch Pine",
    description: "Strong, straight-grained, and a dependable choice for structural work.",
    image: "/images/wood/pitch-pine.jpg",
  },
  {
    id: "greenheart",
    name: "Greenheart",
    description: "One of the hardest, most durable woods available — built for the long haul.",
    image: "/images/wood/greenheart.jpg",
  },
  {
    id: "appamat",
    name: "Appamat",
    description: "A local Trinidad hardwood — description to confirm with Pravin directly.",
    image: "/images/wood/appamat.jpg",
    needsClientInput: true,
  },
  {
    id: "olivier",
    name: "Olivier",
    description: "A local Trinidad hardwood — description to confirm with Pravin directly.",
    image: "/images/wood/olivier.jpg",
    needsClientInput: true,
  },
];

export const process = [
  { step: "01", title: "Tell Us What You Need", description: "Bring your size, style, and wood preference." },
  { step: "02", title: "Pick Your Wood", description: "Choose from pitch pine, cedar, teak, mahogany, greenheart, and more." },
  { step: "03", title: "We Build It", description: "Cut, shaped, and finished to your exact specification." },
  { step: "04", title: "Pick Up or Delivery", description: "Ready when you are." },
];

// Client's own guidance: pick the 3 safest to claim. "Milled and Finished In-House"
// is now confirmed (see vault); "Stocked and Ready" still awaits confirmation but
// is plausible given confirmed container-scale imports — kept in, flagged below.
export const trustPoints = [
  {
    title: "Real Hardwood, Not Veneer",
    description: "Every door is built from solid, imported wood — pitch pine, teak, mahogany, and more.",
  },
  {
    title: "Custom Sizes, No Problem",
    description: "Standard door won't fit? We cut and build to the exact size your job needs.",
  },
  {
    title: "Milled and Finished In-House",
    description: "From raw lumber to a finished door, the work happens right here in Penal.",
  },
  {
    title: "Stocked and Ready",
    description: "Regular imports keep our yard stocked, so orders don't sit waiting on materials.",
  },
];

export const productInterestOptions = [
  "Solid Wood Doors",
  "Barn Doors",
  "Glass-Lite & French Doors",
  "Interior & HDF Doors",
  "Cupboard & Cabinet Doors",
  "Live-Edge Slabs & Custom Tables",
  "Lumber Supply",
  "Not sure yet",
];
