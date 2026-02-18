"use client";

import type { StyleDefinition } from "@/types";
import { getColorTheme, isColorDark } from "@/data/colors";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  style: StyleDefinition;
  isSelected: boolean;
  onClick: () => void;
}

export function StyleCard({ style, isSelected, onClick }: StyleCardProps) {
  const { tokens } = style;
  const theme = getColorTheme(style.defaults.colorThemeId);
  const colors = theme?.colors;

  // Use theme colors for more vivid previews, fallback to tokens
  const primary = colors?.primary ?? tokens.textPrimary;
  const accent = colors?.accent ?? tokens.textSecondary;
  const muted = colors?.muted ?? tokens.bgBase;
  const isDark = isColorDark(tokens.bgBase);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col w-full rounded-lg border-2 overflow-hidden text-left transition-all",
        isSelected
          ? "border-primary ring-2 ring-primary/30"
          : "border-border hover:border-primary/40"
      )}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-1.5 right-1.5 z-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Mini preview */}
      <div
        className="h-28 p-3 flex flex-col gap-1.5 relative overflow-hidden"
        style={{ backgroundColor: tokens.bgBase }}
      >
        {/* Subtle gradient hint for styles that use gradients */}
        {style.defaults.effects.includes("gradient") && (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${primary}40 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Mini nav */}
        <div className="relative flex items-center gap-1.5">
          <div
            className="h-1.5 w-8 rounded-full"
            style={{ backgroundColor: primary, opacity: 0.9 }}
          />
          <div className="flex-1" />
          <div
            className="h-1.5 w-4 rounded-full"
            style={{ backgroundColor: tokens.textSecondary, opacity: 0.4 }}
          />
          <div
            className="h-1.5 w-4 rounded-full"
            style={{ backgroundColor: tokens.textSecondary, opacity: 0.4 }}
          />
        </div>

        {/* Mini hero */}
        <div className="relative flex-1 flex flex-col justify-center gap-1">
          <div
            className="h-2 w-3/4 rounded-sm"
            style={{ backgroundColor: tokens.textPrimary, opacity: 0.9 }}
          />
          <div
            className="h-1.5 w-1/2 rounded-sm"
            style={{ backgroundColor: tokens.textSecondary, opacity: 0.5 }}
          />
          {/* Mini CTA button */}
          <div
            className="h-3 w-14 mt-0.5"
            style={{
              backgroundColor: primary,
              borderRadius: tokens.radiusValue,
              border: `${tokens.borderWidth} solid ${tokens.borderColor}`,
            }}
          />
        </div>

        {/* Mini cards */}
        <div className="relative flex gap-1.5">
          {[primary, accent, muted].map((color, i) => (
            <div
              key={i}
              className="flex-1 h-8 flex flex-col justify-end p-1"
              style={{
                border: `${tokens.borderWidth} solid ${tokens.borderColor}`,
                borderRadius: tokens.radiusValue,
                boxShadow: tokens.shadowValue,
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              }}
            >
              <div
                className="h-1 w-full rounded-full opacity-60"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Label */}
      <div className="p-2.5 bg-card">
        <p className="text-xs font-semibold truncate">{style.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">
          {style.vibe.join(" · ")}
        </p>
      </div>
    </button>
  );
}
