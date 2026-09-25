"use client";

import { useEffect, useState } from "react";

export function FadeIn({
  delay = 0,
  duration = 1000,
  start = true,
  className = "",
  children,
}: {
  delay?: number;
  duration?: number;
  start?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [start, delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
