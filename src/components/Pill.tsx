interface PillProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Pill({ children, variant = "default", className = "" }: PillProps) {
  const variantClasses = {
    default: "bg-slate-800/80 text-slate-200 border-slate-600/50",
    success: "bg-emerald-950/50 text-emerald-300 border-emerald-700/50",
    warning: "bg-amber-950/50 text-amber-300 border-amber-700/50",
    danger: "bg-red-950/50 text-red-300 border-red-700/50",
    info: "bg-cyan-950/50 text-cyan-300 border-cyan-700/50",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded border backdrop-blur-sm uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
