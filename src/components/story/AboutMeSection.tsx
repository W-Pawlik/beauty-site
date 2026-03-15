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
        <div className={styles.stripedCircle} />
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
              src="/images/section2_1.avif"
              alt="Agnieszka Luzarska"
              fill
              sizes="(max-width: 980px) 38vw, 220px"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.aboutBlock}>
          <h2 className={styles.title}>O MNIE</h2>
          <div className={styles.columns}>
            <p>
              Nazywam sie Agnieszka Luzarska i od lat pomagam kobietom budowac
              codzienna pewnosc siebie przez dobrze dobrana pielegnacje oraz
              makijaz. W pracy lacze estetyke z praktyka, aby efekty byly
              naturalne i wygodne na co dzien.
            </p>
            <p>
              Podczas konsultacji stawiam na spokojna atmosfere, edukacje i
              indywidualne podejscie. Pokazuje konkretne kroki, ktore mozna od
              razu wdrozyc, aby pielegnacja i makijaz dawaly realny komfort oraz
              trwaly efekt.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
