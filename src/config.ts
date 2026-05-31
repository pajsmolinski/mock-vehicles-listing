export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  SIMILAR_VEHICLES_COUNT: 3,
  DELTA: 2,
};

export const FILTERS = {
  COLORS: [
    "Black",
    "White",
    "Silver",
    "Grey",
    "Dark Blue",
    "Sky Blue",
    "Red",
    "Green",
    "Graphite",
    "Brown",
    "Beige",
    "Pearl White",
  ],
  FUELS: ["Gasoline", "Diesel", "Electric", "Hybrid"],
  TYPES: ["Sedan", "SUV", "Hatchback", "Wagon", "Coupe", "Van"],
};

export const PREVIEW_THUMBNAILS: Record<string, string> = {
  Sedan:
    "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=1400&auto=format&fit=crop",
  SUV: "https://images.unsplash.com/photo-1566421740474-8456c6840c71?q=80&w=1400&auto=format&fit=crop",
  Hatchback:
    "https://images.unsplash.com/photo-1692305610636-f5157dbe6008?q=80&w=1400&auto=format&fit=crop",
  Wagon:
    "https://images.unsplash.com/photo-1762392914834-2c46b5b51f06?q=80&w=1400&auto=format&fit=crop",
  Coupe:
    "https://images.unsplash.com/photo-1539043776866-20389265e4da?q=80&w=1400&auto=format&fit=crop",
  Van: "https://images.unsplash.com/photo-1619389136796-ebf6a39d507c?q=80&w=1400&auto=format&fit=crop",
  default:
    "https://images.unsplash.com/photo-1520665680252-610662b7377a?q=80&w=1400&auto=format&fit=crop",
};
