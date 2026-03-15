import Image from "next/image";
import { motion } from "framer-motion";
import { HeroHeader } from "@/components/hero/HeroHeader";
import styles from "./AboutMeIntro.module.css";

type AboutMeIntroProps = {
  transitionProgress?: number;
  onNavigate?: (href: string) => boolean;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

const panelItems = [
  {
    image: "/images/section2_1.avif",
    title: "Lata doswiadczenia w branzy beauty",
    alt: "Lata doswiadczenia",
    imageClassName: "panelImageLeft",
  },
  {
    image: "/images/section2_2.avif",
    title: "Profesjonalne podejscie",
    alt: "Profesjonalne podejscie",
    imageClassName: "panelImageCenter",
  },
  {
    image: "/images/section2_3.avif",
    title: "Kosmetyki to pasja, ktora chce sie dzielic",
    alt: "Pasja do kosmetykow",
    imageClassName: "panelImageRight",
  },
] as const;

export function AboutMeIntro({
  transitionProgress = 0,
  onNavigate,
}: AboutMeIntroProps) {
  const headerProgress = clamp((transitionProgress - 0.48) / 0.2);
  const introProgress = clamp((transitionProgress - 0.58) / 0.42);
  const outroProgress = clamp(transitionProgress - 1);
  const headerOutro = clamp((transitionProgress - 1) / 0.24);

  const getPanelReveal = (index: number) => {
    const delay = index * 0.18;
    return clamp((introProgress - delay) / 0.62);
  };

  const getPanelZoom = (index: number) => {
    const delay = index * 0.18;
    return clamp((introProgress - delay) / 1.15);
  };

  const getPanelExit = (index: number) => {
    const orderFromRight = panelItems.length - 1 - index;
    const delay = orderFromRight * 0.16;
    return clamp((outroProgress - delay) / 0.56);
  };

  return (
    <section className={styles.page} id="aboutMeIntro">
      <motion.div
        className={styles.headerLayer}
        style={{
          y: -150 * (1 - headerProgress) - 64 * headerOutro,
          opacity: 1 - headerOutro,
        }}
      >
        <HeroHeader onNavigate={onNavigate} />
      </motion.div>

      <div className={styles.panels}>
        {panelItems.map((item, index) => {
          const reveal = getPanelReveal(index);
          const exit = getPanelExit(index);

          const zoomRaw = getPanelZoom(index);
          const zoomEased = Math.pow(zoomRaw, 1.8);
          const imageScale = 1.5 - zoomEased * 0.5;

          return (
            <article key={item.title} className={styles.panel}>
              <motion.div
                className={styles.panelReveal}
                style={{
                  opacity: reveal * (1 - exit * 0.14),
                  clipPath: `inset(0 ${100 - reveal * 100}% 0 0)`,
                  transform: `translateY(${-112 * exit}dvh)`,
                }}
              >
                <motion.div
                  className={styles.imageMotion}
                  animate={{ scale: imageScale }}
                  transition={{
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.8,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className={styles[item.imageClassName]}
                  />
                </motion.div>

                <div className={styles.overlay} />

                <motion.h2
                  className={styles.panelTitle}
                  style={{
                    opacity: reveal * (1 - exit * 0.32),
                    y: 24 * (1 - reveal) - exit * 22,
                  }}
                >
                  {item.title}
                </motion.h2>
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
