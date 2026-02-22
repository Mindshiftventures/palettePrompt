"use client";

import { useState, useEffect, useCallback } from "react";

interface StyleFrame {
  name: string;
  bg: string;
  cardBg: string;
  text: string;
  textMuted: string;
  primary: string;
  border: string;
  radius: string;
  shadow: string;
  btnBg: string;
  btnText: string;
  btnBorder: string;
}

const styleFrames: StyleFrame[] = [
  {
    name: "Neo-Brutalist",
    bg: "#FFFFFF",
    cardBg: "rgba(0,0,0,0.02)",
    text: "#000000",
    textMuted: "#555555",
    primary: "#CCFF00",
    border: "3px solid #000000",
    radius: "0px",
    shadow: "4px 4px 0px #000",
    btnBg: "#CCFF00",
    btnText: "#000000",
    btnBorder: "3px solid #000000",
  },
  {
    name: "Glassmorphism",
    bg: "#0f0f23",
    cardBg: "rgba(255,255,255,0.06)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.5)",
    primary: "#7C3AED",
    border: "1px solid rgba(255,255,255,0.12)",
    radius: "16px",
    shadow: "0 8px 32px rgba(0,0,0,0.3)",
    btnBg: "rgba(124,58,237,0.35)",
    btnText: "#ffffff",
    btnBorder: "1px solid rgba(124,58,237,0.4)",
  },
  {
    name: "Swiss International",
    bg: "#F5F0E8",
    cardBg: "rgba(0,0,0,0.03)",
    text: "#1A1A1A",
    textMuted: "#777777",
    primary: "#E63946",
    border: "1px solid #1A1A1A",
    radius: "0px",
    shadow: "none",
    btnBg: "#E63946",
    btnText: "#ffffff",
    btnBorder: "1px solid #E63946",
  },
  {
    name: "Clean SaaS",
    bg: "#FFFFFF",
    cardBg: "#F9FAFB",
    text: "#111827",
    textMuted: "#6B7280",
    primary: "#4F46E5",
    border: "1px solid #E5E7EB",
    radius: "12px",
    shadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
    btnBg: "#4F46E5",
    btnText: "#ffffff",
    btnBorder: "1px solid #4F46E5",
  },
  {
    name: "Cinematic Noir",
    bg: "#0a0a0a",
    cardBg: "rgba(200,169,126,0.04)",
    text: "#F5F0E8",
    textMuted: "rgba(245,240,232,0.4)",
    primary: "#C8A97E",
    border: "1px solid rgba(200,169,126,0.15)",
    radius: "2px",
    shadow: "0 0 40px rgba(200,169,126,0.04)",
    btnBg: "transparent",
    btnText: "#C8A97E",
    btnBorder: "1px solid rgba(200,169,126,0.5)",
  },
];

export function HeroStyleDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % styleFrames.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(advance, 3200);
    return () => clearInterval(interval);
  }, [isPaused, advance]);

  const s = styleFrames[activeIndex];

  return (
    <div
      className="relative animate-fade-in-up animation-delay-400"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Style label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-mono text-[#71717A] tracking-wider uppercase">
          Live preview
        </span>
        <span
          className="text-xs font-mono text-[#A1A1AA] transition-all duration-500"
          key={activeIndex}
        >
          {s.name}
        </span>
      </div>

      {/* Browser frame */}
      <div className="rounded-xl border border-[#27272A] bg-[#18181B] overflow-hidden shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#27272A]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
          </div>
          <div className="flex-1 mx-8">
            <div className="h-5 rounded-md bg-[#27272A] max-w-[200px] mx-auto" />
          </div>
        </div>

        {/* Content area — the morphing preview */}
        <div
          className="p-5 sm:p-6 transition-all duration-700 ease-in-out"
          style={{ backgroundColor: s.bg }}
        >
          {/* Mini nav */}
          <div
            className="flex items-center justify-between mb-6 pb-3 transition-all duration-700"
            style={{ borderBottom: `1px solid ${s.textMuted}33` }}
          >
            <div
              className="h-2 w-14 rounded-sm transition-all duration-700"
              style={{ backgroundColor: s.text, borderRadius: s.radius === "0px" ? "0px" : "2px" }}
            />
            <div className="flex gap-3">
              <div
                className="h-1.5 w-8 rounded-sm transition-all duration-700"
                style={{ backgroundColor: s.textMuted }}
              />
              <div
                className="h-1.5 w-8 rounded-sm transition-all duration-700"
                style={{ backgroundColor: s.textMuted }}
              />
              <div
                className="h-1.5 w-8 rounded-sm transition-all duration-700"
                style={{ backgroundColor: s.textMuted }}
              />
            </div>
          </div>

          {/* Hero content */}
          <div className="space-y-3 mb-6">
            <div
              className="h-3 w-3/4 transition-all duration-700"
              style={{
                backgroundColor: s.text,
                borderRadius: s.radius === "0px" ? "0px" : "2px",
                opacity: 0.9,
              }}
            />
            <div
              className="h-3 w-1/2 transition-all duration-700"
              style={{
                backgroundColor: s.text,
                borderRadius: s.radius === "0px" ? "0px" : "2px",
                opacity: 0.9,
              }}
            />
            <div
              className="h-2 w-5/6 transition-all duration-700"
              style={{
                backgroundColor: s.textMuted,
                borderRadius: s.radius === "0px" ? "0px" : "2px",
              }}
            />
            <div
              className="h-2 w-2/3 transition-all duration-700"
              style={{
                backgroundColor: s.textMuted,
                borderRadius: s.radius === "0px" ? "0px" : "2px",
              }}
            />
          </div>

          {/* Button */}
          <div
            className="inline-flex items-center h-8 px-4 mb-6 transition-all duration-700"
            style={{
              backgroundColor: s.btnBg,
              border: s.btnBorder,
              borderRadius: s.radius,
              boxShadow: s.shadow !== "none" ? s.shadow.replace("4px 4px", "2px 2px") : "none",
            }}
          >
            <div
              className="h-1.5 w-10 rounded-sm transition-all duration-700"
              style={{ backgroundColor: s.btnText }}
            />
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="transition-all duration-700 p-3 space-y-2"
                style={{
                  backgroundColor: s.cardBg,
                  border: s.border,
                  borderRadius: s.radius,
                  boxShadow: s.shadow,
                }}
              >
                {/* Card accent bar */}
                <div
                  className="h-1.5 w-8 transition-all duration-700"
                  style={{
                    backgroundColor: s.primary,
                    borderRadius: s.radius === "0px" ? "0px" : "2px",
                  }}
                />
                {/* Card text lines */}
                <div
                  className="h-1 w-full transition-all duration-700"
                  style={{
                    backgroundColor: s.text,
                    opacity: 0.15,
                    borderRadius: s.radius === "0px" ? "0px" : "1px",
                  }}
                />
                <div
                  className="h-1 w-3/4 transition-all duration-700"
                  style={{
                    backgroundColor: s.text,
                    opacity: 0.1,
                    borderRadius: s.radius === "0px" ? "0px" : "1px",
                  }}
                />
                <div
                  className="h-1 w-1/2 transition-all duration-700"
                  style={{
                    backgroundColor: s.text,
                    opacity: 0.1,
                    borderRadius: s.radius === "0px" ? "0px" : "1px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {styleFrames.map((frame, i) => (
          <button
            key={frame.name}
            onClick={() => setActiveIndex(i)}
            className="group relative py-2 px-1"
            aria-label={`Show ${frame.name} style`}
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-6 bg-[#FAFAF9]"
                  : "w-2 bg-[#3f3f46] group-hover:bg-[#71717A]"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
