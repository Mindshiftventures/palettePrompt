"use client";

import { useWizardStore } from "@/store/wizard-store";
import { RADIUS_MAP, SHADOW_MAP, DENSITY_MAP } from "@/types";
import { getColorTheme, generatePaletteFromBrand, isColorDark } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { getStyleById } from "@/data/styles";
import { Star, ArrowRight, Check, Zap, Shield, Globe, Menu } from "lucide-react";

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

  return { c, r, cardR, s, d, headingFont, bodyFont, glow };
}

export function LandingPreview() {
  const { c, r, cardR, s, d, headingFont, bodyFont, glow } = usePreviewStyles();

  const btnStyle: React.CSSProperties = {
    backgroundColor: c.primary,
    color: c.background,
    borderRadius: r,
    boxShadow: s,
    padding: "10px 20px",
    fontWeight: 600,
    fontFamily: bodyFont,
    fontSize: 13,
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
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${c.border}` }}
      >
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 16, color: c.foreground }}>
          BrandName
        </span>
        <div className="flex items-center gap-3">
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
          <Menu className="h-4 w-4" style={{ color: c.foreground, opacity: 0.5 }} />
        </div>
      </nav>

      {/* Hero */}
      <section className={`${d.section} px-4`} style={{ textAlign: "center" }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block mb-3 text-[10px] px-2.5 py-1"
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
            className="text-2xl font-bold mb-3 leading-tight"
            style={{ fontFamily: headingFont, color: c.foreground }}
          >
            Build beautiful products faster than ever
          </h1>
          <p className="text-sm mb-6 mx-auto" style={{ color: c.foreground, opacity: 0.6 }}>
            The all-in-one platform that helps teams ship quality software with confidence.
          </p>
          <div className="flex flex-col items-center gap-2">
            <span style={btnStyle} className="inline-flex items-center gap-2">
              Start free trial <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium"
              style={{
                border: `1.5px solid ${c.border}`,
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
      <section className={`${d.section} px-4`} style={{ backgroundColor: c.muted + "40" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-lg font-bold text-center mb-1"
            style={{ fontFamily: headingFont, color: c.foreground }}
          >
            Everything you need
          </h2>
          <p className="text-center text-xs mb-6" style={{ color: c.foreground, opacity: 0.6 }}>
            Powerful features to help you build and scale
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance." },
              { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade security built in." },
              { icon: Globe, title: "Global Scale", desc: "Deploy to 30+ regions with one click." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-4" style={cardStyle}>
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: c.primary + "15", borderRadius: r }}
                  >
                    <Icon className="h-4 w-4" style={{ color: c.primary }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5" style={{ color: c.foreground, fontFamily: headingFont }}>
                      {title}
                    </h3>
                    <p className="text-xs" style={{ color: c.foreground, opacity: 0.6 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={`${d.section} px-4`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-current" style={{ color: c.accent }} />
            ))}
          </div>
          <blockquote
            className="text-sm italic mb-3"
            style={{ color: c.foreground, fontFamily: headingFont }}
          >
            &quot;This tool completely transformed our workflow. We shipped 3x faster.&quot;
          </blockquote>
          <p className="text-xs font-medium" style={{ color: c.foreground }}>
            Sarah Chen
          </p>
          <p className="text-[10px]" style={{ color: c.foreground, opacity: 0.5 }}>
            Head of Product, TechCorp
          </p>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className={`${d.section} px-4`} style={{ backgroundColor: c.primary + "08" }}>
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-lg font-bold mb-1" style={{ fontFamily: headingFont, color: c.foreground }}>
            Ready to get started?
          </h2>
          <p className="text-xs mb-4" style={{ color: c.foreground, opacity: 0.6 }}>
            Join 10,000+ teams already using our platform.
          </p>
          <div className="flex flex-col items-center gap-3">
            <span style={btnStyle} className="inline-flex items-center gap-2">
              Start your free trial <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10px]" style={{ color: c.foreground, opacity: 0.5 }}>
              {["No credit card", "14-day trial", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <Check className="h-2.5 w-2.5" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-4 py-6 text-center text-[10px]"
        style={{ borderTop: `1px solid ${c.border}`, color: c.foreground, opacity: 0.4 }}
      >
        &copy; 2026 BrandName. All rights reserved.
      </footer>
    </div>
  );
}
