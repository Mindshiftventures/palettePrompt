"use client";

import { useWizardStore } from "@/store/wizard-store";
import { styles } from "@/data/styles";
import { StyleCard } from "../StyleCard";

export function StyleStep() {
  const styleId = useWizardStore((s) => s.styleId);
  const applyStylePreset = useWizardStore((s) => s.applyStylePreset);

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
            onClick={() => applyStylePreset(style.id)}
          />
        ))}
      </div>
    </div>
  );
}
