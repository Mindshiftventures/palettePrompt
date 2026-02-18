"use client";

import { useWizardStore } from "@/store/wizard-store";
import { RADIUS_MAP, SHADOW_MAP, DENSITY_MAP } from "@/types";
import { getColorTheme, generatePaletteFromBrand, isColorDark } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { getStyleById } from "@/data/styles";
import { Star, ArrowRight, Check, Zap, Shield, Globe } from "lucide-react";

function usePreviewStyles() {
  const state = useWizardStore();
  const style = getStyleById(state.styleId);
  const styleIsDark = style ? isColorDark(style.tokens.bgBase) : false;
  const colorTheme = state.customBrandColor
    ? generatePaletteFromBrand(state.customBrandColor, styleIsDark)
    : getColorTheme(state.colorThemeId);
  const fontPairing = getFontPairing(state.fontPairingId);

  const c = colorTheme?.colors ?? {
    background: "#ffffff", foreground: "#000000", primary: "#6366f1",
    secondary: "#a855f7", accent: "#ec4899", muted: "#f1f5f9", border: "#e2e8f0",
  };
  const r = RADIUS_MAP[state.borderRadius];
  const cardR = r === "999px" ? "24px" : r;
  const s = SHADOW_MAP[state.shadowStyle];
  const d = DENSITY_MAP[state.density];
  const headingFont = fontPairing ? `'${fontPairing.heading.family}', sans-serif` : "sans-serif";
  const bodyFont = fontPairing ? `'${fontPairing.body.family}', sans-serif` : "sans-serif";
  const glow = state.effects.glow;

  return { c, r, cardR, s, d, headingFont, bodyFont, glow, state };
}

export function LandingPreview() {
  const { c, r, cardR, s, d, headingFont, bodyFont, glow, state } = usePreviewStyles();

  const btnStyle: React.CSSProperties = {
    backgroundColor: c.primary,
    color: c.background,
    borderRadius: r,
    boxShadow: s,
    padding: "12px 24px",
    fontWeight: 600,
    fontFamily: bodyFont,
    border: "none",
    ...(glow ? { boxShadow: `${s}, 0 0 20px ${c.primary}40` } : {}),
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: c.muted,
    borderRadius: cardR,
    boxShadow: s,
    border: `1px solid ${c.border}`,
    fontFamily: bodyFont,
  };

  return (
    <div style={{ fontFamily: bodyFont }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: `1px solid ${c.border}` }}
      >
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 18, color: c.foreground }}>
          BrandName
        </span>
        <div className="flex items-center gap-4">
          {["Features", "Pricing", "About"].map((item) => (
            <span key={item} className="text-xs hidden sm:inline" style={{ color: c.foreground, opacity: 0.7 }}>
              {item}
            </span>
          ))}
          <span
            className="text-xs px-3 py-1.5"
            style={{
              backgroundColor: c.primary,
              color: c.background,
              borderRadius: r,
              fontWeight: 600,
            }}
          >
            Get Started
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className={`${d.section} px-6`} style={{ textAlign: "center" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block mb-4 text-xs px-3 py-1"
            style={{
              backgroundColor: c.primary + "15",
              color: c.primary,
              borderRadius: r,
              fontWeight: 600,
            }}
          >
            Introducing something new
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: headingFont, color: c.foreground }}
          >
            Build beautiful products faster than ever
          </h1>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: c.foreground, opacity: 0.6 }}>
            The all-in-one platform that helps teams ship quality software with confidence and speed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span style={btnStyle} className="inline-flex items-center gap-2 text-sm">
              Start free trial <ArrowRight className="h-4 w-4" />
            </span>
            <span
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium"
              style={{
                border: `2px solid ${c.border}`,
                borderRadius: r,
                color: c.foreground,
              }}
            >
              Watch demo
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`${d.section} px-6`} style={{ backgroundColor: c.muted + "40" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-2"
            style={{ fontFamily: headingFont, color: c.foreground }}
          >
            Everything you need
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: c.foreground, opacity: 0.6 }}>
            Powerful features to help you build and scale
          </p>
          <div className={`grid grid-cols-1 sm:grid-cols-3 ${d.element}`}>
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance at every level." },
              { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade security with zero configuration." },
              { icon: Globe, title: "Global Scale", desc: "Deploy to 30+ regions with one-click scaling." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className={d.element} style={cardStyle}>
                <div
                  className="w-10 h-10 flex items-center justify-center mb-3"
                  style={{ backgroundColor: c.primary + "15", borderRadius: r }}
                >
                  <Icon className="h-5 w-5" style={{ color: c.primary }} />
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: c.foreground, fontFamily: headingFont }}>
                  {title}
                </h3>
                <p className="text-xs" style={{ color: c.foreground, opacity: 0.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={`${d.section} px-6`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-current" style={{ color: c.accent }} />
            ))}
          </div>
          <blockquote
            className="text-lg italic mb-4"
            style={{ color: c.foreground, fontFamily: headingFont }}
          >
            &quot;This tool completely transformed our workflow. We shipped our redesign 3x faster than expected.&quot;
          </blockquote>
          <p className="text-sm font-medium" style={{ color: c.foreground }}>
            Sarah Chen
          </p>
          <p className="text-xs" style={{ color: c.foreground, opacity: 0.5 }}>
            Head of Product, TechCorp
          </p>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className={`${d.section} px-6`} style={{ backgroundColor: c.primary + "08" }}>
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: headingFont, color: c.foreground }}>
            Ready to get started?
          </h2>
          <p className="text-sm mb-6" style={{ color: c.foreground, opacity: 0.6 }}>
            Join 10,000+ teams already using our platform.
          </p>
          <div className="flex flex-col items-center gap-3">
            <span style={btnStyle} className="inline-flex items-center gap-2">
              Start your free trial <ArrowRight className="h-4 w-4" />
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs" style={{ color: c.foreground, opacity: 0.5 }}>
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <Check className="h-3 w-3" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center text-xs"
        style={{ borderTop: `1px solid ${c.border}`, color: c.foreground, opacity: 0.4 }}
      >
        &copy; 2026 BrandName. All rights reserved.
      </footer>
    </div>
  );
}
