"use client";

import { motion, type Variants } from "framer-motion";

type AnimatedUnderlineProps = {
  className?: string;
  path?: string;
  hoverPath?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
};

export function AnimatedUnderline({
  className,
  path = "M 2,12 Q 75,2 150,12 Q 225,22 298,12",
  hoverPath = "M 2,12 Q 75,22 150,12 Q 225,2 298,12",
  duration = 1.4,
  delay = 1.15,
  strokeWidth = 2,
}: AnimatedUnderlineProps) {
  const variants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={className}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        variants={variants}
        whileHover={{
          d: hoverPath,
          transition: { duration: 0.8, ease: "easeInOut" },
        }}
      />
    </motion.svg>
  );
}
