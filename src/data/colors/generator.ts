import type { ColorTheme } from "@/types";

// ─── HSL Helpers ───────────────────────────────────────────────────

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

/**
 * Parse a hex color string (e.g. "#FF6600" or "FF6600") into HSL values.
 */
function hexToHsl(hex: string): HSL {
  // Strip leading #
  const cleaned = hex.replace(/^#/, "");

  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / delta + 2) * 60;
        break;
      case b:
        h = ((r - g) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert an HSL value back to a hex color string.
 */
function hslToHex(hsl: HSL): string {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (v: number): string => {
    const hex = Math.round((v + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Clamp a number between a min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Shift the hue by a given number of degrees, wrapping around 360.
 */
function shiftHue(h: number, degrees: number): number {
  return ((h + degrees) % 360 + 360) % 360;
}

// ─── WCAG Contrast Helpers ────────────────────────────────────────

/**
 * Calculate the relative luminance of a hex color per WCAG 2.1.
 */
export function relativeLuminance(hex: string): number {
  const cleaned = hex.replace(/^#/, "");
  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Returns true if the given hex color is perceptually dark (luminance < 0.2).
 */
export function isColorDark(hex: string): boolean {
  return relativeLuminance(hex) < 0.2;
}

/**
 * Calculate the WCAG contrast ratio between two hex colors.
 */
function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── Main Generator ────────────────────────────────────────────────

/**
 * Generate a full ColorTheme from a single brand hex color.
 *
 * The function uses HSL manipulation to derive a harmonious palette:
 * - background: light or dark depending on `isDark` flag
 * - foreground: high-contrast opposite of background
 * - primary: the brand color itself
 * - secondary: hue shifted ~30 degrees with adjusted saturation
 * - accent: complementary color (hue shifted ~180 degrees)
 * - muted: desaturated version of background
 * - border: subtle gray tinted toward the brand hue
 */
export function generatePaletteFromBrand(
  brandColor: string,
  isDark: boolean
): ColorTheme {
  const brand = hexToHsl(brandColor);

  // Background
  const background: HSL = isDark
    ? { h: brand.h, s: clamp(brand.s * 0.15, 3, 15), l: 7 }
    : { h: brand.h, s: clamp(brand.s * 0.12, 3, 12), l: 98 };

  // Foreground (high contrast against background)
  const foreground: HSL = isDark
    ? { h: brand.h, s: clamp(brand.s * 0.08, 0, 10), l: 93 }
    : { h: brand.h, s: clamp(brand.s * 0.08, 0, 10), l: 8 };

  // Primary is the brand color, adjusted for adequate contrast
  const primary: HSL = {
    h: brand.h,
    s: clamp(brand.s, 40, 95),
    l: isDark ? clamp(brand.l, 45, 65) : clamp(brand.l, 35, 55),
  };

  // Secondary: analogous hue shift (~30 degrees)
  const secondary: HSL = {
    h: shiftHue(brand.h, 30),
    s: clamp(brand.s * 0.7, 20, 70),
    l: isDark ? 55 : 45,
  };

  // Accent: complementary hue (~180 degrees)
  const accent: HSL = {
    h: shiftHue(brand.h, 180),
    s: clamp(brand.s * 0.8, 30, 85),
    l: isDark ? 55 : 45,
  };

  // Muted: desaturated tint of background
  const muted: HSL = isDark
    ? { h: brand.h, s: clamp(brand.s * 0.1, 2, 10), l: 12 }
    : { h: brand.h, s: clamp(brand.s * 0.1, 2, 10), l: 94 };

  // Border: subtle gray tinted toward the brand
  const border: HSL = isDark
    ? { h: brand.h, s: clamp(brand.s * 0.12, 3, 12), l: 20 }
    : { h: brand.h, s: clamp(brand.s * 0.12, 3, 12), l: 85 };

  const bgHex = hslToHex(background);
  let primaryHex = hslToHex(primary);

  // Ensure primary has at least WCAG AA contrast (4.5:1) against background
  const ratio = contrastRatio(primaryHex, bgHex);
  if (ratio < 4.5) {
    // Adjust primary lightness to meet contrast requirement
    const adjustedPrimary = { ...primary };
    if (isDark) {
      // Lighten primary for dark backgrounds
      adjustedPrimary.l = clamp(adjustedPrimary.l + 15, 50, 80);
    } else {
      // Darken primary for light backgrounds
      adjustedPrimary.l = clamp(adjustedPrimary.l - 15, 15, 45);
    }
    primaryHex = hslToHex(adjustedPrimary);
  }

  return {
    id: "custom-brand",
    name: "Custom Brand",
    styleIds: ["all"],
    colors: {
      background: bgHex,
      foreground: hslToHex(foreground),
      primary: primaryHex,
      secondary: hslToHex(secondary),
      accent: hslToHex(accent),
      muted: hslToHex(muted),
      border: hslToHex(border),
    },
    isDark,
  };
}
