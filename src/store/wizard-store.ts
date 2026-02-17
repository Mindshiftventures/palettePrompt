import { create } from "zustand";
import type { WizardStore, PageType, LayoutId, DensityLevel, RadiusToken, ShadowToken, WizardState } from "@/types";

const initialState: WizardState = {
  currentStep: 0,
  pageType: "landing",
  styleId: "neo-brutalist",
  colorThemeId: "nb-acid",
  customBrandColor: null,
  fontPairingId: "space-inter",
  layoutId: "hero-stacked",
  density: "standard",
  borderRadius: "none",
  shadowStyle: "hard",
  effects: {
    grain: false,
    blur: false,
    glow: false,
    gradient: false,
  },
};

export const useWizardStore = create<WizardStore>((set) => ({
  ...initialState,

  setStep: (step: number) => set({ currentStep: step }),
  setPageType: (type: PageType) => set({ pageType: type }),
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
  reset: () => set(initialState),
}));
