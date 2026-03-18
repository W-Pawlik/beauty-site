"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { HeroHeader } from "./HeroHeader";
import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  onScrollNext?: () => void;
  onNavigate?: (href: string) => boolean;
  transitionProgress?: number;
};

export function HeroSection({
  onScrollNext,
  onNavigate,
  transitionProgress = 0,
}: HeroSectionProps) {
  const progress = Math.max(0, Math.min(1, transitionProgress));
  const copyOpacity = Math.max(0, 1 - progress * 1.1);

  return (
    <section className={styles.page} id="home">
      <div className={styles.heroFrame}>
        <motion.div
          className={styles.headerMotion}
          style={{
            y: -140 * progress,
          }}
        >
          <HeroHeader onNavigate={onNavigate} />
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.copy}
            style={{
              y: -120 * progress,
              opacity: copyOpacity,
            }}
          >
            <motion.div
              initial={{ y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.08 }}
            >
              <div className={styles.headlineWrap}>
                <h1 className={styles.headline}>
                  <span>Agnieszka</span>
                  <span className={styles.headlineLine}>
                    <span>Luzarska</span>
                    <AnimatedUnderline
                      className={styles.headlineUnderlineBottom}
                      delay={1.15}
                    />
                  </span>
                </h1>
              </div>

              <p className={styles.subtitle}>
                Profesjonalne konsultacje beauty Mary Kay i makijaz dopasowany
                do Ciebie.
              </p>

              <motion.div className={styles.scrollCta}>
                <motion.button
                  type="button"
                  className={styles.arrowButton}
                  whileHover={{ y: 2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Przewin do dolu"
                  onClick={onScrollNext}
                >
                  <span className={styles.arrowIcon} aria-hidden="true" />
                </motion.button>
                <button
                  type="button"
                  className={styles.scrollLabelButton}
                  onClick={onScrollNext}
                >
                  Poznaj mnie
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.visual}
            style={{
              scale: 1 + progress * 0.18,
              y: -22 * progress,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.05, ease: "easeOut", delay: 0.15 }}
          >
            <Image
              src="/images/herosectionImg2.avif"
              alt="Modelka z zestawem pedzli do makijazu"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 56vw"
              className={styles.heroImage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
