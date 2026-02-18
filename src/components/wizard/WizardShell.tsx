"use client";

import { useWizardStore } from "@/store/wizard-store";
import { WizardSidebar } from "./WizardSidebar";
import { StyleStep } from "./steps/StyleStep";
import { ColorStep } from "./steps/ColorStep";
import { TypographyStep } from "./steps/TypographyStep";
import { LayoutStep } from "./steps/LayoutStep";
import { EffectsStep } from "./steps/EffectsStep";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { PromptOutput } from "@/components/output/PromptOutput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Code2, ChevronLeft, ChevronRight, Monitor, Smartphone, Globe, ShoppingBag, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PreviewViewport, PageType } from "@/types";

const steps = [
  StyleStep,
  ColorStep,
  TypographyStep,
  LayoutStep,
  EffectsStep,
];

const pageTypes: { id: PageType; label: string; icon: typeof Globe }[] = [
  { id: "landing", label: "Landing", icon: Globe },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingBag },
  { id: "blog", label: "Blog", icon: BookOpen },
];

export function WizardShell() {
  const currentStep = useWizardStore((s) => s.currentStep);
  const setStep = useWizardStore((s) => s.setStep);
  const previewViewport = useWizardStore((s) => s.previewViewport);
  const setPreviewViewport = useWizardStore((s) => s.setPreviewViewport);
  const pageType = useWizardStore((s) => s.pageType);
  const setPageType = useWizardStore((s) => s.setPageType);
  const [showPrompt, setShowPrompt] = useState(false);
  const [mobileView, setMobileView] = useState<"controls" | "preview">("controls");

  const StepComponent = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex h-dvh bg-background overflow-hidden">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block relative z-10">
        <WizardSidebar onGeneratePrompt={() => setShowPrompt(true)} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left: Wizard controls */}
        <div
          className={`w-full md:w-[420px] lg:w-[480px] flex flex-col min-h-0 border-r border-border bg-background relative z-10 ${
            mobileView === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Mobile step indicator */}
          <div className="md:hidden flex items-center gap-2 px-4 py-3 border-b border-border">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i === currentStep
                    ? "bg-primary"
                    : i < currentStep
                      ? "bg-primary/40"
                      : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1 overflow-y-auto p-6">
            <StepComponent />
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between p-4 border-t border-border shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(currentStep - 1)}
              disabled={isFirstStep}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            <div className="flex gap-2">
              {/* Mobile toggle */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileView("preview")}
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>

              {/* Mobile-only generate prompt button */}
              {isLastStep && (
                <Button
                  size="sm"
                  className="md:hidden"
                  onClick={() => setShowPrompt(true)}
                >
                  <Code2 className="h-4 w-4 mr-1" />
                  Generate
                </Button>
              )}

              {!isLastStep && (
                <Button
                  size="sm"
                  onClick={() => setStep(currentStep + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live preview */}
        <div
          className={`flex-1 bg-muted/30 overflow-hidden isolate flex flex-col ${
            mobileView === "controls" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Mobile back button */}
          <div className="md:hidden flex items-center p-3 border-b border-border bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileView("controls")}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to controls
            </Button>
          </div>

          {/* Preview toolbar: page type switcher + viewport toggle */}
          <div className="flex items-center justify-between p-2 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
            {/* Page type switcher */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {pageTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPageType(id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    pageType === id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Viewport toggle */}
            <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-0.5">
              {([
                { id: "desktop" as PreviewViewport, icon: Monitor, label: "Desktop" },
                { id: "mobile" as PreviewViewport, icon: Smartphone, label: "Mobile" },
              ]).map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setPreviewViewport(id)}
                  title={label}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                    previewViewport === id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <PreviewPanel />
          </div>
        </div>
      </div>

      {/* Prompt output modal */}
      {showPrompt && <PromptOutput onClose={() => setShowPrompt(false)} />}
    </div>
  );
}
