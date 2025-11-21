import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tactical" | "danger" | "success";
  delay?: number;
}

export function Card({ children, className = "", variant = "default", delay = 0 }: CardProps) {
  const variants = {
    default: "bg-slate-900/80 border-slate-700/50",
    tactical: "bg-cyan-950/30 border-cyan-800/50 border-glow-cyan",
    danger: "bg-red-950/30 border-red-800/50",
    success: "bg-emerald-950/30 border-emerald-800/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`${variants[variant]} backdrop-blur-sm border rounded-lg p-6 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Corner accents with animation */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30" 
      />
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.15 }}
        className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30" 
      />
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/30" 
      />
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.25 }}
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30" 
      />
      
      {/* Holographic scan line effect */}
      {variant === "tactical" && (
        <div className="absolute inset-0 holographic pointer-events-none" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}