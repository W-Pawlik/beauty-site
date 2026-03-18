"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { BenefitsStackedCards } from "./BenefitsStackedCards";
import styles from "./JoinTeamSection.module.css";

const pillars = [
  {
    title: "Produkt",
    description:
      "Pracujesz na sprawdzonych kosmetykach i uczysz klientki codziennej pielegnacji oraz makijazu.",
    imageSrc: "/images/join_team_Product_image_png.png",
    imageAlt: "Produkty kosmetyczne Mary Kay",
    variant: "product",
  },
  {
    title: "Mozliwosci wspolpracy",
    description:
      "Budujesz relacje, rozwijasz swoja marke osobista i krok po kroku tworzysz wlasny zespol.",
    imageSrc: "/images/fds.png",
    imageAlt: "Kobiety rozmawiajace o wspolpracy",
    variant: "cooperation",
  },
] as const;

const benefits = [
  {
    title: "Elastyczny czas",
    text: "Laczysz wspolprace z zyciem prywatnym i sama decydujesz o tempie rozwoju.",
    imageSrc: "/images/team_benefits_flexible_time.png",
    imageAlt: "Kobieta pracujaca elastycznie z telefonem",
  },
  {
    title: "Wsparcie mentorskie",
    text: "Otrzymujesz plan wdrozenia, materialy i praktyczne wskazowki na kazdym etapie.",
    imageSrc: "/images/team_benefits_flexible_time.png",
    imageAlt: "Mentorskie wsparcie podczas rozwoju w branzy beauty",
  },
  {
    title: "Rozwoj kompetencji",
    text: "Szkolenia z pielegnacji, makijazu, komunikacji i prowadzenia konsultacji.",
    imageSrc: "/images/team_benefits_flexible_time.png",
    imageAlt: "Rozwoj umiejetnosci i praktyka makijazu",
  },
  {
    title: "Dodatkowe premie",
    text: "Bonusy i nagrody za aktywnosc, wyniki zespolu i konsekwentne dzialanie.",
    imageSrc: "/images/team_benefits_flexible_time.png",
    imageAlt: "Wydarzenie beauty i premie za zaangazowanie",
  },
];

const timelineSteps = [
  {
    number: "1",
    title: "Rozmowa poznawcza",
    text: "Krotka rozmowa o Twoich celach, stylu pracy i tym, jak chcesz rozwijac wspolprace.",
    side: "left" as const,
  },
  {
    number: "2",
    title: "Plan startu",
    text: "Ukladamy plan pierwszych 30 dni, materialy i konkretne kroki do pracy z klientkami.",
    side: "right" as const,
  },
  {
    number: "3",
    title: "Rozwoj i wsparcie",
    text: "Wchodzisz w rytm dzialania, dostajesz mentoring i systematycznie budujesz swoj zespol.",
    side: "left" as const,
  },
];

const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const segmentVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0.32 },
  visible: (delay: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay,
      duration: 0.52,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: 0.44,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function JoinTeamSection() {
  return (
    <section className={styles.section} id="dolacz-do-zespolu">
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className={styles.kicker}>Dwie nogi biznesu Mary Kay</p>
          <h2 className={styles.title}>Dolacz do mojego zespolu</h2>
          <p className={styles.lead}>
            Wspolpraca opiera sie na dwoch filarach: produkcie i mozliwosciach
            wspolpracy. To model, ktory pozwala rozwijac sie etapami i budowac
            stabilna baze klientek.
          </p>
        </motion.header>

        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              className={`${styles.pillarCard} ${
                pillar.variant === "product"
                  ? styles.pillarCardProduct
                  : styles.pillarCardCooperation
              }`}
              initial={{ opacity: 0, x: index === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.07 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <span className={styles.pillarIndex}>{`0${index + 1}`}</span>

              <div className={styles.pillarVisual}>
                <Image
                  src={pillar.imageSrc}
                  alt={pillar.imageAlt}
                  fill
                  className={styles.pillarVisualImage}
                  sizes="(max-width: 980px) 100vw, 50vw"
                />
              </div>

              <div className={styles.pillarContent}>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarText}>{pillar.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className={styles.benefitsBlock}>
          <p className={styles.benefitsKicker}>Dlaczego warto</p>
          <BenefitsStackedCards items={benefits} />
        </div>

        <motion.article
          className={styles.pathCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.38 }}
        >
          <div className={styles.pathHeader}>
            <p className={styles.pathKicker}>Sciezka startowa</p>
            <h3 className={styles.pathTitle}>Jak wyglada dolaczenie do zespolu</h3>
          </div>

          <div className={styles.timeline}>
            {timelineSteps.map((step, index) => {
              const dotDelay = 0.08 + index * 0.92;
              const stepDelay = 0.24 + index * 0.92;
              const segmentDelay = 0.56 + index * 0.92;

              return (
                <Fragment key={step.title}>
                  <div className={styles.timelineRow}>
                    {step.side === "left" ? (
                      <motion.article
                        className={`${styles.stepCard} ${styles.stepCardLeft}`}
                        variants={stepVariants}
                        custom={stepDelay}
                      >
                        <div className={styles.stepCardInner}>
                          <span className={styles.stepNumber}>{step.number}</span>
                          <div>
                            <h4 className={styles.stepHeading}>{step.title}</h4>
                            <p className={styles.stepText}>{step.text}</p>
                          </div>
                        </div>
                      </motion.article>
                    ) : (
                      <div className={styles.stepPlaceholder} aria-hidden="true" />
                    )}

                    <div className={styles.centerCell}>
                      <motion.span
                        className={styles.timelineDot}
                        variants={dotVariants}
                        custom={dotDelay}
                      />
                    </div>

                    {step.side === "right" ? (
                      <motion.article
                        className={`${styles.stepCard} ${styles.stepCardRight}`}
                        variants={stepVariants}
                        custom={stepDelay}
                      >
                        <div className={styles.stepCardInner}>
                          <span className={styles.stepNumber}>{step.number}</span>
                          <div>
                            <h4 className={styles.stepHeading}>{step.title}</h4>
                            <p className={styles.stepText}>{step.text}</p>
                          </div>
                        </div>
                      </motion.article>
                    ) : (
                      <div className={styles.stepPlaceholder} aria-hidden="true" />
                    )}
                  </div>

                  {index < timelineSteps.length - 1 ? (
                    <div className={styles.segmentRow}>
                      <div className={styles.stepPlaceholder} aria-hidden="true" />
                      <div className={styles.centerCell}>
                        <motion.span
                          className={styles.timelineSegment}
                          variants={segmentVariants}
                          custom={segmentDelay}
                        />
                      </div>
                      <div className={styles.stepPlaceholder} aria-hidden="true" />
                    </div>
                  ) : null}
                </Fragment>
              );
            })}

            <motion.div
              className={styles.timelineCtaRow}
              variants={ctaVariants}
              custom={0.24 + timelineSteps.length * 0.92}
            >
              <a href="#kontakt" className={styles.pathCta}>
                <span className={styles.ctaLabel}>Porozmawiajmy o wspolpracy</span>
              </a>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
