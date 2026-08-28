"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./StatsHorizontalSection.module.css";

type StatItem = {
  value: number;
  label: string;
  description: string;
  suffix?: string;
};

const stats: StatItem[] = [
  {
    value: 250,
    label: "zadowolonych klientek",
    description:
      "Indywidualne konsultacje pielęgnacyjne i makijażowe prowadzone z uważnością na potrzeby każdej kobiety.",
    suffix: "+",
  },
  {
    value: 50,
    label: "zorganizowanych wydarzeń beauty",
    description:
      "Warsztaty i spotkania, które łączą praktyczną wiedzę, dobrą atmosferę i relacje.",
    suffix: "+",
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

    return () => cancelAnimationFrame(frameId);
  }, [durationMs, start, target]);

  return <>{value.toLocaleString("pl-PL")}</>;
}

function SupportingStat({
  item,
  index,
  inView,
}: {
  item: StatItem;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.article
      className={`${styles.statCard} ${index === 1 ? styles.statCardSand : ""}`}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.7,
        delay: 0.16 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <p className={styles.statValue}>
        <Counter target={item.value} start={inView} />
        {item.suffix ?? ""}
      </p>
      <h3 className={styles.statLabel}>{item.label}</h3>
      <p className={styles.statDescription}>{item.description}</p>
    </motion.article>
  );
}

type StatsHorizontalSectionProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function StatsHorizontalSection({
  scrollContainerRef,
}: StatsHorizontalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    root: scrollContainerRef,
    amount: 0.28,
    once: true,
  });

  return (
    <section className={styles.section} id="osiagniecia" ref={sectionRef}>
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className={styles.kicker}>Liczby, które stoją za doświadczeniem</p>
            <h2 className={styles.heading}>Doświadczenie, które ma znaczenie.</h2>
          </div>
          <p className={styles.intro}>
            Za każdą liczbą stoi rozmowa, zaufanie i konkretna pomoc, od pierwszego
            spotkania po pielęgnację, która naprawdę pasuje do codzienności.
          </p>
        </motion.div>

        <div className={styles.statsGrid}>
          <motion.article
            className={styles.featureCard}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.featureEyebrow}>Najważniejsza liczba</span>
            <div className={styles.featureNumber}>
              <Counter target={25} start={inView} />
              <span>lat</span>
            </div>
            <h3 className={styles.featureLabel}>praktyki i rozwoju</h3>
            <p className={styles.featureDescription}>
              Lata nauki, rozmów i pracy z kobietami, które pozwalają spojrzeć na
              beauty szerzej, przez pryzmat pewności siebie, wygody i codziennych
              rytuałów.
            </p>
          </motion.article>

          {stats.map((item, index) => (
            <SupportingStat
              key={item.label}
              item={item}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <motion.p
          className={styles.signatureLine}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          Wiedza, która zostaje z Tobą na dłużej.
        </motion.p>
      </div>
    </section>
  );
}
