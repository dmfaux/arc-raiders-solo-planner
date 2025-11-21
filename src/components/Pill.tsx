interface PillProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Pill({ children, variant = "default", className = "" }: PillProps) {
  const variantClasses = {
    default: "bg-slate-700 text-slate-200",
    success: "bg-cyan-900 text-cyan-200",
    warning: "bg-yellow-900 text-yellow-200",
    danger: "bg-red-900 text-red-200",
    info: "bg-blue-900 text-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

