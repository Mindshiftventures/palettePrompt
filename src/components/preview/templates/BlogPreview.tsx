"use client";

import { useWizardStore } from "@/store/wizard-store";
import { RADIUS_MAP, SHADOW_MAP, DENSITY_MAP } from "@/types";
import { getColorTheme, generatePaletteFromBrand, isColorDark } from "@/data/colors";
import { getFontPairing } from "@/data/typography";
import { getStyleById } from "@/data/styles";
import { Clock, User, ArrowRight, Bookmark, Menu } from "lucide-react";

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

const articleImages: Record<string, string> = {
  "Color": "1541701494587-cb58502866ab",
  "Typography": "1456513080510-7bf3a84b82f8",
  "Engineering": "1461749280684-dccba630e2f6",
};

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
    excerpt: "A practical guide to choosing colors that communicate your brand values.",
    author: "Maya Patel",
    date: "Feb 10, 2026",
    readTime: "5 min read",
    tag: "Color",
    featured: false,
  },
  {
    title: "Typography Best Practices for the Web",
    excerpt: "Font pairing strategies and sizing scales that make your content shine.",
    author: "Chris Yang",
    date: "Feb 8, 2026",
    readTime: "6 min read",
    tag: "Typography",
    featured: false,
  },
  {
    title: "Building Accessible UI Components",
    excerpt: "Creating components that work for everyone, regardless of ability.",
    author: "Sam Torres",
    date: "Feb 5, 2026",
    readTime: "10 min read",
    tag: "Engineering",
    featured: false,
  },
];

export function BlogPreview() {
  const { c, r, cardR, s, d, headingFont, bodyFont, glow } = usePreviewStyles();

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div style={{ fontFamily: bodyFont }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${c.border}` }}
      >
        <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 14, color: c.foreground }}>
          The Design Blog
        </span>
        <Menu className="h-4 w-4" style={{ color: c.foreground, opacity: 0.5 }} />
      </nav>

      {/* Featured article */}
      <section className={`${d.section} px-4`}>
        <div className="max-w-4xl mx-auto">
          <div
            className="overflow-hidden"
            style={{
              borderRadius: cardR,
              boxShadow: s,
              border: `1px solid ${c.border}`,
              backgroundColor: c.background,
            }}
          >
            {/* Featured image */}
            <div className="aspect-[2/1] overflow-hidden" style={{ backgroundColor: c.muted }}>
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
                alt="Featured"
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5"
                  style={{
                    backgroundColor: c.primary + "15",
                    color: c.primary,
                    borderRadius: r,
                  }}
                >
                  {featured.tag}
                </span>
                <span className="flex items-center gap-1 text-[10px]" style={{ color: c.foreground, opacity: 0.5 }}>
                  <Clock className="h-2.5 w-2.5" /> {featured.readTime}
                </span>
              </div>
              <h2
                className="text-lg font-bold mb-1"
                style={{ fontFamily: headingFont, color: c.foreground }}
              >
                {featured.title}
              </h2>
              <p className="text-xs mb-3" style={{ color: c.foreground, opacity: 0.6 }}>
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 flex items-center justify-center"
                    style={{ backgroundColor: c.muted, borderRadius: "999px" }}
                  >
                    <User className="h-3 w-3" style={{ color: c.foreground, opacity: 0.5 }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium" style={{ color: c.foreground }}>
                      {featured.author}
                    </p>
                    <p className="text-[8px]" style={{ color: c.foreground, opacity: 0.4 }}>
                      {featured.date}
                    </p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-semibold flex items-center gap-1"
                  style={{ color: c.primary }}
                >
                  Read more <ArrowRight className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles list */}
      <section className={`${d.section} px-4`} style={{ backgroundColor: c.muted + "40" }}>
        <div className="max-w-4xl mx-auto space-y-3">
          {rest.map((post) => (
            <div
              key={post.title}
              className="flex gap-3 p-3"
              style={{
                borderRadius: cardR,
                boxShadow: s,
                border: `1px solid ${c.border}`,
                backgroundColor: c.background,
              }}
            >
              {/* Thumbnail */}
              <div
                className="w-16 h-16 shrink-0 overflow-hidden"
                style={{ backgroundColor: c.muted, borderRadius: cardR }}
              >
                {articleImages[post.tag] && (
                  <img
                    src={`https://images.unsplash.com/photo-${articleImages[post.tag]}?auto=format&fit=crop&w=128&h=128&q=80`}
                    alt={post.tag}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="text-[8px] font-semibold px-1.5 py-0.5"
                    style={{
                      backgroundColor: c.primary + "15",
                      color: c.primary,
                      borderRadius: r,
                    }}
                  >
                    {post.tag}
                  </span>
                  <span className="text-[8px]" style={{ color: c.foreground, opacity: 0.4 }}>
                    {post.readTime}
                  </span>
                </div>
                <h3
                  className="font-semibold text-xs mb-0.5 truncate"
                  style={{ fontFamily: headingFont, color: c.foreground }}
                >
                  {post.title}
                </h3>
                <p className="text-[10px] line-clamp-1" style={{ color: c.foreground, opacity: 0.6 }}>
                  {post.excerpt}
                </p>
              </div>
              <Bookmark className="h-3 w-3 shrink-0 mt-1" style={{ color: c.foreground, opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className={`${d.section} px-4`}>
        <div
          className="max-w-4xl mx-auto p-4 text-center"
          style={{
            borderRadius: cardR,
            backgroundColor: c.primary + "10",
            border: `1px solid ${c.primary}30`,
          }}
        >
          <h3
            className="text-sm font-bold mb-1"
            style={{ fontFamily: headingFont, color: c.foreground }}
          >
            Subscribe to our newsletter
          </h3>
          <p className="text-[10px] mb-3" style={{ color: c.foreground, opacity: 0.6 }}>
            Get weekly design insights delivered to your inbox.
          </p>
          <div
            className="mx-auto w-full max-w-[200px] h-7 flex items-center justify-center text-[10px] font-semibold"
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
      </section>

      {/* Footer */}
      <footer
        className="px-4 py-6 text-center text-[10px]"
        style={{ borderTop: `1px solid ${c.border}`, color: c.foreground, opacity: 0.4 }}
      >
        &copy; 2026 The Design Blog. All rights reserved.
      </footer>
    </div>
  );
}
