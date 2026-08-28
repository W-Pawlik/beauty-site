import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./AboutMeSection.module.css";

type AboutMeSectionProps = {
  transitionProgress?: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function AboutMeSection({ transitionProgress = 0 }: AboutMeSectionProps) {
  const phase = clamp((transitionProgress - 1) / 0.54);
  const backdropPhase = clamp((transitionProgress - 0.94) / 0.06);

  return (
    <section className={styles.page} id="aboutMe">
      <motion.div
        className={styles.backdrop}
        style={{
          opacity: backdropPhase,
        }}
      />

      <motion.div
        className={styles.canvas}
        style={{
          opacity: phase,
          y: 56 * (1 - phase),
          scale: 0.96 + phase * 0.04,
        }}
      >
        <div className={styles.softCircleLeft} />
        <div className={styles.softCircleTop} />
        <div className={styles.scribble} />

        <div className={`${styles.badge} ${styles.badgeTopLeft}`}>
          <span>KOSMETYKI</span>
        </div>
        <div className={`${styles.badge} ${styles.badgeLeftBottom}`}>
          <span>PIELEGNACJA</span>
        </div>
        <div className={`${styles.badge} ${styles.badgeRightTop}`}>
          <span>WYDARZENIA</span>
        </div>

        <div className={styles.portraitRing}>
          <div className={styles.portrait}>
            <Image
              src="/images/AgnieszkaLImages/optimized/IMG_5141.jpeg"
              alt="Agnieszka Luzarska"
              fill
              quality={90}
              sizes="(max-width: 980px) 38vw, 220px"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.aboutBlock}>
          <h2 className={styles.title}>O MNIE</h2>
          <div className={styles.columns}>
            <p>
              Pochodzę z Podlasia. Bliskość natury nauczyła mnie cenić harmonię,
              ciszę i uważność, także w rozmowie z drugą osobą. Zanim związałam
              się z Mary Kay, przez osiem lat pracowałam jako nauczycielka
              filozofii i etyki.
            </p>
            <p>
              Dziś łączę doświadczenie pedagogiczne z pracą konsultantki i
              liderki. Prowadzę spotkania, pokazuję konkretne kroki i wspieram
              kobiety w budowaniu własnej drogi. Robię to spokojnie, rzetelnie i po
              swojemu.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
