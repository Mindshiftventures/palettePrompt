import { create } from "zustand";
import type { WizardStore, PageType, PreviewViewport, LayoutId, DensityLevel, RadiusToken, ShadowToken, WizardState } from "@/types";
import { styles } from "@/data/styles";
import { colorThemes } from "@/data/colors";
import { fontPairings } from "@/data/typography";

const initialState: WizardState = {
  currentStep: 0,
  pageType: "landing",
  previewViewport: "desktop",
  styleId: "neo-brutalist",
  colorThemeId: "nb-acid",
  customBrandColor: null,
  fontPairingId: "space-inter",
  layoutId: "hero-stacked",
  density: "standard",
  borderRadius: "none",
  shadowStyle: "hard",
  effects: {
    grain: 0,
    blur: 0,
    glow: 0,
    gradient: 0,
  },
};

export const useWizardStore = create<WizardStore>((set) => ({
  ...initialState,

  setStep: (step: number) => set({ currentStep: step }),
  setPageType: (type: PageType) => set({ pageType: type }),
  setPreviewViewport: (viewport: PreviewViewport) => set({ previewViewport: viewport }),
  setStyleId: (id: string) => set({ styleId: id }),
  setColorThemeId: (id: string) => set({ colorThemeId: id }),
  setCustomBrandColor: (color: string | null) => set({ customBrandColor: color }),
  setFontPairingId: (id: string) => set({ fontPairingId: id }),
  setLayoutId: (id: LayoutId) => set({ layoutId: id }),
  setDensity: (density: DensityLevel) => set({ density }),
  setBorderRadius: (radius: RadiusToken) => set({ borderRadius: radius }),
  setShadowStyle: (shadow: ShadowToken) => set({ shadowStyle: shadow }),
  setEffect: (effect, value) =>
    set((state) => ({
      effects: { ...state.effects, [effect]: value },
    })),
  applyStylePreset: (styleId: string) => {
    const style = styles.find((s) => s.id === styleId);
    if (!style) return;
    set({
      styleId: style.id,
      colorThemeId: style.defaults.colorThemeId,
      customBrandColor: null,
      fontPairingId: style.defaults.fontPairingId,
      layoutId: style.defaults.layoutId,
      density: style.defaults.density,
      borderRadius: style.defaults.borderRadius,
      shadowStyle: style.defaults.shadowStyle,
      effects: {
        grain: style.defaults.effects.includes("grain") ? 60 : 0,
        blur: style.defaults.effects.includes("blur") ? 60 : 0,
        glow: style.defaults.effects.includes("glow") ? 60 : 0,
        gradient: style.defaults.effects.includes("gradient") ? 60 : 0,
      },
    });
  },
  randomiseAll: () => {
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    const densities: DensityLevel[] = ["condensed", "standard", "relaxed", "spacious"];
    const radii: RadiusToken[] = ["none", "subtle", "standard", "rounded", "pill"];
    const shadows: ShadowToken[] = ["none", "subtle", "elevated", "hard"];
    const layoutIds: LayoutId[] = ["hero-stacked", "bento-grid", "single-column", "sidebar-content", "full-width"];
    set({
      styleId: pick(styles).id,
      colorThemeId: pick(colorThemes).id,
      customBrandColor: null,
      fontPairingId: pick(fontPairings).id,
      layoutId: pick(layoutIds),
      density: pick(densities),
      borderRadius: pick(radii),
      shadowStyle: pick(shadows),
      effects: {
        grain: Math.random() > 0.5 ? 60 : 0,
        blur: Math.random() > 0.5 ? 60 : 0,
        glow: Math.random() > 0.5 ? 60 : 0,
        gradient: Math.random() > 0.5 ? 60 : 0,
      },
    });
  },
  reset: () => set(initialState),
}));
