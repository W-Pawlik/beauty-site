"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BenefitsEditorialSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export interface BenefitEditorialItem {
  title: string;
  text: string;
}

interface BenefitsEditorialSectionProps {
  items: BenefitEditorialItem[];
}

export function BenefitsEditorialSection({
  items,
}: BenefitsEditorialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scroller = section?.closest("main") as HTMLElement | null;

    if (!section || !scroller) {
      return;
    }

    const context = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        scroller,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            items.length - 1,
            Math.round(Math.min(1, self.progress) * (items.length - 1)),
          );

          setActiveIndex((currentIndex) =>
            currentIndex === nextIndex ? currentIndex : nextIndex,
          );
        },
      });

      triggerRef.current = trigger;

      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(refreshId);
        trigger.kill();
        triggerRef.current = null;
      };
    }, section);

    return () => context.revert();
  }, [items.length]);

  if (!items.length) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];

  const jumpToItem = (index: number) => {
    const section = sectionRef.current;
    const scroller = section?.closest("main") as HTMLElement | null;

    if (!section || !scroller) {
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    const start = Number(trigger.start);
    const end = Number(trigger.end);
    const scrollRange = end - start;
    const normalizedIndex = index / Math.max(1, items.length - 1);

    if (!Number.isFinite(start) || !Number.isFinite(scrollRange) || scrollRange <= 0) {
      return;
    }

    scroller.scrollTo({
      top: start + scrollRange * normalizedIndex,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="benefits-editorial-title"
    >
      <div className={styles.pinStage}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.kicker}>Dlaczego warto</p>
            <h3 className={styles.title} id="benefits-editorial-title">
              {"Nie musisz wybiera\u0107 mi\u0119dzy \u017cyciem a rozwojem."}
            </h3>
          </header>

          <div className={styles.editorialLayout}>
            <div className={styles.statementColumn}>
              <div className={styles.statementSticky}>
                <div className={styles.counter} aria-hidden="true">
                  <span className={styles.counterActive}>
                    {`0${activeIndex + 1}`}
                  </span>
                  <span className={styles.counterTotal}>{` / 0${items.length}`}</span>
                </div>

                <div className={styles.statementRule} aria-hidden="true" />

                <div className={styles.statementContent} aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <p className={styles.statementEyebrow}>W praktyce</p>
                      <h4 className={styles.statementTitle}>{activeItem.title}</h4>
                      <p className={styles.statementText}>{activeItem.text}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className={styles.note}>
                  {"Nie musisz robi\u0107 wszystkiego naraz. Wa\u017cne, \u017ceby robi\u0107 to po swojemu."}
                </p>
              </div>
            </div>

            <div className={styles.indexColumn}>
              <p className={styles.indexHint}>
                {"Wybierz, co jest dla Ciebie wa\u017cne"}
              </p>
              <div className={styles.indexList}>
                {items.map((item, index) => (
                  <button
                    key={item.title}
                    className={`${styles.indexItem} ${
                      index === activeIndex ? styles.indexItemActive : ""
                    }`}
                    type="button"
                    onClick={() => jumpToItem(index)}
                    aria-pressed={index === activeIndex}
                  >
                    <span className={styles.indexNumber}>{`0${index + 1}`}</span>
                    <span className={styles.indexTitle}>{item.title}</span>
                    <span className={styles.indexMark} aria-hidden="true">
                      {index === activeIndex ? "\u2014" : "+"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
