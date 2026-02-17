import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PalettePrompt - Visual Style to AI Prompt Generator",
  description:
    "Stop struggling with design prompts. Pick your style visually, get tool-optimized prompts for v0, Lovable, Figma Make, Claude Code, and Cursor.",
  openGraph: {
    title: "PalettePrompt - Visual Style to AI Prompt Generator",
    description:
      "Pick your style visually, get tool-optimized prompts for v0, Lovable, Figma Make, Claude Code, and Cursor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
