import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Sparkles,
  Copy,
  Wand2,
  Eye,
  Zap,
} from "lucide-react";

const tools = [
  { name: "v0", color: "bg-neutral-900 text-white" },
  { name: "Lovable", color: "bg-rose-600 text-white" },
  { name: "Figma Make", color: "bg-purple-600 text-white" },
  { name: "Claude Code", color: "bg-amber-600 text-white" },
  { name: "Cursor", color: "bg-green-600 text-white" },
];

const styleNames = [
  "Neo-Brutalist",
  "Glassmorphism",
  "Swiss International",
  "Cinematic Noir",
  "Claymorphism",
  "Acid Cyber Y2K",
  "Bento Grid",
  "Clean SaaS",
  "Retro Futurism",
  "Bold Minimalist",
  "Organic Natural",
  "Scrapbook Collage",
  "Corporate Modern",
  "Gradient Mesh",
  "Neumorphism",
  "Editorial Magazine",
  "Monochrome Minimal",
  "Playful Kawaii",
  "Luxury Premium",
  "Terminal Hacker",
];

const steps = [
  {
    icon: Palette,
    title: "Pick your style",
    description:
      "Choose from 20 curated visual styles — Neo-Brutalist, Glassmorphism, Swiss, and more.",
  },
  {
    icon: Wand2,
    title: "Customize everything",
    description:
      "Fine-tune colors, typography, layout, spacing, and effects to match your vision.",
  },
  {
    icon: Eye,
    title: "See it live",
    description:
      "Watch your choices come alive in a real-time preview across landing page, e-commerce, and blog templates.",
  },
  {
    icon: Copy,
    title: "Copy your prompt",
    description:
      "Get a perfectly crafted, tool-specific prompt optimized for v0, Lovable, Figma Make, Claude Code, or Cursor.",
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
            Palette<span className="text-primary">Prompt</span>
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
            Free tool — No signup required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Stop writing vague
            <br />
            design prompts
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Pick your style visually, customize every detail, and get
            tool-optimized prompts that produce stunning results — not generic
            Bootstrap-looking output.
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

          {/* Tool badges */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <span className="text-xs text-muted-foreground mr-2">
              Optimized for:
            </span>
            {tools.map((tool) => (
              <span
                key={tool.name}
                className={`px-2.5 py-1 text-xs font-medium rounded-md ${tool.color}`}
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            How it works
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Four steps from vision to prompt. No design skills needed.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-4 p-6 bg-background rounded-xl border border-border"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            20 curated visual styles
          </h2>
          <p className="text-muted-foreground mb-10">
            From Neo-Brutalist to Glassmorphism, each style comes with curated
            colors, fonts, and tokens ready to go.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {styleNames.map((style) => (
              <span
                key={style}
                className="px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            The Semantic Translation Gap
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-background rounded-xl border border-destructive/30">
              <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-3">
                What you type
              </p>
              <p className="text-sm italic text-muted-foreground">
                &quot;Make it look edgy and modern with a dark theme&quot;
              </p>
              <p className="text-xs text-destructive mt-3">
                Result: Generic dark UI with default shadows
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-green-500/30">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">
                What PalettePrompt generates
              </p>
              <p className="text-sm italic text-muted-foreground">
                &quot;Apply a Neo-Brutalist aesthetic with 3px black borders,
                hard 4px offset shadows, no border radius. Color palette: bg
                #000, primary #CCFF00, text #FFF. Use Space Mono for headings at
                700 weight...&quot;
              </p>
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
          Built with Next.js, Tailwind CSS, and shadcn/ui. PalettePrompt is a
          free, open tool.
        </p>
      </footer>
    </div>
  );
}
