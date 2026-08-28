"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { BenefitsEditorialSection } from "./BenefitsEditorialSection";
import styles from "./JoinTeamSection.module.css";

const pillars = [
  {
    eyebrow: "Pierwszy krok",
    title: "Zacznij od produktów",
    description:
      "Poznajesz kosmetyki, których możesz używać, polecać i uczyć na ich podstawie prostszej pielęgnacji.",
    fit: [
      "lubisz rozmowy o pielęgnacji i makijażu",
      "chcesz zacząć spokojnie, we własnym tempie",
      "cieszy Cię pomaganie innym kobietom",
    ],
    variant: "product",
  },
  {
    eyebrow: "Kolejny krok",
    title: "Rozwijaj współpracę",
    description:
      "Budujesz relacje, rozwijasz swoją markę osobistą i krok po kroku tworzysz własny zespół.",
    fit: [
      "szukasz większej elastyczności",
      "chcesz rozwijać swoje kompetencje",
      "myślisz o zbudowaniu własnego zespołu",
    ],
    variant: "cooperation",
  },
] as const;

const benefits = [
  {
    title: "Elastyczny czas",
    text: "Łączysz współpracę z życiem prywatnym i sama decydujesz o tempie rozwoju.",
  },
  {
    title: "Wsparcie mentorskie",
    text: "Otrzymujesz plan wdrożenia, materiały i praktyczne wskazówki na każdym etapie.",
  },
  {
    title: "Rozwój kompetencji",
    text: "Szkolenia z pielęgnacji, makijażu, komunikacji i prowadzenia konsultacji.",
  },
  {
    title: "Dodatkowe premie",
    text: "Bonusy i nagrody za aktywność, wyniki zespołu i konsekwentne działanie.",
  },
];

const timelineSteps = [
  {
    number: "1",
    title: "Rozmowa poznawcza",
    text: "Krótka rozmowa o Twoich celach, stylu pracy i tym, jak chcesz rozwijać współpracę.",
    side: "left" as const,
  },
  {
    number: "2",
    title: "Plan startu",
    text: "Układamy plan pierwszych 30 dni, materiały i konkretne kroki do pracy z klientkami.",
    side: "right" as const,
  },
  {
    number: "3",
    title: "Rozwój i wsparcie",
    text: "Wchodzisz w rytm działania, dostajesz mentoring i systematycznie budujesz swój zespół.",
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
          <p className={styles.kicker}>Dwie możliwości · jeden początek</p>
          <h2 className={styles.title}>Zacznij po swojemu</h2>
          <p className={styles.lead}>
            Nie musisz od razu wiedzieć, dokąd dojdziesz. Możesz zacząć od tego,
            co dziś jest Ci najbliższe, a z czasem połączyć obie drogi.
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

              <div className={styles.pillarContent}>
                <p className={styles.pillarEyebrow}>{pillar.eyebrow}</p>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarText}>{pillar.description}</p>
                <div className={styles.pillarDivider} />
                <p className={styles.pillarFitLabel}>Dla Ciebie, jeśli...</p>
                <ul className={styles.pillarList}>
                  {pillar.fit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className={styles.pillarLink} href="#kontakt">
                  <span>Porozmawiajmy</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <p className={styles.pillarsBridge}>
          Możesz zacząć od jednej drogi, a z czasem połączyć obie.
        </p>

        <div className={styles.benefitsBlock}>
          <BenefitsEditorialSection items={benefits} />
        </div>

        <motion.article
          className={styles.pathCard}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.38 }}
        >
          <div className={styles.pathHeader}>
            <p className={styles.pathKicker}>Ścieżka startowa</p>
            <h3 className={styles.pathTitle}>Jak wygląda dołączenie do zespołu</h3>
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
