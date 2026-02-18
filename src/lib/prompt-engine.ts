import type { WizardState, ToolTarget } from "@/types";
import { getStyleById } from "@/data/styles";
import { getColorTheme, generatePaletteFromBrand } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { getLayout } from "@/data/layouts";
import { RADIUS_MAP, SHADOW_MAP, DENSITY_MAP } from "@/types";

const DENSITY_LABELS = {
  condensed: "compact with tight spacing",
  standard: "standard balanced spacing",
  relaxed: "generous spacing with breathing room",
  spacious: "very spacious with maximum whitespace",
} as const;

function buildRoleSection(tool: ToolTarget): string {
  const roles: Record<ToolTarget, string> = {
    v0: "You are an expert UI engineer specializing in React, Tailwind CSS, shadcn/ui, and Lucide Icons.",
    lovable: "You are a full-stack product designer and developer creating a polished, production-ready web application.",
    "figma-make": "You are a senior UI designer creating a pixel-perfect design in Figma.",
    "claude-code": "You are a senior frontend developer building with Next.js, Tailwind CSS, and TypeScript.",
    cursor: "You are an expert frontend developer building with React and Tailwind CSS.",
  };
  return roles[tool];
}

function buildContextSection(): string {
  return `The design should have a strong, cohesive visual identity. It should feel intentional and polished, not generic.`;
}

function buildStyleSection(state: WizardState): string {
  const style = getStyleById(state.styleId);
  if (!style) return "";

  return `**Visual Style: ${style.name}**\n${style.promptSegment}\n\nStyle keywords: ${style.promptKeywords.join(", ")}`;
}

function buildColorSection(state: WizardState): string {
  const colors = state.customBrandColor
    ? generatePaletteFromBrand(state.customBrandColor, false)
    : getColorTheme(state.colorThemeId);

  if (!colors) return "";

  return `**Color Palette:**
- Background: ${colors.colors.background}
- Foreground/Text: ${colors.colors.foreground}
- Primary: ${colors.colors.primary}
- Secondary: ${colors.colors.secondary}
- Accent: ${colors.colors.accent}
- Muted/Subtle: ${colors.colors.muted}
- Border: ${colors.colors.border}

Use these exact hex values. The ${colors.isDark ? "dark" : "light"} theme should feel cohesive — primary for CTAs and key actions, secondary for supporting elements, accent for highlights and interactive states.`;
}

function buildTypographySection(state: WizardState): string {
  const fonts = getFontPairing(state.fontPairingId);
  if (!fonts) return "";

  return `**Typography:**
- Headings: ${fonts.heading.family} (weight: ${fonts.heading.weight}) — use for all h1-h3 elements, hero text, and section titles
- Body: ${fonts.body.family} (weight: ${fonts.body.weight}) — use for paragraphs, descriptions, and UI text
- Import from Google Fonts: ${fonts.heading.family}${fonts.heading.family !== fonts.body.family ? ` and ${fonts.body.family}` : ""}`;
}

function buildLayoutSection(state: WizardState): string {
  const layout = getLayout(state.layoutId);
  if (!layout) return "";

  const layoutInstructions: Record<string, string> = {
    "hero-stacked":
      "Use a Hero + Stacked Sections layout: Start with a prominent hero section (large headline, subtext, CTA button), followed by vertically stacked content sections (features grid, testimonials, pricing, footer).",
    "bento-grid":
      "Use a Bento Grid layout: Organize content in a modular grid of cards with varying sizes (some 1x1, some 2x1, some 1x2). Cards should have uniform border radius and consistent gaps, inspired by Apple's product pages.",
    "single-column":
      "Use a Single Column layout: Center all content in a narrow column (max-width ~680px). This editorial style prioritizes readability with ample margins and clear visual hierarchy.",
    "sidebar-content":
      "Use a Sidebar + Content layout: Fixed left sidebar (240px) with navigation links, and a main content area on the right. The sidebar should have a subtle border or background differentiation.",
    "full-width":
      "Use a Full-width Sections layout: Each section spans the full viewport width edge-to-edge. Alternate between content sections with different background colors or treatments for visual rhythm.",
  };

  return `**Layout:**\n${layoutInstructions[state.layoutId] || layout.description}`;
}

function buildSpacingSection(state: WizardState): string {
  const radius = RADIUS_MAP[state.borderRadius];
  const shadow = SHADOW_MAP[state.shadowStyle];

  return `**Spacing & Visual Tokens:**
- Density: ${DENSITY_LABELS[state.density]}
- Border Radius: ${radius} (${state.borderRadius})
- Box Shadow: ${shadow === "none" ? "none" : shadow}
- Apply consistent spacing throughout — section padding, card gaps, and element margins should all reflect the ${state.density} density level.`;
}

function buildEffectsSection(state: WizardState): string {
  const effects: string[] = [];

  if (state.effects.grain)
    effects.push(
      "Apply a subtle grain/noise texture overlay across the page for a tactile, analog feel."
    );
  if (state.effects.blur)
    effects.push(
      "Use backdrop-blur and frosted glass effects on overlapping elements (cards, modals, navbars) for depth."
    );
  if (state.effects.glow)
    effects.push(
      "Add glow effects to primary buttons and interactive elements using colored box-shadows (e.g., `box-shadow: 0 0 20px primaryColor40`)."
    );
  if (state.effects.gradient)
    effects.push(
      "Apply gradient overlays and mesh gradient backgrounds for visual richness. Use radial gradients with the primary and accent colors."
    );

  if (effects.length === 0) return "";

  return `**Visual Effects:**\n${effects.map((e) => `- ${e}`).join("\n")}`;
}

function buildToolConstraints(tool: ToolTarget): string {
  const constraints: Record<ToolTarget, string> = {
    v0: `**Technical Requirements (v0):**
- Use Tailwind CSS utility classes for all styling — no custom CSS
- Use shadcn/ui components where applicable (Button, Card, Badge, etc.)
- Use Lucide React for all icons
- Ensure the component is a single React component that can be rendered directly
- Use responsive design with Tailwind breakpoints (sm:, md:, lg:)`,

    lovable: `**Technical Requirements (Lovable):**
- Describe the design in vivid, component-first language
- Focus on the user experience flow and visual hierarchy
- Mention specific UI patterns (e.g., "hero section with gradient background", "card grid with hover lift effect")
- Keep instructions modular — describe each section/component separately`,

    "figma-make": `**Technical Requirements (Figma Make):**
- ALL containers must use Auto-Layout with proper padding and spacing
- Use real data and realistic content — no placeholder text
- Specify exact dimensions, padding values, and gap sizes
- Colors should be specified as hex values
- Typography should include specific font sizes and weights`,

    "claude-code": `**Technical Requirements (Claude Code):**
- Build with Next.js App Router and TypeScript
- Use Tailwind CSS for styling with the exact color values specified
- Structure as proper React components with clear file organization
- Include responsive design considerations
- Use semantic HTML elements (main, section, nav, article, etc.)`,

    cursor: `**Technical Requirements (Cursor):**
- Use React functional components with TypeScript
- Apply Tailwind CSS classes for all styling
- Keep component code focused and well-organized
- Include hover states, transitions, and interactive elements
- Use responsive breakpoints for mobile/tablet/desktop`,
  };

  return constraints[tool];
}

function buildUserPlaceholder(): string {
  return `[REPLACE THIS: Describe what you want to build — e.g., "A SaaS landing page for a project management tool with pricing, features, and testimonials"]`;
}

export function generatePrompt(state: WizardState, tool: ToolTarget): string {
  const sections = [
    buildUserPlaceholder(),
    buildRoleSection(tool),
    buildContextSection(),
    buildStyleSection(state),
    buildColorSection(state),
    buildTypographySection(state),
    buildLayoutSection(state),
    buildSpacingSection(state),
    buildEffectsSection(state),
    buildToolConstraints(tool),
  ];

  return sections.filter(Boolean).join("\n\n");
}
