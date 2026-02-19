import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Sparkles,
  Copy,
  Wand2,
  Eye,
  Zap,
  ChevronRight,
} from "lucide-react";
import { StyleShowcase } from "@/components/home/StyleShowcase";
import { toolLogos } from "@/components/shared/ToolLogos";
import type { ToolTarget } from "@/types";

const toolOrder: ToolTarget[] = ["v0", "lovable", "figma-make", "claude-code", "cursor"];

const steps = [
  {
    icon: Palette,
    title: "Pick your style",
    description:
      "Choose from 20 curated visual styles — Neo-Brutalist, Glassmorphism, Swiss, and more.",
    color: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-600",
  },
  {
    icon: Wand2,
    title: "Customize everything",
    description:
      "Fine-tune colors, typography, layout, spacing, and effects to match your vision.",
    color: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-600",
  },
  {
    icon: Eye,
    title: "See it live",
    description:
      "Watch your choices come alive in a real-time preview across landing, e-commerce, and blog templates.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600",
  },
  {
    icon: Copy,
    title: "Copy your prompt",
    description:
      "Get a tool-specific prompt optimized for your chosen AI coding assistant.",
    color: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-600",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg tracking-tight">
            Palette<span className="text-primary">Kit</span>
          </span>
        </div>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Open Builder
          <ArrowRight className="h-4 w-4" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold bg-primary/10 text-primary rounded-full">
            <Zap className="h-3 w-3" />
            Turn visual taste into pixel-perfect prompts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Your design vision,
            <br />
            their pixel-perfect code
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            AI tools produce generic output because prompts lack design specifics.
            PaletteKit lets you visually define your style, then generates
            detailed, tool-optimized prompts that produce exactly what you envision.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Tool logos */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-xs text-muted-foreground mr-1">
              Optimized for:
            </span>
            {toolOrder.map((id) => {
              const Logo = toolLogos[id];
              return <Logo key={id} className="h-7 w-7" />;
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/20 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              4 simple steps
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From vision to prompt in under a minute. No design skills needed.
            </p>
          </div>

          {/* Desktop: horizontal flow with cards */}
          <div className="hidden md:grid md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="absolute top-12 -right-2 z-10">
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                )}

                <div className={`h-full rounded-2xl border border-border bg-gradient-to-b ${step.color} p-6 transition-all hover:shadow-lg hover:-translate-y-1`}>
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${step.iconBg}`}>
                      <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                    </div>
                    <span className="text-4xl font-black text-foreground/[0.06]">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-4 mb-1 last:mb-0">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${step.iconBg} shrink-0 z-10`}>
                    <step.icon className={`h-5 w-5 ${step.iconColor}`} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style showcase */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            20 curated visual styles
          </h2>
          <p className="text-muted-foreground mb-10">
            From Neo-Brutalist to Glassmorphism, each style comes with curated
            colors, fonts, and tokens ready to go.
          </p>
          <StyleShowcase />
        </div>
      </section>

      {/* The problem — Semantic Translation Gap */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            The Semantic Translation Gap
          </h2>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch">
            {/* Before */}
            <div className="p-6 bg-background rounded-xl border border-destructive/30 flex flex-col">
              <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-3">
                Vague prompt
              </p>
              <p className="text-sm italic text-muted-foreground mb-4">
                &quot;Make it look edgy and modern with a dark theme&quot;
              </p>
              {/* Mini generic UI mockup */}
              <div className="mt-auto rounded-lg border border-border bg-neutral-100 p-3 space-y-2">
                <div className="h-2 w-20 bg-neutral-300 rounded" />
                <div className="flex gap-2">
                  <div className="h-8 flex-1 bg-neutral-200 rounded" />
                  <div className="h-8 flex-1 bg-neutral-200 rounded" />
                </div>
                <div className="h-3 w-full bg-neutral-200 rounded" />
                <div className="h-3 w-3/4 bg-neutral-200 rounded" />
              </div>
              <p className="text-xs text-destructive mt-3">
                Result: Generic dark UI with default shadows
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="h-6 w-6 text-primary" />
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">PaletteKit</span>
              </div>
            </div>
            <div className="md:hidden flex items-center justify-center py-1">
              <ArrowRight className="h-5 w-5 text-primary rotate-90" />
            </div>

            {/* After */}
            <div className="p-6 bg-background rounded-xl border border-green-500/30 flex flex-col">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">
                PaletteKit output
              </p>
              <p className="text-sm italic text-muted-foreground mb-4">
                &quot;Neo-Brutalist: 3px black borders, hard 4px offset shadows, 0px radius. Palette: bg #000, primary #CCFF00...&quot;
              </p>
              {/* Mini styled UI mockup */}
              <div className="mt-auto rounded-none border-2 border-black bg-black p-3 space-y-2">
                <div className="h-2 w-20 bg-[#CCFF00] rounded-none" />
                <div className="flex gap-2">
                  <div className="h-8 flex-1 bg-[#CCFF00] rounded-none border-2 border-[#CCFF00]" />
                  <div className="h-8 flex-1 bg-transparent rounded-none border-2 border-[#CCFF00]" />
                </div>
                <div className="h-3 w-full bg-neutral-700 rounded-none" />
                <div className="h-3 w-3/4 bg-neutral-700 rounded-none" />
              </div>
              <p className="text-xs text-green-600 mt-3">
                Result: Exactly what you envisioned
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to build something beautiful?
          </h2>
          <p className="text-muted-foreground mb-8">
            Free, no signup, runs entirely in your browser.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Open the Builder
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center text-xs text-muted-foreground">
        <p>
          Built with Next.js, Tailwind CSS, and shadcn/ui. PaletteKit is a
          free, open tool.
        </p>
      </footer>
    </div>
  );
}
