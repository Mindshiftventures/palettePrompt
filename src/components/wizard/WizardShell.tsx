"use client";

import { useWizardStore } from "@/store/wizard-store";
import { WizardSidebar } from "./WizardSidebar";
import { PageTypeStep } from "./steps/PageTypeStep";
import { StyleStep } from "./steps/StyleStep";
import { ColorStep } from "./steps/ColorStep";
import { TypographyStep } from "./steps/TypographyStep";
import { LayoutStep } from "./steps/LayoutStep";
import { EffectsStep } from "./steps/EffectsStep";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { PromptOutput } from "@/components/output/PromptOutput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Code2, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  PageTypeStep,
  StyleStep,
  ColorStep,
  TypographyStep,
  LayoutStep,
  EffectsStep,
];

export function WizardShell() {
  const currentStep = useWizardStore((s) => s.currentStep);
  const setStep = useWizardStore((s) => s.setStep);
  const [showPrompt, setShowPrompt] = useState(false);
  const [mobileView, setMobileView] = useState<"controls" | "preview">("controls");

  const StepComponent = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <WizardSidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left: Wizard controls */}
        <div
          className={`w-full md:w-[420px] lg:w-[480px] flex flex-col border-r border-border bg-background ${
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
          <div className="flex items-center justify-between p-4 border-t border-border">
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

              {isLastStep ? (
                <Button size="sm" onClick={() => setShowPrompt(true)}>
                  <Code2 className="h-4 w-4 mr-1" />
                  Generate Prompt
                </Button>
              ) : (
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
          className={`flex-1 bg-muted/30 overflow-hidden ${
            mobileView === "controls" ? "hidden md:block" : "block"
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

          <PreviewPanel />
        </div>
      </div>

      {/* Prompt output modal */}
      {showPrompt && <PromptOutput onClose={() => setShowPrompt(false)} />}
    </div>
  );
}
