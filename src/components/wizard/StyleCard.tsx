"use client";

import type { StyleDefinition } from "@/types";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  style: StyleDefinition;
  isSelected: boolean;
  onClick: () => void;
}

export function StyleCard({ style, isSelected, onClick }: StyleCardProps) {
  const { tokens } = style;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col w-full rounded-lg border-2 overflow-hidden text-left transition-all",
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border hover:border-primary/40"
      )}
    >
      {/* Mini preview */}
      <div
        className="h-28 p-3 flex flex-col gap-1.5"
        style={{
          backgroundColor: tokens.bgBase,
          borderRadius: tokens.radiusValue,
        }}
      >
        {/* Mini nav */}
        <div className="flex items-center gap-1.5">
          <div
            className="h-1.5 w-8 rounded-full"
            style={{ backgroundColor: tokens.textPrimary, opacity: 0.8 }}
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
        <div className="flex-1 flex flex-col justify-center gap-1">
          <div
            className="h-2 w-3/4 rounded-sm"
            style={{ backgroundColor: tokens.textPrimary, opacity: 0.9 }}
          />
          <div
            className="h-1.5 w-1/2 rounded-sm"
            style={{ backgroundColor: tokens.textSecondary, opacity: 0.5 }}
          />
        </div>

        {/* Mini cards */}
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-8"
              style={{
                border: `${tokens.borderWidth} solid ${tokens.borderColor}`,
                borderRadius: tokens.radiusValue,
                boxShadow: tokens.shadowValue,
                backgroundColor:
                  tokens.bgBase === "#000000" || tokens.bgBase === "#0d1117" || tokens.bgBase === "#0a0a0a" || tokens.bgBase === "#0f0f23" || tokens.bgBase === "#1a1a2e" || tokens.bgBase === "#0c0c0c"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
              }}
            />
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
