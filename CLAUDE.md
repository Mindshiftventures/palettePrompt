# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PaletteKit** is a visual design-to-prompt generator that helps users create tool-optimized prompts for AI coding assistants (v0, Lovable, Figma Make, Claude Code, Cursor). Users pick a visual style, customize colors/typography/layout/effects, see a live preview, and get a perfectly crafted prompt tailored to their chosen tool.

The app is entirely client-side (no backend required). It's free and requires no signup.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Components**: shadcn/ui (customized)
- **Icons**: Lucide React
- **State Management**: Zustand
- **Language**: TypeScript
- **CSS Classes**: clsx, tailwind-merge
- **Component Utilities**: class-variance-authority

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page (marketing site)
│   ├── builder/page.tsx         # Main wizard/builder interface
│   ├── layout.tsx               # Root layout with TooltipProvider
│   └── globals.css              # Global styles, Tailwind imports
├── components/
│   ├── ui/                      # shadcn/ui components (button, card, slider, etc.)
│   └── wizard/                  # Wizard-specific components
│       ├── WizardShell.tsx      # Multi-step wizard container
│       ├── StyleCard.tsx        # Style selection card
│       └── steps/               # Individual wizard steps
│           ├── StyleStep.tsx
│           ├── TypographyStep.tsx
│           ├── LayoutStep.tsx
│           └── EffectsStep.tsx
├── store/
│   └── wizard-store.ts          # Zustand store for wizard state (colors, fonts, layout, etc.)
├── lib/
│   ├── prompt-engine.ts         # Core prompt generation logic (builds tool-specific prompts)
│   └── utils.ts                 # Utility helpers
├── data/                        # Configuration data (not code)
│   ├── styles.ts               # 20 visual styles (Neo-Brutalist, Glassmorphism, etc.)
│   ├── colors.ts               # Color palettes and generation logic
│   ├── typography.ts           # Font pairings
│   └── layouts.ts              # Layout templates
└── types/
    └── index.ts                # TypeScript type definitions
```

## Key Architecture Patterns

### State Management (Zustand)
- Single store: `useWizardStore` in `/src/store/wizard-store.ts`
- Stores: current step, style selections, colors, typography, layout, density, effects
- Use `useWizardStore()` hook in components to access/update state

### Prompt Generation
- `prompt-engine.ts` contains the core logic for generating tool-specific prompts
- Builds prompts by combining style, color, typography, layout, and effects sections
- Different role/context templates for v0, Lovable, Figma Make, Claude Code, Cursor
- Outputs are optimized for each tool's specific strengths

### Data-Driven Design
- Styles, colors, fonts, and layouts are defined as data in `/src/data/`
- Each has an ID-based lookup system (e.g., `getStyleById()`, `getColorTheme()`)
- Easy to add new styles, colors, or layouts without changing component code

### Component Composition
- Wizard uses a step-based flow: `WizardShell` wraps individual step components
- Steps are self-contained and pull/update state from Zustand
- Preview components render real examples based on current selections

## Common Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building
npm run build            # Build for production
npm start               # Start production server

# Linting
npm run lint            # Run ESLint (flat config, includes Next.js + TypeScript rules)

# Testing (if added)
npm run test            # Run tests (not yet configured)
```

## Testing Strategy

Currently, there are **no tests configured**. When adding tests:

1. **E2E Testing Recommended**: Use Playwright to test the wizard flow end-to-end:
   - User selects a style → verifies preview updates
   - User customizes colors/fonts → verifies prompt generation
   - User exports prompt → verifies formatting for each tool

   This is preferred because the app is heavily UI-driven with visual feedback.

2. **Unit Tests (Secondary)**: Test `prompt-engine.ts` functions:
   - `buildStyleSection()`, `buildColorSection()`, etc.
   - Color palette generation
   - Tool-specific prompt formatting

3. **Manual Testing**: Build and run locally (`npm run dev`), walk through the wizard, and verify prompts make sense for each tool target.

## Important Files to Know

| File | Purpose |
|------|---------|
| `src/store/wizard-store.ts` | Single source of truth for all user selections in the wizard |
| `src/lib/prompt-engine.ts` | Generates tool-optimized prompts from wizard state |
| `src/app/builder/page.tsx` | Main wizard interface (orchestrates steps and preview) |
| `src/components/wizard/WizardShell.tsx` | Multi-step wizard container (step navigation logic) |
| `src/data/styles.ts` | 20 visual styles with prompt segments and keywords |
| `src/data/colors.ts` | Color palettes and brand color → palette generation |
| `src/data/typography.ts` | Font pairings (heading + body fonts) |
| `src/types/index.ts` | All TypeScript types (WizardState, PageType, ToolTarget, etc.) |

## Type System

Key types in `/src/types/index.ts`:
- `WizardState` - Complete wizard configuration state
- `PageType` - "landing" | "ecommerce" | "blog"
- `ToolTarget` - "v0" | "lovable" | "figma-make" | "claude-code" | "cursor"
- `StyleId`, `LayoutId`, `DensityLevel`, `RadiusToken`, `ShadowToken` - Specific selectors
- `WizardStore` - Zustand store interface

## Linting

- ESLint runs with flat config (`eslint.config.mjs`)
- Includes Next.js core web vitals + TypeScript rules
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Run `npm run lint` to check for issues

## Styling Approach

- **Tailwind CSS 4**: Primary styling method with CSS variables for theming
- **shadcn/ui**: Headless UI components (Button, Card, Slider, Switch, Tabs, etc.)
- **CSS Variables**: Define colors as CSS variables in `globals.css`, referenced in Tailwind config
- **Utility-first**: Prefer Tailwind classes over custom CSS
- **Responsive**: Use `md:` breakpoint prefix for responsive designs

## Notes on Data Files

The `/src/data/` directory contains configuration, not logic:
- **styles.ts**: Define new styles by adding objects with `promptSegment` and `promptKeywords`
- **colors.ts**: Palettes are static maps; brand color generation uses color science library
- **typography.ts**: Font pairings map to Google Fonts imports
- **layouts.ts**: Layout templates with CSS/component guidance

Adding new styles, colors, or layouts is straightforward — add data, create a UI component to let users select it, and the prompt engine automatically incorporates it.

## Development Tips

1. **Live Reload**: Changes to files automatically reload in dev mode
2. **Zustand DevTools**: Can add Redux DevTools browser extension to inspect store state/actions
3. **Preview Component**: The builder page shows a live preview as users make selections — test changes against all page types (landing, ecommerce, blog)
4. **Tool-Specific Output**: Always verify prompts are valid for the target tool (v0, Lovable, Figma Make, Claude Code, Cursor)
5. **Semantic Release**: Use `npm run lint` before committing to catch issues early
