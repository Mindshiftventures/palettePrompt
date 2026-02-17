"use client";

import { useState, useCallback } from "react";
import { useWizardStore } from "@/store/wizard-store";
import { generatePrompt } from "@/lib/prompt-engine";
import { ToolTabs } from "./ToolTabs";
import type { ToolTarget } from "@/types";
import { X, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] mx-4 bg-background rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-bold">Generated Prompt</h2>
            <p className="text-sm text-muted-foreground">
              Copy this prompt and paste it into your preferred tool
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tool tabs */}
        <div className="px-6 py-3 border-b border-border">
          <ToolTabs activeTool={activeTool} onSelect={setActiveTool} />
        </div>

        {/* Prompt content */}
        <div className="flex-1 overflow-y-auto p-6">
          <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed text-foreground/90">
            {prompt}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">
            {prompt.length.toLocaleString()} characters
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
