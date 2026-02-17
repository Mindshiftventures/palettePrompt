"use client";

import { useWizardStore } from "@/store/wizard-store";
import { getThemesForStyle, generatePaletteFromBrand } from "@/data/colors";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Paintbrush } from "lucide-react";

export function ColorStep() {
  const styleId = useWizardStore((s) => s.styleId);
  const colorThemeId = useWizardStore((s) => s.colorThemeId);
  const customBrandColor = useWizardStore((s) => s.customBrandColor);
  const setColorThemeId = useWizardStore((s) => s.setColorThemeId);
  const setCustomBrandColor = useWizardStore((s) => s.setCustomBrandColor);
  const [brandInput, setBrandInput] = useState(customBrandColor || "#6366f1");

  const themes = getThemesForStyle(styleId);

  const handleBrandColor = (color: string) => {
    setBrandInput(color);
    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      setCustomBrandColor(color);
      setColorThemeId("custom-brand");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Choose your colors</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Pick a curated palette that matches your style, or generate one from your brand color.
      </p>

      {/* Pre-built palettes */}
      <div className="space-y-3 mb-8">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Curated Palettes
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setColorThemeId(theme.id);
                setCustomBrandColor(null);
              }}
              className={cn(
                "flex flex-col rounded-lg border-2 overflow-hidden text-left transition-all",
                colorThemeId === theme.id && !customBrandColor
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              )}
            >
              {/* Color swatches */}
              <div className="flex h-10">
                <div className="flex-1" style={{ backgroundColor: theme.colors.background }} />
                <div className="flex-1" style={{ backgroundColor: theme.colors.primary }} />
                <div className="flex-1" style={{ backgroundColor: theme.colors.secondary }} />
                <div className="flex-1" style={{ backgroundColor: theme.colors.accent }} />
              </div>
              <div className="p-2 bg-card">
                <p className="text-xs font-medium truncate">{theme.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Brand color picker */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Or generate from brand color
        </Label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={brandInput}
              onChange={(e) => handleBrandColor(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border-2 border-border"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Paintbrush className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={brandInput}
                onChange={(e) => handleBrandColor(e.target.value)}
                placeholder="#6366f1"
                className="flex-1 text-sm font-mono bg-muted px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {customBrandColor && (
              <p className="text-xs text-muted-foreground mt-1">
                Palette generated from your brand color
              </p>
            )}
          </div>
        </div>

        {/* Preview generated palette */}
        {customBrandColor && (() => {
          const generated = generatePaletteFromBrand(customBrandColor, false);
          return (
            <div className="flex h-8 rounded-lg overflow-hidden border border-border mt-2">
              <div className="flex-1" style={{ backgroundColor: generated.colors.background }} />
              <div className="flex-1" style={{ backgroundColor: generated.colors.primary }} />
              <div className="flex-1" style={{ backgroundColor: generated.colors.secondary }} />
              <div className="flex-1" style={{ backgroundColor: generated.colors.accent }} />
              <div className="flex-1" style={{ backgroundColor: generated.colors.muted }} />
            </div>
          );
        })()}
      </div>
    </div>
  );
}
