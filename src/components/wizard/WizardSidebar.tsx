"use client";

import { useWizardStore } from "@/store/wizard-store";
import { WIZARD_STEPS } from "@/types";
import {
  Layout,
  Palette,
  Paintbrush,
  Type,
  Sparkles,
  Shuffle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const iconMap = {
  Layout,
  Palette,
  Paintbrush,
  Type,
  Sparkles,
} as const;

export function WizardSidebar() {
  const currentStep = useWizardStore((s) => s.currentStep);
  const setStep = useWizardStore((s) => s.setStep);
  const randomiseAll = useWizardStore((s) => s.randomiseAll);

  return (
    <div className="w-[200px] h-full border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="font-bold text-lg tracking-tight">
          Palette<span className="text-primary">Prompt</span>
        </h1>
      </div>

      <nav className="flex-1 p-3">
        <div className="space-y-1">
        {WIZARD_STEPS.map((step) => {
          const Icon = iconMap[step.icon as keyof typeof iconMap];
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => setStep(step.id)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : isPast
                    ? "text-foreground hover:bg-muted"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{step.label}</span>
            </button>
          );
        })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={randomiseAll}
          className="w-full mt-2 text-muted-foreground hover:text-foreground"
        >
          <Shuffle className="h-4 w-4 mr-2" />
          Randomise
        </Button>
      </nav>
    </div>
  );
}
