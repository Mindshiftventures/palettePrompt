import type { FontPairing } from "@/types";

export const fontPairings: FontPairing[] = [
  {
    id: "space-inter",
    name: "Technical Mono",
    heading: { family: "Space Mono", weight: 700, googleFontId: "Space+Mono" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "mono",
  },
  {
    id: "manrope-inter",
    name: "Clean Modern",
    heading: { family: "Manrope", weight: 700, googleFontId: "Manrope" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "sans",
  },
  {
    id: "helvetica-inter",
    name: "Swiss Classic",
    heading: { family: "Inter", weight: 800, googleFontId: "Inter" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "sans",
  },
  {
    id: "playfair-raleway",
    name: "Editorial Elegant",
    heading: {
      family: "Playfair Display",
      weight: 700,
      googleFontId: "Playfair+Display",
    },
    body: { family: "Raleway", weight: 400, googleFontId: "Raleway" },
    category: "serif",
  },
  {
    id: "quicksand-nunito",
    name: "Friendly Rounded",
    heading: { family: "Quicksand", weight: 700, googleFontId: "Quicksand" },
    body: { family: "Nunito", weight: 400, googleFontId: "Nunito" },
    category: "rounded",
  },
  {
    id: "space-mono-inter",
    name: "Hacker Mono",
    heading: { family: "Space Mono", weight: 700, googleFontId: "Space+Mono" },
    body: { family: "Space Mono", weight: 400, googleFontId: "Space+Mono" },
    category: "mono",
  },
  {
    id: "sf-inter",
    name: "Apple Clean",
    heading: { family: "Inter", weight: 600, googleFontId: "Inter" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "sans",
  },
  {
    id: "inter-inter",
    name: "Universal Sans",
    heading: { family: "Inter", weight: 700, googleFontId: "Inter" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "sans",
  },
  {
    id: "orbitron-inter",
    name: "Retro Future",
    heading: { family: "Orbitron", weight: 700, googleFontId: "Orbitron" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "display",
  },
  {
    id: "clash-inter",
    name: "Bold Display",
    heading: { family: "Sora", weight: 800, googleFontId: "Sora" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "display",
  },
  {
    id: "lora-source",
    name: "Warm Serif",
    heading: { family: "Lora", weight: 700, googleFontId: "Lora" },
    body: {
      family: "Source Sans 3",
      weight: 400,
      googleFontId: "Source+Sans+3",
    },
    category: "serif",
  },
  {
    id: "caveat-inter",
    name: "Handwritten Mix",
    heading: { family: "Caveat", weight: 700, googleFontId: "Caveat" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "display",
  },
  {
    id: "poppins-inter",
    name: "Geometric Modern",
    heading: { family: "Poppins", weight: 700, googleFontId: "Poppins" },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "sans",
  },
  {
    id: "playfair-source",
    name: "Classic Editorial",
    heading: {
      family: "Playfair Display",
      weight: 700,
      googleFontId: "Playfair+Display",
    },
    body: {
      family: "Source Serif 4",
      weight: 400,
      googleFontId: "Source+Serif+4",
    },
    category: "serif",
  },
  {
    id: "instrument-inter",
    name: "Refined Sans",
    heading: {
      family: "Instrument Sans",
      weight: 700,
      googleFontId: "Instrument+Sans",
    },
    body: { family: "Inter", weight: 400, googleFontId: "Inter" },
    category: "sans",
  },
  {
    id: "cormorant-lato",
    name: "Luxury Serif",
    heading: {
      family: "Cormorant Garamond",
      weight: 700,
      googleFontId: "Cormorant+Garamond",
    },
    body: { family: "Lato", weight: 400, googleFontId: "Lato" },
    category: "serif",
  },
  {
    id: "fira-code-mono",
    name: "Developer Mono",
    heading: { family: "Fira Code", weight: 700, googleFontId: "Fira+Code" },
    body: { family: "Fira Code", weight: 400, googleFontId: "Fira+Code" },
    category: "mono",
  },
];

export function getFontPairing(id: string): FontPairing | undefined {
  return fontPairings.find((pairing) => pairing.id === id);
}
