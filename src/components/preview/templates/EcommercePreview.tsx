"use client";

import { useWizardStore } from "@/store/wizard-store";
import { RADIUS_MAP, SHADOW_MAP, DENSITY_MAP } from "@/types";
import { getColorTheme, generatePaletteFromBrand, isColorDark } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { getStyleById } from "@/data/styles";
import { Star, ShoppingCart, Heart, Menu } from "lucide-react";

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

const productImages: Record<string, string> = {
  "Leather Jacket": "1551028719-00167b16eac5",
  "Minimalist Watch": "1523275335684-37898b6baf30",
  "Canvas Sneakers": "1542291026-7eec264c27ff",
  "Wool Blend Coat": "1539533018447-4520e521b924",
};

const products = [
  { name: "Leather Jacket", price: "$249", rating: 4.8, reviews: 124, badge: "Best Seller" },
  { name: "Minimalist Watch", price: "$189", rating: 4.9, reviews: 89, badge: "New" },
  { name: "Canvas Sneakers", price: "$79", rating: 4.6, reviews: 256, badge: null },
  { name: "Wool Blend Coat", price: "$329", rating: 4.7, reviews: 67, badge: "Limited" },
];

const categories = ["All", "Clothing", "Accessories", "Shoes"];

export function EcommercePreview() {
  const { c, r, cardR, s, d, headingFont, bodyFont, glow } = usePreviewStyles();

  return (
    <div style={{ fontFamily: bodyFont }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${c.border}` }}
      >
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 16, color: c.foreground }}>
          STORE
        </span>
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCart className="h-4 w-4" style={{ color: c.foreground, opacity: 0.6 }} />
            <span
              className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold"
              style={{
                backgroundColor: c.primary,
                color: c.background,
                borderRadius: "999px",
              }}
            >
              3
            </span>
          </div>
          <Menu className="h-4 w-4" style={{ color: c.foreground, opacity: 0.5 }} />
        </div>
      </nav>

      {/* Category pills */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto" style={{ borderBottom: `1px solid ${c.border}` }}>
        {categories.map((cat, i) => (
          <span
            key={cat}
            className="text-[10px] font-medium px-2.5 py-1 shrink-0"
            style={{
              color: i === 0 ? c.background : c.foreground,
              backgroundColor: i === 0 ? c.primary : "transparent",
              borderRadius: r,
              opacity: i === 0 ? 1 : 0.6,
              border: i === 0 ? "none" : `1px solid ${c.border}`,
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Products */}
      <section className={`${d.section} px-4`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold" style={{ fontFamily: headingFont, color: c.foreground }}>
              Trending Now
            </h2>
            <span className="text-[10px]" style={{ color: c.foreground, opacity: 0.5 }}>
              {products.length} items
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.name}
                className="flex overflow-hidden"
                style={{
                  borderRadius: cardR,
                  boxShadow: s,
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.background,
                }}
              >
                {/* Product image */}
                <div
                  className="relative w-24 shrink-0 overflow-hidden"
                  style={{ backgroundColor: c.muted }}
                >
                  <img
                    src={`https://images.unsplash.com/photo-${productImages[product.name]}?auto=format&fit=crop&w=96&q=80`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  {product.badge && (
                    <span
                      className="absolute top-1.5 left-1.5 text-[8px] font-bold px-1.5 py-0.5"
                      style={{
                        backgroundColor: c.primary,
                        color: c.background,
                        borderRadius: r,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-sm font-semibold mb-0.5 truncate" style={{ color: c.foreground }}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-1.5">
                      <Star className="h-3 w-3 fill-current" style={{ color: c.accent }} />
                      <span className="text-[10px] font-medium" style={{ color: c.foreground }}>
                        {product.rating}
                      </span>
                      <span className="text-[10px]" style={{ color: c.foreground, opacity: 0.4 }}>
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm" style={{ color: c.foreground }}>
                      {product.price}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1"
                      style={{
                        backgroundColor: c.primary,
                        color: c.background,
                        borderRadius: r,
                        ...(glow ? { boxShadow: `0 0 12px ${c.primary}40` } : {}),
                      }}
                    >
                      Add
                    </span>
                  </div>
                </div>

                <button
                  className="px-2 flex items-start pt-3"
                >
                  <Heart className="h-3.5 w-3.5" style={{ color: c.foreground, opacity: 0.3 }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-4 py-6 text-center text-[10px]"
        style={{ borderTop: `1px solid ${c.border}`, color: c.foreground, opacity: 0.4 }}
      >
        &copy; 2026 STORE. All rights reserved.
      </footer>
    </div>
  );
}
