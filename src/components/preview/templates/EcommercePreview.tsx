"use client";

import { useWizardStore } from "@/store/wizard-store";
import { RADIUS_MAP, SHADOW_MAP, DENSITY_MAP } from "@/types";
import { getColorTheme, generatePaletteFromBrand } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { Star, ShoppingCart, Heart, Search, SlidersHorizontal } from "lucide-react";

function usePreviewStyles() {
  const state = useWizardStore();
  const colorTheme = state.customBrandColor
    ? generatePaletteFromBrand(state.customBrandColor, false)
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

const products = [
  { name: "Classic Leather Jacket", price: "$249.00", rating: 4.8, reviews: 124, badge: "Best Seller" },
  { name: "Minimalist Watch", price: "$189.00", rating: 4.9, reviews: 89, badge: "New" },
  { name: "Canvas Sneakers", price: "$79.00", rating: 4.6, reviews: 256, badge: null },
  { name: "Wool Blend Coat", price: "$329.00", rating: 4.7, reviews: 67, badge: "Limited" },
  { name: "Silk Scarf", price: "$65.00", rating: 4.5, reviews: 43, badge: null },
  { name: "Denim Backpack", price: "$119.00", rating: 4.8, reviews: 178, badge: "Popular" },
];

const categories = ["All", "Clothing", "Accessories", "Shoes", "Bags"];

export function EcommercePreview() {
  const { c, r, cardR, s, d, headingFont, bodyFont, glow } = usePreviewStyles();

  return (
    <div style={{ fontFamily: bodyFont }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: `1px solid ${c.border}` }}
      >
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 18, color: c.foreground }}>
          STORE
        </span>
        <div className="flex items-center gap-5">
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{
              backgroundColor: c.muted,
              borderRadius: r,
              border: `1px solid ${c.border}`,
            }}
          >
            <Search className="h-3.5 w-3.5" style={{ color: c.foreground, opacity: 0.4 }} />
            <span className="text-xs" style={{ color: c.foreground, opacity: 0.4 }}>Search products...</span>
          </div>
          <Heart className="h-5 w-5" style={{ color: c.foreground, opacity: 0.6 }} />
          <div className="relative">
            <ShoppingCart className="h-5 w-5" style={{ color: c.foreground, opacity: 0.6 }} />
            <span
              className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: c.primary,
                color: c.background,
                borderRadius: "999px",
              }}
            >
              3
            </span>
          </div>
        </div>
      </nav>

      {/* Category nav */}
      <div className="px-6 py-3 flex items-center gap-4" style={{ borderBottom: `1px solid ${c.border}` }}>
        {categories.map((cat, i) => (
          <span
            key={cat}
            className="text-sm font-medium px-3 py-1"
            style={{
              color: i === 0 ? c.primary : c.foreground,
              opacity: i === 0 ? 1 : 0.6,
              borderBottom: i === 0 ? `2px solid ${c.primary}` : "none",
            }}
          >
            {cat}
          </span>
        ))}
        <div className="flex-1" />
        <SlidersHorizontal className="h-4 w-4" style={{ color: c.foreground, opacity: 0.5 }} />
      </div>

      {/* Products grid */}
      <section className={`${d.section} px-6`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ fontFamily: headingFont, color: c.foreground }}>
              Trending Now
            </h2>
            <span className="text-xs" style={{ color: c.foreground, opacity: 0.5 }}>
              {products.length} products
            </span>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-3 ${d.element}`}>
            {products.map((product) => (
              <div
                key={product.name}
                className="group flex flex-col overflow-hidden"
                style={{
                  borderRadius: cardR,
                  boxShadow: s,
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.background,
                }}
              >
                {/* Product image placeholder */}
                <div
                  className="relative aspect-square"
                  style={{ backgroundColor: c.muted }}
                >
                  {product.badge && (
                    <span
                      className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5"
                      style={{
                        backgroundColor: c.primary,
                        color: c.background,
                        borderRadius: r,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <button
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                    style={{
                      backgroundColor: c.background + "cc",
                      borderRadius: "999px",
                    }}
                  >
                    <Heart className="h-3.5 w-3.5" style={{ color: c.foreground, opacity: 0.5 }} />
                  </button>
                </div>

                {/* Product info */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-1" style={{ color: c.foreground }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-current" style={{ color: c.accent }} />
                    <span className="text-xs font-medium" style={{ color: c.foreground }}>
                      {product.rating}
                    </span>
                    <span className="text-xs" style={{ color: c.foreground, opacity: 0.4 }}>
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm" style={{ color: c.foreground }}>
                      {product.price}
                    </span>
                    <span
                      className="text-xs font-semibold px-3 py-1.5"
                      style={{
                        backgroundColor: c.primary,
                        color: c.background,
                        borderRadius: r,
                        ...(glow ? { boxShadow: `0 0 12px ${c.primary}40` } : {}),
                      }}
                    >
                      Add to Cart
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center text-xs"
        style={{ borderTop: `1px solid ${c.border}`, color: c.foreground, opacity: 0.4 }}
      >
        &copy; 2026 STORE. All rights reserved.
      </footer>
    </div>
  );
}
