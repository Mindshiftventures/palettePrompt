"use client";

import { useWizardStore } from "@/store/wizard-store";
import { RADIUS_MAP, SHADOW_MAP, DENSITY_MAP } from "@/types";
import { getColorTheme, generatePaletteFromBrand } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { Clock, User, Tag, ArrowRight, Bookmark } from "lucide-react";

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
  const s = SHADOW_MAP[state.shadowStyle];
  const d = DENSITY_MAP[state.density];
  const headingFont = fontPairing ? `'${fontPairing.heading.family}', sans-serif` : "sans-serif";
  const bodyFont = fontPairing ? `'${fontPairing.body.family}', sans-serif` : "sans-serif";
  const glow = state.effects.glow;

  return { c, r, s, d, headingFont, bodyFont, glow };
}

const posts = [
  {
    title: "The Future of Design Systems in 2026",
    excerpt: "How design tokens and component libraries are reshaping the way teams build products at scale.",
    author: "Alex Rivera",
    date: "Feb 12, 2026",
    readTime: "8 min read",
    tag: "Design",
    featured: true,
  },
  {
    title: "Understanding Color Theory for Digital Products",
    excerpt: "A practical guide to choosing colors that communicate your brand values effectively.",
    author: "Maya Patel",
    date: "Feb 10, 2026",
    readTime: "5 min read",
    tag: "Color",
    featured: false,
  },
  {
    title: "Typography Best Practices for the Web",
    excerpt: "Font pairing strategies, sizing scales, and line heights that make your content shine.",
    author: "Chris Yang",
    date: "Feb 8, 2026",
    readTime: "6 min read",
    tag: "Typography",
    featured: false,
  },
  {
    title: "Building Accessible UI Components",
    excerpt: "Step-by-step guide to creating components that work for everyone, regardless of ability.",
    author: "Sam Torres",
    date: "Feb 5, 2026",
    readTime: "10 min read",
    tag: "Engineering",
    featured: false,
  },
];

const sidebarTags = ["Design", "Typography", "Color", "Engineering", "Product", "UX Research"];

export function BlogPreview() {
  const { c, r, s, d, headingFont, bodyFont, glow } = usePreviewStyles();

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div style={{ fontFamily: bodyFont }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: `1px solid ${c.border}` }}
      >
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 18, color: c.foreground }}>
          The Design Blog
        </span>
        <div className="flex items-center gap-5">
          {["Articles", "Tutorials", "Resources"].map((item) => (
            <span key={item} className="text-sm" style={{ color: c.foreground, opacity: 0.7 }}>
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Featured article */}
      <section className={`${d.section} px-6`}>
        <div className="max-w-4xl mx-auto">
          <div
            className="overflow-hidden"
            style={{
              borderRadius: r,
              boxShadow: s,
              border: `1px solid ${c.border}`,
              backgroundColor: c.background,
            }}
          >
            {/* Featured image placeholder */}
            <div className="aspect-[2/1]" style={{ backgroundColor: c.muted }}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm" style={{ color: c.foreground, opacity: 0.2 }}>
                  Featured Image
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-0.5"
                  style={{
                    backgroundColor: c.primary + "15",
                    color: c.primary,
                    borderRadius: r,
                  }}
                >
                  {featured.tag}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: c.foreground, opacity: 0.5 }}>
                  <Clock className="h-3 w-3" /> {featured.readTime}
                </span>
              </div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: headingFont, color: c.foreground }}
              >
                {featured.title}
              </h2>
              <p className="text-sm mb-4" style={{ color: c.foreground, opacity: 0.6 }}>
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 flex items-center justify-center"
                    style={{ backgroundColor: c.muted, borderRadius: "999px" }}
                  >
                    <User className="h-3.5 w-3.5" style={{ color: c.foreground, opacity: 0.5 }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: c.foreground }}>
                      {featured.author}
                    </p>
                    <p className="text-[10px]" style={{ color: c.foreground, opacity: 0.4 }}>
                      {featured.date}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: c.primary }}
                >
                  Read more <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid + Sidebar */}
      <section className={`${d.section} px-6`} style={{ backgroundColor: c.muted + "40" }}>
        <div className="max-w-4xl mx-auto flex gap-8">
          {/* Articles */}
          <div className="flex-1 space-y-4">
            {rest.map((post) => (
              <div
                key={post.title}
                className="flex gap-4 p-4"
                style={{
                  borderRadius: r,
                  boxShadow: s,
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.background,
                }}
              >
                {/* Thumbnail */}
                <div
                  className="w-24 h-24 shrink-0"
                  style={{ backgroundColor: c.muted, borderRadius: r }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5"
                      style={{
                        backgroundColor: c.primary + "15",
                        color: c.primary,
                        borderRadius: r,
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-[10px]" style={{ color: c.foreground, opacity: 0.4 }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-sm mb-1 truncate"
                    style={{ fontFamily: headingFont, color: c.foreground }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs line-clamp-2" style={{ color: c.foreground, opacity: 0.6 }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-medium" style={{ color: c.foreground, opacity: 0.5 }}>
                      {post.author}
                    </span>
                    <span className="text-[10px]" style={{ color: c.foreground, opacity: 0.3 }}>
                      {post.date}
                    </span>
                  </div>
                </div>
                <Bookmark className="h-4 w-4 shrink-0 mt-1" style={{ color: c.foreground, opacity: 0.3 }} />
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-48 shrink-0 hidden md:block space-y-6">
            {/* Tags */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: c.foreground, opacity: 0.5 }}
              >
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {sidebarTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1"
                    style={{
                      border: `1px solid ${c.border}`,
                      borderRadius: r,
                      color: c.foreground,
                      opacity: 0.7,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div
              className="p-4"
              style={{
                borderRadius: r,
                backgroundColor: c.primary + "10",
                border: `1px solid ${c.primary}30`,
              }}
            >
              <h3
                className="text-sm font-bold mb-1"
                style={{ fontFamily: headingFont, color: c.foreground }}
              >
                Newsletter
              </h3>
              <p className="text-xs mb-3" style={{ color: c.foreground, opacity: 0.6 }}>
                Get weekly design insights delivered to your inbox.
              </p>
              <div
                className="w-full h-8 mb-2"
                style={{
                  backgroundColor: c.background,
                  borderRadius: r,
                  border: `1px solid ${c.border}`,
                }}
              />
              <div
                className="w-full h-8 flex items-center justify-center text-xs font-semibold"
                style={{
                  backgroundColor: c.primary,
                  color: c.background,
                  borderRadius: r,
                  ...(glow ? { boxShadow: `0 0 12px ${c.primary}40` } : {}),
                }}
              >
                Subscribe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center text-xs"
        style={{ borderTop: `1px solid ${c.border}`, color: c.foreground, opacity: 0.4 }}
      >
        &copy; 2026 The Design Blog. All rights reserved.
      </footer>
    </div>
  );
}
