export const categories = [
  {
    name: "Hiking",
    slug: "hiking",
    description:
      "Daypacks, footwear, shells, trekking systems, hydration, and fast-moving mountain gear.",
    accent: "Mountain Systems",
  },
  {
    name: "Camping",
    slug: "camping",
    description:
      "Shelters, sleep systems, camp kitchens, lighting, storage, and basecamp equipment.",
    accent: "Basecamp Lab",
  },
  {
    name: "Fishing",
    slug: "fishing",
    description:
      "Rod systems, packs, waders, tackle storage, electronics, and weather-ready layers.",
    accent: "Watercraft Kit",
  },
  {
    name: "Hunting",
    slug: "hunting",
    description:
      "Layering systems, packs, optics, field tools, and quiet technical gear for long sits.",
    accent: "Field Discipline",
  },
  {
    name: "Fitness",
    slug: "fitness",
    description:
      "Training shoes, wearables, recovery tools, gym bags, and performance essentials.",
    accent: "Training Load",
  },
  {
    name: "Golf",
    slug: "golf",
    description:
      "Rangefinders, bags, shoes, apparel, launch monitors, and weather-ready course gear.",
    accent: "Course Systems",
  },
  {
    name: "Photography",
    slug: "photography",
    description:
      "Camera bags, travel tripods, carry systems, weather protection, and field workflow tools.",
    accent: "Image Field Kit",
  },
  {
    name: "Performance Gear",
    slug: "performance-gear",
    description:
      "Cross-category equipment built around speed, durability, mobility, and recovery.",
    accent: "Performance Index",
  },
];

export const getCategory = (slug) => categories.find((category) => category.slug === slug);
