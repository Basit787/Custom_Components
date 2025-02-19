"use client";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  children: React.ReactNode;
}

export function CardGradient({
  children,
  className,
  gradientSize = 200,
  gradientColor = "hsl(var(--secondary)) 20%",
  gradientFrom = "hsl(var(--secondary)) 100%",
  gradientTo = "hsl(var(--secondary)) 100%",
  gradientOpacity = 0.5,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!e.relatedTarget) {
        document.removeEventListener("mousemove", handleMouseMove);
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
      }
    },
    [handleMouseMove, mouseX, gradientSize, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    document.addEventListener("mousemove", handleMouseMove);
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [handleMouseMove, mouseX, gradientSize, mouseY]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      className={cn("group relative flex size-full rounded-t-xl", className)}
    >
      <div className="absolute inset-px z-10 bg-gradient-to-r from-background/75 via-accent to-background/75 rounded-t-xl" />
      <div className="relative z-30">{children}</div>
      <motion.div
        className="pointer-events-none absolute inset-px z-10 rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-t-xl bg-border duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientFrom}, 
              ${gradientTo}, 
              hsl(var(--accent)) 100%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-l from-transparent to-transparent"
        animate={{ backgroundPosition: ["100% 0", "-100% 0"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--secondary-foreground)) 100%, transparent)`,
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

//bg-gradient-to-br from-purple-100 to-indigo-100
