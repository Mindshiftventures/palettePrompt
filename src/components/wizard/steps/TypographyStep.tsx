"use client";

import { useEffect } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { fontPairings } from "@/data/typography";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import type { FontCategory } from "@/types";

const categories: { id: FontCategory; label: string }[] = [
  { id: "sans", label: "Sans-Serif" },
  { id: "serif", label: "Serif" },
  { id: "mono", label: "Monospace" },
  { id: "display", label: "Display" },
  { id: "rounded", label: "Rounded" },
];

// Collect all unique Google Font families with their weights for a single batch load
const allFontFamilies = (() => {
  const seen = new Set<string>();
  const families: string[] = [];
  for (const pairing of fontPairings) {
    const headingKey = `${pairing.heading.googleFontId}:wght@${pairing.heading.weight}`;
    const bodyKey = `${pairing.body.googleFontId}:wght@${pairing.body.weight}`;
    if (!seen.has(headingKey)) {
      seen.add(headingKey);
      families.push(`family=${pairing.heading.googleFontId}:wght@${pairing.heading.weight}`);
    }
    if (!seen.has(bodyKey)) {
      seen.add(bodyKey);
      families.push(`family=${pairing.body.googleFontId}:wght@${pairing.body.weight}`);
    }
  }
  return families;
})();

export function TypographyStep() {
  const fontPairingId = useWizardStore((s) => s.fontPairingId);
  const setFontPairingId = useWizardStore((s) => s.setFontPairingId);

  // Load all font pairings from Google Fonts in a single batched request
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${allFontFamilies.join("&")}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Choose typography</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Select a font pairing for headings and body text. Each pairing is curated for readability and aesthetic harmony.
      </p>

      {categories.map((cat) => {
        const pairings = fontPairings.filter((p) => p.category === cat.id);
        if (pairings.length === 0) return null;

        return (
          <div key={cat.id} className="mb-6">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
              {cat.label}
            </Label>
            <div className="space-y-2">
              {pairings.map((pairing) => (
                <button
                  key={pairing.id}
                  onClick={() => setFontPairingId(pairing.id)}
                  className={cn(
                    "flex flex-col w-full p-3 rounded-lg border-2 text-left transition-all",
                    fontPairingId === pairing.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold">{pairing.name}</span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-lg font-bold" style={{ fontFamily: `'${pairing.heading.family}', sans-serif` }}>
                      {pairing.heading.family}
                    </span>
                    <span className="text-xs text-muted-foreground">+</span>
                    <span className="text-sm" style={{ fontFamily: `'${pairing.body.family}', sans-serif` }}>
                      {pairing.body.family}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
