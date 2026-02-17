"use client";

import { useWizardStore } from "@/store/wizard-store";
import { styles } from "@/data/styles";
import { StyleCard } from "../StyleCard";

export function StyleStep() {
  const styleId = useWizardStore((s) => s.styleId);
  const setStyleId = useWizardStore((s) => s.setStyleId);
  const setColorThemeId = useWizardStore((s) => s.setColorThemeId);
  const setFontPairingId = useWizardStore((s) => s.setFontPairingId);
  const setLayoutId = useWizardStore((s) => s.setLayoutId);
  const setDensity = useWizardStore((s) => s.setDensity);
  const setBorderRadius = useWizardStore((s) => s.setBorderRadius);
  const setShadowStyle = useWizardStore((s) => s.setShadowStyle);
  const setEffect = useWizardStore((s) => s.setEffect);

  const handleSelectStyle = (id: string) => {
    const style = styles.find((s) => s.id === id);
    if (!style) return;

    setStyleId(id);
    // Apply style defaults
    setColorThemeId(style.defaults.colorThemeId);
    setFontPairingId(style.defaults.fontPairingId);
    setLayoutId(style.defaults.layoutId);
    setDensity(style.defaults.density);
    setBorderRadius(style.defaults.borderRadius);
    setShadowStyle(style.defaults.shadowStyle);

    // Reset all effects, then enable the style's defaults
    setEffect("grain", style.defaults.effects.includes("grain"));
    setEffect("blur", style.defaults.effects.includes("blur"));
    setEffect("glow", style.defaults.effects.includes("glow"));
    setEffect("gradient", style.defaults.effects.includes("gradient"));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Pick a visual style</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Each style comes with curated defaults for colors, fonts, and effects. You can customize everything in the next steps.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {styles.map((style) => (
          <StyleCard
            key={style.id}
            style={style}
            isSelected={styleId === style.id}
            onClick={() => handleSelectStyle(style.id)}
          />
        ))}
      </div>
    </div>
  );
}
