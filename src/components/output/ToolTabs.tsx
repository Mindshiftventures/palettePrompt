"use client";

import type { ToolTarget } from "@/types";
import { cn } from "@/lib/utils";

const tools: { id: ToolTarget; label: string; color: string }[] = [
  { id: "v0", label: "v0", color: "#000000" },
  { id: "lovable", label: "Lovable", color: "#E11D48" },
  { id: "figma-make", label: "Figma Make", color: "#A259FF" },
  { id: "claude-code", label: "Claude Code", color: "#D97706" },
  { id: "cursor", label: "Cursor", color: "#22C55E" },
];

interface ToolTabsProps {
  activeTool: ToolTarget;
  onSelect: (tool: ToolTarget) => void;
}

export function ToolTabs({ activeTool, onSelect }: ToolTabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelect(tool.id)}
          className={cn(
            "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all",
            activeTool === tool.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tool.label}
        </button>
      ))}
    </div>
  );
}
