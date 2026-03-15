"use client";

import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type TestimonialItem,
} from "@/components/ui/testimonials-columns-1";
import styles from "./TestimonialsSection.module.css";

const testimonials: TestimonialItem[] = [
  {
    text: "Po konsultacji z Agnieszka moja pielegnacja w koncu ma sens i widze realne efekty.",
    image: "/images/herosectionimg.jpg",
    name: "Karolina M.",
    role: "Klientka indywidualna",
  },
  {
    text: "Makijaz byl przepiekny, trwaly i bardzo naturalny. Dokladnie taki, jakiego potrzebowalam.",
    image: "/images/herosectionImg2.avif",
    name: "Natalia R.",
    role: "Makijaz okazjonalny",
  },
  {
    text: "Warsztaty beauty dla naszego zespolu byly swietnie zorganizowane i bardzo praktyczne.",
    image: "/images/wydarzeniaOrganizacja.jpg",
    name: "Marta K.",
    role: "Event firmowy",
  },
  {
    text: "Agnieszka tlumaczy wszystko krok po kroku. W koncu wiem, jak dobierac produkty do skory.",
    image: "/images/section2_1.avif",
    name: "Patrycja D.",
    role: "Konsultacja pielegnacyjna",
  },
  {
    text: "Dostalam konkretne rekomendacje i plan dzialania. Bardzo profesjonalne podejscie.",
    image: "/images/section2_2.avif",
    name: "Ewelina S.",
    role: "Klientka stala",
  },
  {
    text: "Spotkanie bylo merytoryczne i jednoczesnie w lekkiej atmosferze. Polecam kazdej kobiecie.",
    image: "/images/section2_3.avif",
    name: "Joanna W.",
    role: "Spotkanie beauty",
  },
  {
    text: "Event dla naszej grupy byl dopracowany i bardzo angazujacy. Goscie byli zachwyceni.",
    image: "/images/kosmetyk1.jpg",
    name: "Alicja P.",
    role: "Organizatorka wydarzenia",
  },
  {
    text: "Makijaz i pielegnacja dobrane idealnie do mnie. Czulam sie pewnie przez caly dzien.",
    image: "/images/kosmetyk2.jpg",
    name: "Magdalena L.",
    role: "Makijaz dzienny",
  },
  {
    text: "To pierwsza konsultantka, ktora naprawde slucha i dobiera rozwiazania pod potrzeby.",
    image: "/images/kosmettyk3.jpg",
    name: "Sylwia C.",
    role: "Nowa klientka",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className={styles.section} id="opinie">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <div className={styles.kickerWrap}>
            <span className={styles.kicker}>Opinie klientek</span>
          </div>
          <h2 className={styles.title}>A co o mnie mówią?</h2>
          <p className={styles.subtitle}>
            Prawdziwe wrazenia po konsultacjach, makijazach i wydarzeniach
            beauty.
          </p>
        </motion.div>

        <div className={styles.columnsMask}>
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className={styles.secondColumn}
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className={styles.thirdColumn}
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
