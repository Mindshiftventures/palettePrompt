export type PageType = "landing" | "ecommerce" | "blog";

export type DensityLevel = "condensed" | "standard" | "relaxed" | "spacious";
export type RadiusToken = "none" | "subtle" | "standard" | "rounded" | "pill";
export type ShadowToken = "none" | "subtle" | "elevated" | "hard";

export type EffectToggle = "grain" | "blur" | "glow" | "gradient";

export type ToolTarget = "v0" | "lovable" | "figma-make" | "claude-code" | "cursor";

export type PreviewViewport = "desktop" | "mobile";

export type FontCategory = "sans" | "serif" | "mono" | "display" | "rounded";

export type LayoutId =
  | "hero-stacked"
  | "bento-grid"
  | "single-column"
  | "sidebar-content"
  | "full-width";

export interface StyleDefinition {
  id: string;
  name: string;
  description: string;
  vibe: string[];
  defaults: {
    colorThemeId: string;
    fontPairingId: string;
    layoutId: LayoutId;
    density: DensityLevel;
    borderRadius: RadiusToken;
    shadowStyle: ShadowToken;
    effects: EffectToggle[];
  };
  tokens: {
    borderWidth: string;
    borderColor: string;
    shadowValue: string;
    radiusValue: string;
    bgBase: string;
    textPrimary: string;
    textSecondary: string;
  };
  promptKeywords: string[];
  promptSegment: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  styleIds: string[];
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
  };
  isDark: boolean;
}

export interface FontPairing {
  id: string;
  name: string;
  heading: {
    family: string;
    weight: number;
    googleFontId: string;
  };
  body: {
    family: string;
    weight: number;
    googleFontId: string;
  };
  category: FontCategory;
}

export interface LayoutOption {
  id: LayoutId;
  name: string;
  description: string;
  icon: string;
}

export interface WizardState {
  currentStep: number;
  pageType: PageType;
  previewViewport: PreviewViewport;
  styleId: string;
  colorThemeId: string;
  customBrandColor: string | null;
  fontPairingId: string;
  layoutId: LayoutId;
  density: DensityLevel;
  borderRadius: RadiusToken;
  shadowStyle: ShadowToken;
  effects: {
    grain: boolean;
    blur: boolean;
    glow: boolean;
    gradient: boolean;
  };
}

export interface WizardActions {
  setStep: (step: number) => void;
  setPageType: (type: PageType) => void;
  setPreviewViewport: (viewport: PreviewViewport) => void;
  setStyleId: (id: string) => void;
  setColorThemeId: (id: string) => void;
  setCustomBrandColor: (color: string | null) => void;
  setFontPairingId: (id: string) => void;
  setLayoutId: (id: LayoutId) => void;
  setDensity: (density: DensityLevel) => void;
  setBorderRadius: (radius: RadiusToken) => void;
  setShadowStyle: (shadow: ShadowToken) => void;
  setEffect: (effect: keyof WizardState["effects"], value: boolean) => void;
  reset: () => void;
}

export type WizardStore = WizardState & WizardActions;

export const DENSITY_MAP: Record<DensityLevel, { section: string; element: string }> = {
  condensed: { section: "py-8", element: "p-3 gap-3" },
  standard: { section: "py-16", element: "p-5 gap-5" },
  relaxed: { section: "py-24", element: "p-7 gap-7" },
  spacious: { section: "py-32", element: "p-10 gap-10" },
};

export const RADIUS_MAP: Record<RadiusToken, string> = {
  none: "0px",
  subtle: "4px",
  standard: "8px",
  rounded: "16px",
  pill: "999px",
};

export const SHADOW_MAP: Record<ShadowToken, string> = {
  none: "none",
  subtle: "0 1px 3px rgba(0,0,0,0.1)",
  elevated: "0 4px 20px rgba(0,0,0,0.15)",
  hard: "4px 4px 0px rgba(0,0,0,1)",
};

export const WIZARD_STEPS = [
  { id: 0, label: "Page Type", icon: "Layout" },
  { id: 1, label: "Style", icon: "Palette" },
  { id: 2, label: "Colors", icon: "Paintbrush" },
  { id: 3, label: "Typography", icon: "Type" },
  { id: 4, label: "Layout", icon: "LayoutGrid" },
  { id: 5, label: "Effects", icon: "Sparkles" },
] as const;
