"use client";

import { styles } from "@/data/styles";
import { getColorTheme } from "@/data/colors";
import Link from "next/link";

const featuredIds = [
  "neo-brutalist",
  "glassmorphism",
  "swiss-international",
  "cinematic-noir",
  "acid-cyber-y2k",
  "bento-grid",
  "retro-futurism",
  "editorial-magazine",
  "organic-natural",
  "luxury-premium",
  "terminal-hacker",
  "playful-kawaii",
];

export function StyleShowcase() {
  const featured = featuredIds
    .map((id) => styles.find((s) => s.id === id))
    .filter(Boolean) as typeof styles;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {featured.map((style) => {
          const theme = getColorTheme(style.defaults.colorThemeId);
          const colors = theme?.colors;
          const { tokens } = style;

          const primary = colors?.primary ?? tokens.textPrimary;
          const accent = colors?.accent ?? tokens.textSecondary;

          return (
            <Link
              key={style.id}
              href={`/builder?style=${style.id}`}
              className="group relative flex flex-col rounded-lg overflow-hidden border border-[#27272A] hover:border-[#52525B] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Preview area */}
              <div
                className="relative h-28 sm:h-32 p-3 flex flex-col overflow-hidden"
                style={{ backgroundColor: tokens.bgBase }}
              >
                {/* Subtle gradient overlay for atmosphere */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, ${primary}30 0%, transparent 70%)`,
                  }}
                />

                {/* Mini page preview */}
                <div className="relative flex flex-col flex-1 justify-center gap-1.5">
                  {/* Heading bar */}
                  <div
                    className="h-2 w-3/4"
                    style={{
                      backgroundColor: tokens.textPrimary,
                      opacity: 0.85,
                      borderRadius:
                        tokens.radiusValue === "0px" ? "0px" : "1px",
                    }}
                  />
                  {/* Sub text */}
                  <div
                    className="h-1.5 w-1/2"
                    style={{
                      backgroundColor: tokens.textSecondary,
                      opacity: 0.5,
                      borderRadius:
                        tokens.radiusValue === "0px" ? "0px" : "1px",
                    }}
                  />
                </div>

                {/* Mini cards */}
                <div className="relative flex gap-1.5 mt-auto">
                  {[primary, accent].map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 h-8 p-1.5"
                      style={{
                        border: `${tokens.borderWidth} solid ${tokens.borderColor}`,
                        borderRadius: tokens.radiusValue,
                        boxShadow: tokens.shadowValue,
                        backgroundColor:
                          tokens.bgBase === "#000000" ||
                          tokens.bgBase === "#0d1117" ||
                          tokens.bgBase === "#0a0a0a" ||
                          tokens.bgBase === "#0f0f23" ||
                          tokens.bgBase === "#1a1a2e" ||
                          tokens.bgBase === "#0c0c0c"
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <div
                        className="h-1 w-3/5 opacity-60"
                        style={{
                          backgroundColor: color,
                          borderRadius:
                            tokens.radiusValue === "0px" ? "0px" : "1px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Label */}
              <div className="px-3 py-2.5 bg-[#18181B] border-t border-[#27272A]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#E4E4E7] truncate">
                    {style.name}
                  </p>
                  <svg
                    className="w-3 h-3 text-[#52525B] group-hover:text-[#A1A1AA] transition-colors shrink-0 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
                <p className="text-[10px] text-[#71717A] mt-0.5 truncate">
                  {style.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* See all link */}
      <div className="mt-8 text-center">
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors"
        >
          See all 20 styles in the builder
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
