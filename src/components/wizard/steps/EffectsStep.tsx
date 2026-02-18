"use client";

import { useWizardStore } from "@/store/wizard-store";
import type { DensityLevel, RadiusToken, ShadowToken } from "@/types";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Droplets, Sun, Blend } from "lucide-react";

const densityOptions: { id: DensityLevel; label: string; description: string }[] = [
  { id: "condensed", label: "Condensed", description: "Tight, compact spacing" },
  { id: "standard", label: "Standard", description: "Balanced, comfortable" },
  { id: "relaxed", label: "Relaxed", description: "Generous breathing room" },
  { id: "spacious", label: "Spacious", description: "Maximum whitespace" },
];

const radiusOptions: { id: RadiusToken; label: string; preview: string }[] = [
  { id: "none", label: "None", preview: "0px" },
  { id: "subtle", label: "Subtle", preview: "4px" },
  { id: "standard", label: "Standard", preview: "8px" },
  { id: "rounded", label: "Rounded", preview: "16px" },
  { id: "pill", label: "Pill", preview: "999px" },
];

const shadowOptions: { id: ShadowToken; label: string }[] = [
  { id: "none", label: "None" },
  { id: "subtle", label: "Subtle" },
  { id: "elevated", label: "Elevated" },
  { id: "hard", label: "Hard" },
];

const effectSliders = [
  { key: "grain" as const, label: "Grain Texture", icon: Sparkles, description: "Film grain overlay" },
  { key: "blur" as const, label: "Blur Effects", icon: Droplets, description: "Frosted glass and backdrop blur" },
  { key: "glow" as const, label: "Glow Effects", icon: Sun, description: "Neon glow and light bloom" },
  { key: "gradient" as const, label: "Gradient Overlays", icon: Blend, description: "Smooth color transitions" },
];

function intensityLabel(value: number): string {
  if (value === 0) return "Off";
  if (value <= 30) return "Subtle";
  if (value <= 70) return "Medium";
  return "Intense";
}

export function EffectsStep() {
  const density = useWizardStore((s) => s.density);
  const borderRadius = useWizardStore((s) => s.borderRadius);
  const shadowStyle = useWizardStore((s) => s.shadowStyle);
  const effects = useWizardStore((s) => s.effects);
  const setDensity = useWizardStore((s) => s.setDensity);
  const setBorderRadius = useWizardStore((s) => s.setBorderRadius);
  const setShadowStyle = useWizardStore((s) => s.setShadowStyle);
  const setEffect = useWizardStore((s) => s.setEffect);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-1">Spacing & Effects</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Fine-tune the density, corners, shadows, and visual effects.
        </p>
      </div>

      {/* Density */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Density
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {densityOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDensity(opt.id)}
              className={cn(
                "p-3 rounded-lg border-2 text-left transition-all",
                density === opt.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              )}
            >
              <p className="text-sm font-medium">{opt.label}</p>
              <p className="text-xs text-muted-foreground">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Border Radius
        </Label>
        <div className="flex gap-2">
          {radiusOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setBorderRadius(opt.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                borderRadius === opt.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              )}
            >
              <div
                className="w-8 h-8 bg-primary/20 border-2 border-primary/40"
                style={{ borderRadius: opt.preview }}
              />
              <p className="text-xs font-medium">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Shadow Style */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Shadow Style
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {shadowOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setShadowStyle(opt.id)}
              className={cn(
                "p-3 rounded-lg border-2 text-left transition-all",
                shadowStyle === opt.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              )}
            >
              <p className="text-sm font-medium">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Effect Intensity Sliders */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Visual Effects
        </Label>
        <div className="space-y-4">
          {effectSliders
            .filter(({ key }) => key !== "glow" || shadowStyle !== "none")
            .map(({ key, label, icon: Icon, description }) => (
            <div
              key={key}
              className="p-3 rounded-lg border border-border space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground min-w-[50px] text-right">
                  {intensityLabel(effects[key])}
                </span>
              </div>
              <Slider
                value={[effects[key]]}
                onValueChange={([v]) => setEffect(key, v)}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
