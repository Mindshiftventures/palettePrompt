"use client";

import { styles } from "@/data/styles";
import { getColorTheme } from "@/data/colors";
import Link from "next/link";

export function StyleShowcase() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {styles.map((style) => {
        const theme = getColorTheme(style.defaults.colorThemeId);
        const colors = theme?.colors;
        const { tokens } = style;

        const primary = colors?.primary ?? tokens.textPrimary;
        const accent = colors?.accent ?? tokens.textSecondary;
        const isDark =
          tokens.bgBase === "#000000" ||
          tokens.bgBase === "#0d1117" ||
          tokens.bgBase === "#0a0a0a" ||
          tokens.bgBase === "#0f0f23" ||
          tokens.bgBase === "#1a1a2e" ||
          tokens.bgBase === "#0c0c0c";

        return (
          <Link
            key={style.id}
            href="/builder"
            className="group flex flex-col rounded-lg border border-border overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
          >
            {/* Mini preview */}
            <div
              className="h-20 p-2.5 flex flex-col gap-1 relative overflow-hidden"
              style={{ backgroundColor: tokens.bgBase }}
            >
              {style.defaults.effects.includes("gradient") && (
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${primary}40 0%, transparent 60%)`,
                  }}
                />
              )}
              {/* Mini heading */}
              <div className="relative flex flex-col gap-0.5 flex-1 justify-center">
                <div
                  className="h-1.5 w-3/4 rounded-sm"
                  style={{ backgroundColor: tokens.textPrimary, opacity: 0.85 }}
                />
                <div
                  className="h-1 w-1/2 rounded-sm"
                  style={{ backgroundColor: tokens.textSecondary, opacity: 0.45 }}
                />
              </div>
              {/* Mini cards */}
              <div className="relative flex gap-1">
                {[primary, accent].map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-5"
                    style={{
                      border: `${tokens.borderWidth} solid ${tokens.borderColor}`,
                      borderRadius: tokens.radiusValue,
                      boxShadow: tokens.shadowValue,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                    }}
                  >
                    <div
                      className="h-1 mx-1 mt-1 rounded-full opacity-50"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Label */}
            <div className="p-2 bg-card">
              <p className="text-xs font-semibold truncate">{style.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
