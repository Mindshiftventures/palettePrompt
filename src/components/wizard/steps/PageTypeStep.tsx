"use client";

import { useWizardStore } from "@/store/wizard-store";
import type { PageType } from "@/types";
import { Globe, ShoppingBag, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const pageTypes: { id: PageType; label: string; description: string; icon: typeof Globe }[] = [
  {
    id: "landing",
    label: "Landing Page",
    description: "Marketing page with hero, features, testimonials, and CTA sections",
    icon: Globe,
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description: "Product grid, product cards with pricing, category navigation, and cart",
    icon: ShoppingBag,
  },
  {
    id: "blog",
    label: "Blog",
    description: "Article list, post cards with images, sidebar, and reading view",
    icon: BookOpen,
  },
];

export function PageTypeStep() {
  const pageType = useWizardStore((s) => s.pageType);
  const setPageType = useWizardStore((s) => s.setPageType);

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">What are you building?</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Choose a page type to see a relevant preview as you customize your style.
      </p>

      <div className="space-y-3">
        {pageTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = pageType === type.id;

          return (
            <button
              key={type.id}
              onClick={() => setPageType(type.id)}
              className={cn(
                "flex items-start gap-4 w-full p-4 rounded-lg border-2 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{type.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {type.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
