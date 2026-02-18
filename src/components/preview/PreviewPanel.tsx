"use client";

import { useWizardStore } from "@/store/wizard-store";
import { getStyleById } from "@/data/styles";
import { getColorTheme, generatePaletteFromBrand } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { RADIUS_MAP, SHADOW_MAP } from "@/types";
import { LandingPreview } from "./templates/LandingPreview";
import { EcommercePreview } from "./templates/EcommercePreview";
import { BlogPreview } from "./templates/BlogPreview";
import { useEffect, useMemo, useRef } from "react";

export function PreviewPanel() {
  const state = useWizardStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const style = getStyleById(state.styleId);
  const colorTheme = state.customBrandColor
    ? generatePaletteFromBrand(state.customBrandColor, style?.tokens.bgBase === "#000000" || style?.tokens.bgBase === "#0a0a0a" || style?.tokens.bgBase === "#0d1117" || style?.tokens.bgBase === "#0f0f23" || style?.tokens.bgBase === "#1a1a2e" || style?.tokens.bgBase === "#0c0c0c")
    : getColorTheme(state.colorThemeId);
  const fontPairing = getFontPairing(state.fontPairingId);

  const colors = colorTheme?.colors ?? {
    background: "#ffffff",
    foreground: "#000000",
    primary: "#6366f1",
    secondary: "#a855f7",
    accent: "#ec4899",
    muted: "#f1f5f9",
    border: "#e2e8f0",
  };

  const radiusValue = RADIUS_MAP[state.borderRadius];
  const shadowValue = SHADOW_MAP[state.shadowStyle];

  // Load Google Fonts dynamically
  useEffect(() => {
    if (!fontPairing) return;

    const families = [
      `${fontPairing.heading.googleFontId}:wght@${fontPairing.heading.weight}`,
      `${fontPairing.body.googleFontId}:wght@${fontPairing.body.weight}`,
    ];

    const uniqueFamilies = [...new Set(families)];
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${uniqueFamilies
      .map((f) => `family=${f}`)
      .join("&")}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontPairing]);

  const cssVars = useMemo(
    () =>
      ({
        "--preview-bg": colors.background,
        "--preview-fg": colors.foreground,
        "--preview-primary": colors.primary,
        "--preview-secondary": colors.secondary,
        "--preview-accent": colors.accent,
        "--preview-muted": colors.muted,
        "--preview-border": colors.border,
        "--preview-radius": radiusValue,
        "--preview-shadow": shadowValue,
        "--preview-font-heading": fontPairing
          ? `'${fontPairing.heading.family}', sans-serif`
          : "sans-serif",
        "--preview-font-body": fontPairing
          ? `'${fontPairing.body.family}', sans-serif`
          : "sans-serif",
      }) as React.CSSProperties,
    [colors, radiusValue, shadowValue, fontPairing]
  );

  const PreviewTemplate =
    state.pageType === "ecommerce"
      ? EcommercePreview
      : state.pageType === "blog"
        ? BlogPreview
        : LandingPreview;

  const isMobile = state.previewViewport === "mobile";

  const previewContent = (
    <div className="min-h-full overflow-hidden" style={cssVars}>
      <div
        className="relative min-h-screen"
        style={{
          backgroundColor: colors.background,
          color: colors.foreground,
          fontFamily: fontPairing
            ? `'${fontPairing.body.family}', sans-serif`
            : "sans-serif",
        }}
      >
        {/* Grain overlay */}
        {state.effects.grain && (
          <div
            className="pointer-events-none absolute inset-0 z-50 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Gradient overlay */}
        {state.effects.gradient && (
          <div
            className="pointer-events-none absolute inset-0 z-40 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${colors.primary}40 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, ${colors.accent}30 0%, transparent 50%)`,
            }}
          />
        )}

        <PreviewTemplate />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="h-full overflow-auto isolate flex items-start justify-center bg-muted/50 p-6" ref={containerRef}>
        <div
          className="relative w-[375px] min-h-[667px] rounded-[2rem] border-[8px] border-foreground/20 overflow-hidden shadow-2xl bg-background"
        >
          {previewContent}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto isolate" ref={containerRef}>
      {previewContent}
    </div>
  );
}
