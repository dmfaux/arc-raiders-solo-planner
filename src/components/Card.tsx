import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

