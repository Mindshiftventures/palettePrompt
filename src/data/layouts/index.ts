import type { LayoutOption } from "@/types";

export const layouts: LayoutOption[] = [
  {
    id: "hero-stacked",
    name: "Hero + Stacked Sections",
    description: "Classic landing page with a hero section followed by vertically stacked content blocks",
    icon: "Rows3",
  },
  {
    id: "bento-grid",
    name: "Bento Grid",
    description: "Modular dashboard-style grid with cards of varying sizes, Apple-inspired",
    icon: "LayoutGrid",
  },
  {
    id: "single-column",
    name: "Single Column",
    description: "Editorial/blog-style single column layout with focused reading experience",
    icon: "AlignCenter",
  },
  {
    id: "sidebar-content",
    name: "Sidebar + Content",
    description: "Documentation-style layout with a navigation sidebar and main content area",
    icon: "PanelLeft",
  },
  {
    id: "full-width",
    name: "Full-width Sections",
    description: "Immersive storytelling layout with edge-to-edge sections and dramatic visuals",
    icon: "MonitorPlay",
  },
];

export function getLayout(id: string): LayoutOption | undefined {
  return layouts.find((l) => l.id === id);
}
