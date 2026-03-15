"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./ContactParallaxTeaser.module.css";

export function ContactParallaxTeaser() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.24, 1.04]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.68, 0.5, 0.68],
  );
  const copyY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.86, 1, 1, 0.86],
  );

  return (
    <section
      className={styles.section}
      ref={targetRef}
      aria-label="Zapowiedz sekcji kontaktowej"
    >
      <div className={styles.shell}>
        <motion.div
          className={styles.imageLayer}
          style={{ y: imageY, scale: imageScale }}
        />
        <motion.div
          className={styles.overlay}
          style={{ opacity: overlayOpacity }}
        />

        <motion.div
          className={styles.copy}
          style={{ y: copyY, opacity: copyOpacity }}
        >
          <h2 className={styles.heading}>Skontaktuj się ze mną</h2>
        </motion.div>
      </div>
    </section>
  );
}
