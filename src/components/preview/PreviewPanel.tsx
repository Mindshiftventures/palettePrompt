"use client";

import { useWizardStore } from "@/store/wizard-store";
import { getStyleById } from "@/data/styles";
import { getColorTheme, generatePaletteFromBrand, isColorDark } from "@/data/colors";
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
  const styleIsDark = style ? isColorDark(style.tokens.bgBase) : false;
  const colorTheme = state.customBrandColor
    ? generatePaletteFromBrand(state.customBrandColor, styleIsDark)
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
        {/* Grain overlay — opacity scales with intensity */}
        {state.effects.grain > 0 && (
          <div
            className="pointer-events-none absolute inset-0 z-50"
            style={{
              opacity: 0.02 + (state.effects.grain / 100) * 0.06,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Gradient overlay — opacity scales with intensity */}
        {state.effects.gradient > 0 && (
          <div
            className="pointer-events-none absolute inset-0 z-40"
            style={{
              opacity: 0.1 + (state.effects.gradient / 100) * 0.4,
              background: `radial-gradient(ellipse at 20% 50%, ${colors.primary}40 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, ${colors.accent}30 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Blur overlay — backdrop-blur on a semi-transparent layer */}
        {state.effects.blur > 0 && (
          <div
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              backdropFilter: `blur(${(state.effects.blur / 100) * 4}px)`,
              backgroundColor: `${colors.background}${Math.round((state.effects.blur / 100) * 15).toString(16).padStart(2, "0")}`,
            }}
          />
        )}

        {/* Glow effect — colored ambient glow behind content */}
        {state.effects.glow > 0 && state.shadowStyle !== "none" && (
          <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          >
            <div
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full"
              style={{
                opacity: 0.1 + (state.effects.glow / 100) * 0.3,
                background: `radial-gradient(circle, ${colors.primary}60 0%, transparent 70%)`,
                filter: `blur(${40 + (state.effects.glow / 100) * 60}px)`,
              }}
            />
          </div>
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
