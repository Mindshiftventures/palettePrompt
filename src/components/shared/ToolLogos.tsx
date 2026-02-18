import type { ToolTarget } from "@/types";
import { cn } from "@/lib/utils";

function V0Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#000" />
      <path d="M11 12l6 16h1l6-16h-3l-4 11-4-11h-2z" fill="#fff" />
      <path d="M26 12a5 5 0 100 16 5 5 0 000-16zm0 13a3 3 0 110-10 3 3 0 010 10z" fill="#fff" />
    </svg>
  );
}

function LovableLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#1E52F1" />
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
      <path d="M20 11l2.47 5.01L28 17.24l-4 3.9.94 5.5L20 23.77l-4.94 2.87.94-5.5-4-3.9 5.53-1.23L20 11z" fill="#fff" />
    </svg>
  );
}

function ClaudeCodeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#C15F3C" />
      <g transform="translate(5, 5) scale(1.875)" fill="#fff">
        <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z" />
      </g>
    </svg>
  );
}

function CursorLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect width="40" height="40" rx="8" fill="#26251E" />
      <path d="M12 10v20l6-6h10l-16-14z" fill="#F7F7F4" />
      <path d="M18 24l-2 6 8-6h-6z" fill="#F54E00" />
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
