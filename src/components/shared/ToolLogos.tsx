import type { ToolTarget } from "@/types";
import { cn } from "@/lib/utils";

function V0Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#000" />
      <text x="8" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="20" fill="#fff">
        v0
      </text>
    </svg>
  );
}

function LovableLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#E11D48" />
      <path
        d="M20 30l-8.5-8.5a5.5 5.5 0 117.78-7.78L20 14.44l.72-.72a5.5 5.5 0 017.78 7.78L20 30z"
        fill="#fff"
      />
    </svg>
  );
}

function FigmaMakeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#A259FF" />
      <circle cx="16" cy="14" r="4" fill="#fff" />
      <circle cx="24" cy="14" r="4" fill="#fff" fillOpacity="0.6" />
      <circle cx="16" cy="22" r="4" fill="#fff" fillOpacity="0.6" />
      <circle cx="20" cy="28" r="4" fill="#fff" fillOpacity="0.4" />
    </svg>
  );
}

function ClaudeCodeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#D97706" />
      <path
        d="M12 16l4 4-4 4M20 24h8"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CursorLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#22C55E" />
      <path
        d="M14 12l12 8-12 8V12z"
        fill="#fff"
      />
    </svg>
  );
}

export const toolLogos: Record<ToolTarget, React.FC<{ className?: string }>> = {
  v0: V0Logo,
  lovable: LovableLogo,
  "figma-make": FigmaMakeLogo,
  "claude-code": ClaudeCodeLogo,
  cursor: CursorLogo,
};

export const toolLabels: Record<ToolTarget, string> = {
  v0: "v0",
  lovable: "Lovable",
  "figma-make": "Figma Make",
  "claude-code": "Claude Code",
  cursor: "Cursor",
};

interface ToolLogoCardProps {
  tool: ToolTarget;
  selected: boolean;
  onClick: () => void;
}

export function ToolLogoCard({ tool, selected, onClick }: ToolLogoCardProps) {
  const Logo = toolLogos[tool];
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/30"
      )}
    >
      <Logo className="h-10 w-10" />
      <span className="text-xs font-medium">{toolLabels[tool]}</span>
    </button>
  );
}
