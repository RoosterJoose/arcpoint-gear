export const categories = [
  {
    name: "Hiking",
    slug: "hiking",
    description:
      "Daypacks, footwear, shells, trekking systems, hydration, and fast-moving mountain gear for exposed routes and long approaches.",
    accent: "Mountain Systems",
    focus: "Packs / Footwear / Shells",
  },
  {
    name: "Camping",
    slug: "camping",
    description:
      "Shelters, sleep systems, camp kitchens, lighting, storage, and basecamp equipment for nights where comfort still has to earn its weight.",
    accent: "Basecamp Lab",
    focus: "Shelters / Sleep / Light",
  },
  {
    name: "Fishing",
    slug: "fishing",
    description:
      "Rod systems, packs, waders, tackle storage, electronics, and weather-ready layers for moving cleanly around water.",
    accent: "Watercraft Kit",
    focus: "Waders / Packs / Electronics",
  },
  {
    name: "Hunting",
    slug: "hunting",
    description:
      "Layering systems, packs, optics, field tools, and quiet technical gear for long sits, mobile hunts, and rough weather windows.",
    accent: "Field Discipline",
    focus: "Layers / Optics / Packs",
  },
  {
    name: "Fitness",
    slug: "fitness",
    description:
      "Training shoes, wearables, recovery tools, gym bags, and performance essentials for strength, endurance, and daily readiness.",
    accent: "Training Load",
    focus: "Shoes / Wearables / Recovery",
  },
  {
    name: "Golf",
    slug: "golf",
    description:
      "Rangefinders, bags, shoes, apparel, launch monitors, and weather-ready course gear for players who care about repeatable systems.",
    accent: "Course Systems",
    focus: "Bags / Rangefinders / Shoes",
  },
  {
    name: "Photography",
    slug: "photography",
    description:
      "Camera bags, travel tripods, carry systems, weather protection, and field workflow tools for shoots where the approach is part of the job.",
    accent: "Image Field Kit",
    focus: "Bags / Tripods / Protection",
  },
  {
    name: "Performance Gear",
    slug: "performance-gear",
    description:
      "Cross-category equipment built around speed, durability, mobility, recovery, and the small details that compound over repeated use.",
    accent: "Performance Index",
    focus: "Speed / Durability / Mobility",
  },
];

export const getCategory = (slug) => categories.find((category) => category.slug === slug);
