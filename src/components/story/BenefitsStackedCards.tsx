"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./JoinTeamSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export interface BenefitStackItem {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
}

interface BenefitsStackedCardsProps {
  items: BenefitStackItem[];
}

interface BenefitCardProps {
  item: BenefitStackItem;
  index: number;
  totalCards: number;
}

function BenefitStackCard({ item, index, totalCards }: BenefitCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) {
      return;
    }

    const scroller = container.closest("main") as HTMLElement | null;
    const startScale = index === 0 ? 1.08 : 1.04;
    const targetScale = Math.max(0.82, 1 - (totalCards - index - 1) * 0.055);

    gsap.set(card, {
      scale: startScale,
      transformOrigin: "center top",
      force3D: true,
      willChange: "transform",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      scroller: scroller ?? undefined,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(startScale, targetScale, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.set(card, { clearProps: "transform,willChange" });
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      className={styles.benefitStackRow}
      style={{
        ["--stack-offset" as string]: `${index * 24}px`,
      }}
    >
      <article ref={cardRef} className={styles.benefitStackCard}>
        <div className={styles.benefitStackMedia}>
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, 82vw"
            className={styles.benefitStackMediaImage}
            priority={index === 0}
          />
        </div>

        <div className={styles.benefitStackContent}>
          <span className={styles.benefitStackIndex}>{`0${index + 1}`}</span>
          <h4 className={styles.benefitStackTitle}>{item.title}</h4>
          <p className={styles.benefitStackText}>{item.text}</p>
        </div>
      </article>
    </div>
  );
}

export function BenefitsStackedCards({ items }: BenefitsStackedCardsProps) {
  return (
    <div className={styles.benefitsStackRoot}>
      {items.map((item, index) => (
        <BenefitStackCard
          key={item.title}
          item={item}
          index={index}
          totalCards={items.length}
        />
      ))}
    </div>
  );
}
