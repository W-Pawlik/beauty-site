"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  heading?: string;
  description?: string;
}

export const Timeline = ({
  data,
  heading = "Historia kariery Agnieszki",
  description = "Kolejne etapy rozwoju w Mary Kay, budowania zespolu i pracy z klientkami.",
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const updateHeight = () => {
      const rect = ref.current?.getBoundingClientRect();
      setHeight(rect?.height ?? 0);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Keeps the motion value subscription active so progress updates stay smooth.
  useMotionValueEvent(scrollYProgress, "change", () => {});

  return (
    <section
      ref={containerRef}
      className="w-full bg-[linear-gradient(180deg,#ffffff_0%,#fff8fc_55%,#fff4fb_100%)] font-sans md:px-10"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-10">
        <h2 className="mb-4 max-w-4xl text-2xl font-semibold tracking-[0.08em] text-[#49413f] md:text-5xl">
          {heading}
        </h2>
        <p className="max-w-2xl text-sm font-medium leading-7 text-[#6a5f5c] md:text-base">
          {description}
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-5 pb-20 md:px-0">
        {data.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="grid grid-cols-[124px_minmax(0,1fr)] gap-4 pt-10 md:flex md:justify-start md:gap-10 md:pt-32"
          >
            <div className="sticky top-24 z-30 flex items-start gap-3 self-start md:top-40 md:w-full md:max-w-xs md:gap-0 md:flex-row md:items-center lg:max-w-sm">
              <div className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_rgba(73,65,63,0.08)] md:absolute md:left-3 md:ml-0">
                <div className="h-4 w-4 rounded-full border border-[#e4adca] bg-[#f5d9e9]" />
              </div>
              <h3 className="mt-1 text-[1.9rem] font-semibold tracking-[0.08em] leading-none text-[#8c7a84] md:hidden">
                {item.title}
              </h3>
              <h3 className="hidden pl-20 text-4xl font-semibold tracking-[0.08em] text-[#8c7a84] md:block">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-5 md:pl-4 md:pr-4">
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-[#d8cfd4] to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[#e4adca] via-[#cf8db2] to-transparent"
          />
        </div>
      </div>
    </section>
  );
};
