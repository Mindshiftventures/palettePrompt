"use client";

import { useWizardStore } from "@/store/wizard-store";
import { layouts } from "@/data/layouts";
import { cn } from "@/lib/utils";
import {
  Rows3,
  LayoutGrid,
  AlignCenter,
  PanelLeft,
  MonitorPlay,
} from "lucide-react";

const iconMap = {
  Rows3,
  LayoutGrid,
  AlignCenter,
  PanelLeft,
  MonitorPlay,
} as const;

export function LayoutStep() {
  const layoutId = useWizardStore((s) => s.layoutId);
  const setLayoutId = useWizardStore((s) => s.setLayoutId);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Choose a layout</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Select how content is structured on the page.
      </p>

      <div className="space-y-3">
        {layouts.map((layout) => {
          const Icon = iconMap[layout.icon as keyof typeof iconMap];
          const isSelected = layoutId === layout.id;

          return (
            <button
              key={layout.id}
              onClick={() => setLayoutId(layout.id)}
              className={cn(
                "flex items-start gap-4 w-full p-4 rounded-lg border-2 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{layout.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {layout.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
