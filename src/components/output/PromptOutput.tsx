"use client";

import { useState, useCallback } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { generatePrompt } from "@/lib/prompt-engine";
import { ToolLogoCard, toolLabels } from "@/components/shared/ToolLogos";
import type { ToolTarget } from "@/types";
import { X, Copy, Check, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOOLS: ToolTarget[] = ["v0", "lovable", "figma-make", "claude-code", "cursor"];

interface PromptOutputProps {
  onClose: () => void;
}

export function PromptOutput({ onClose }: PromptOutputProps) {
  const [activeTool, setActiveTool] = useState<ToolTarget>("v0");
  const [copied, setCopied] = useState(false);
  const state = useWizardStore();

  const prompt = generatePrompt(state, activeTool);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([prompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palette-prompt-${activeTool}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [prompt, activeTool]);

  const sections = [
    state.styleId && "style",
    state.colorThemeId && "colors",
    state.fontPairingId && "typography",
    state.layoutId && "layout",
    "effects",
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[90vh] bg-background rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Your prompt is ready!</h2>
              <p className="text-sm text-muted-foreground">
                Choose a tool and copy your prompt
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tool selection */}
        <div className="px-4 sm:px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Select your tool
          </p>
          <div className="grid grid-cols-5 gap-2">
            {TOOLS.map((tool) => (
              <ToolLogoCard
                key={tool}
                tool={tool}
                selected={activeTool === tool}
                onClick={() => setActiveTool(tool)}
              />
            ))}
          </div>
        </div>

        {/* Prompt summary */}
        <div className="px-4 sm:px-6 py-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Prompt for <span className="font-semibold text-foreground">{toolLabels[activeTool]}</span>
            {" — "}
            <span className="font-medium">{prompt.length.toLocaleString()}</span> characters
            {" covering "}
            {sections.join(", ")}.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-4 border-t border-border">
          <Button className="flex-1" size="lg" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1.5" />
                Copy to Clipboard
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1.5" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
