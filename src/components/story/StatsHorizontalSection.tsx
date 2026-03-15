"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./StatsHorizontalSection.module.css";

type StatItem = {
  value: number;
  label: string;
  description: string;
  suffix?: string;
  toneClass: string;
};

const stats: StatItem[] = [
  {
    value: 250,
    label: "zadowolonych klientek",
    description:
      "Regularne konsultacje pielegnacyjne i makijazowe prowadzone stacjonarnie oraz online.",
    suffix: "+",
    toneClass: "cardRose",
  },
  {
    value: 50,
    label: "zorganizowanych imprez beauty",
    description:
      "Warsztaty i wydarzenia, ktore buduja relacje i pokazuja jak laczyc pielegnacje z codzienna praktyka.",
    suffix: "+",
    toneClass: "cardSand",
  },
  {
    value: 25,
    label: "lat doswiadczenia",
    description:
      "Konsekwentny rozwoj, mentoring i wsparcie kobiet na kolejnych etapach ich beauty journey.",
    toneClass: "cardLight",
  },
];

type CounterProps = {
  target: number;
  start: boolean;
  durationMs?: number;
};

function Counter({ target, start, durationMs = 1200 }: CounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (time: number) => {
      const progress = Math.min(1, (time - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [durationMs, start, target]);

  return <>{value.toLocaleString("pl-PL")}</>;
}

function StatCard({ item }: { item: StatItem }) {
  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { amount: 0.55, once: true });

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${styles[item.toneClass as keyof typeof styles]}`}
    >
      <div className={styles.cardGlow} />
      <p className={styles.cardValue}>
        <Counter target={item.value} start={inView} />
        {item.suffix ?? ""}
      </p>
      <h3 className={styles.cardLabel}>{item.label}</h3>
      <p className={styles.cardDescription}>{item.description}</p>
    </article>
  );
}

type StatsHorizontalSectionProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function StatsHorizontalSection({
  scrollContainerRef,
}: StatsHorizontalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState({ start: 0, end: 0 });

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const calculate = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const railWidth = railRef.current?.scrollWidth ?? 0;

      if (!viewportWidth || !railWidth) {
        return;
      }

      const start = viewportWidth * 0.78;
      const end = -(railWidth - viewportWidth) - viewportWidth * 0.08;
      setXRange({ start, end });
    };

    calculate();
    window.addEventListener("resize", calculate);

    return () => {
      window.removeEventListener("resize", calculate);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [xRange.start, xRange.end]);

  return (
    <section className={styles.section} id="osiagniecia" ref={sectionRef}>
      <div className={styles.sticky} ref={viewportRef}>
        <div className={styles.headingWrap}>
          <p className={styles.kicker}>LICZBY, KTORE STOJĄ ZA DOSWIADCZENIEM</p>
          <h2 className={styles.heading}>Czyli moje ośiągnięcia</h2>
        </div>

        <motion.div className={styles.rail} style={{ x }} ref={railRef}>
          {stats.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
