import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroStyleDemo } from "@/components/home/HeroStyleDemo";
import { StyleShowcase } from "@/components/home/StyleShowcase";
import { toolLogos } from "@/components/shared/ToolLogos";
import type { ToolTarget } from "@/types";

const toolOrder: ToolTarget[] = [
  "v0",
  "lovable",
  "figma-make",
  "claude-code",
  "cursor",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAF9] overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 lg:px-10 py-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="font-semibold text-sm tracking-tight text-[#E4E4E7]">
            Palette<span className="text-amber-400">Kit</span>
          </span>
        </div>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#09090B] bg-[#FAFAF9] rounded-md hover:bg-[#E4E4E7] transition-colors"
        >
          Open Builder
          <ArrowRight className="h-3 w-3" />
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative grid-bg">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] rounded-full bg-amber-500/[0.04] blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] rounded-full bg-violet-500/[0.03] blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 sm:pt-20 pb-20 sm:pb-28">
          <div className="lg:grid lg:grid-cols-[1.15fr_0.85fr] gap-12 xl:gap-20 items-center">
            {/* Left: Copy */}
            <div>
              <p className="animate-fade-in-up text-xs font-mono tracking-[0.2em] uppercase text-[#71717A] mb-6">
                Design-to-prompt generator
              </p>

              <h1 className="animate-fade-in-up animation-delay-100 font-serif-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] mb-7 tracking-[-0.01em]">
                AI can code anything.
                <br />
                It just can&rsquo;t read
                <br />
                <em className="text-amber-400">your mind.</em>
              </h1>

              <p className="animate-fade-in-up animation-delay-200 text-base sm:text-lg text-[#A1A1AA] max-w-lg mb-10 leading-relaxed">
                You know exactly what you want. Your prompt doesn&rsquo;t say
                it. PaletteKit lets you visually define your style &mdash;
                colors, type, spacing, effects &mdash; then generates a prompt
                your AI tool actually understands.
              </p>

              <div className="animate-fade-in-up animation-delay-300 flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-[#09090B] bg-[#FAFAF9] rounded-md hover:bg-[#E4E4E7] transition-colors"
                >
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-xs text-[#52525B]">
                  Free &middot; No signup &middot; In-browser
                </span>
              </div>

              {/* Tool logos */}
              <div className="animate-fade-in-up animation-delay-400 flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#52525B] mr-1">
                  Works with
                </span>
                {toolOrder.map((id) => {
                  const Logo = toolLogos[id];
                  return (
                    <Logo
                      key={id}
                      className="h-6 w-6 opacity-50 hover:opacity-80 transition-opacity"
                    />
                  );
                })}
              </div>
            </div>

            {/* Right: Live demo */}
            <div className="mt-14 lg:mt-0">
              <HeroStyleDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
      </div>

      {/* ── The Prompt Gap ── */}
      <section className="py-20 sm:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#52525B] mb-4 text-center">
            The problem
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-display text-center mb-4 leading-tight">
            You say &ldquo;clean and modern.&rdquo;
            <br />
            <span className="text-[#52525B]">
              AI hears &ldquo;gray boxes.&rdquo;
            </span>
          </h2>
          <p className="text-sm text-[#71717A] text-center max-w-md mx-auto mb-14">
            Vague design language produces vague output. PaletteKit makes your
            intent precise.
          </p>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-6 items-stretch">
            {/* Before */}
            <div className="rounded-lg border border-[#27272A] bg-[#111113] overflow-hidden flex flex-col">
              <div className="px-5 py-3 border-b border-[#27272A] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                  Your prompt
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm italic text-[#71717A] mb-5 leading-relaxed">
                  &ldquo;Make it look edgy and modern with a dark theme&rdquo;
                </p>
                {/* Generic mockup */}
                <div className="mt-auto rounded-md border border-[#27272A] bg-[#1a1a1d] p-3 space-y-2">
                  <div className="h-2 w-20 bg-[#3f3f46] rounded" />
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 bg-[#27272A] rounded" />
                    <div className="h-8 flex-1 bg-[#27272A] rounded" />
                  </div>
                  <div className="h-2.5 w-full bg-[#27272A] rounded" />
                  <div className="h-2.5 w-3/4 bg-[#27272A] rounded" />
                </div>
                <p className="text-[10px] text-[#52525B] mt-3 font-mono">
                  Result: Generic. Forgettable. Not what you meant.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
                <div className="w-8 h-8 rounded-full border border-amber-400/30 flex items-center justify-center">
                  <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
              </div>
            </div>
            <div className="md:hidden flex items-center justify-center py-1">
              <ArrowRight className="h-4 w-4 text-amber-400 rotate-90" />
            </div>

            {/* After */}
            <div className="rounded-lg border border-[#27272A] bg-[#111113] overflow-hidden flex flex-col">
              <div className="px-5 py-3 border-b border-[#27272A] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                  PaletteKit prompt
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm italic text-[#A1A1AA] mb-5 leading-relaxed">
                  &ldquo;Neo-Brutalist: 3px black borders, hard 4px offset
                  shadows, 0px radius. Palette: bg #000, primary #CCFF00,
                  font: Space Mono 700...&rdquo;
                </p>
                {/* Styled mockup */}
                <div className="mt-auto border-2 border-[#CCFF00] bg-[#0a0a0a] p-3 space-y-2">
                  <div className="h-2 w-20 bg-[#CCFF00]" />
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 bg-[#CCFF00] border-2 border-[#CCFF00]" />
                    <div className="h-8 flex-1 bg-transparent border-2 border-[#CCFF00]" />
                  </div>
                  <div className="h-2.5 w-full bg-[#333]" />
                  <div className="h-2.5 w-3/4 bg-[#333]" />
                </div>
                <p className="text-[10px] text-emerald-400/70 mt-3 font-mono">
                  Result: Exactly what you envisioned.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
      </div>

      {/* ── Styles Gallery ── */}
      <section className="py-20 sm:py-28 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#52525B] mb-3">
                Style library
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif-display leading-tight">
                20 styles. Zero guesswork.
              </h2>
            </div>
            <p className="text-sm text-[#71717A] max-w-sm leading-relaxed">
              Each style is a complete design system &mdash; colors, typography,
              spacing, effects &mdash; embedded directly in your prompt.
            </p>
          </div>
          <StyleShowcase />
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
      </div>

      {/* ── Process ── */}
      <section className="py-20 sm:py-28 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#52525B] mb-4 text-center">
            How it works
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif-display text-center mb-14 leading-tight">
            Pick. Tune. Prompt.
          </h2>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
            {[
              {
                step: "01",
                title: "Pick your style",
                desc: "Choose from 20 curated visual aesthetics. Each one sets up colors, fonts, borders, shadows, and effects.",
              },
              {
                step: "02",
                title: "Tune the details",
                desc: "Adjust colors, typography, spacing density, border radius, and visual effects. Preview changes live.",
              },
              {
                step: "03",
                title: "Copy your prompt",
                desc: "Get a detailed, tool-specific prompt optimized for v0, Lovable, Figma Make, Claude Code, or Cursor.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <span className="text-4xl font-serif-display text-[#1a1a1e] select-none">
                  {step}
                </span>
                <h3 className="text-sm font-semibold text-[#E4E4E7] mt-3 mb-2">
                  {title}
                </h3>
                <p className="text-xs text-[#71717A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/[0.04] blur-[100px]" />
        </div>

        <div className="relative max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif-display mb-4">
            Better prompts. Better output.
          </h2>
          <p className="text-sm text-[#71717A] mb-8">
            Free. No signup. Just open the builder and start.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#09090B] bg-[#FAFAF9] rounded-md hover:bg-[#E4E4E7] transition-colors"
          >
            Open the builder
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 lg:px-10 border-t border-[#1a1a1e]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400/50" />
            <span className="text-xs text-[#52525B]">
              Palette<span className="text-[#71717A]">Kit</span>
            </span>
          </div>
          <p className="text-[10px] text-[#3f3f46]">
            Built with Next.js, Tailwind CSS &amp; shadcn/ui. Free and open.
          </p>
        </div>
      </footer>
    </div>
  );
}
