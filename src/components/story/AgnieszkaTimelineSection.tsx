"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";

type TimelineRevealImageProps = {
  src: string;
  alt: string;
};

function TimelineRevealImage({ src, alt }: TimelineRevealImageProps) {
  return (
    <motion.div
      initial={{ filter: "blur(14px)", opacity: 0.72, scale: 1.03 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.4 }}
      className="overflow-hidden rounded-xl shadow-[0_12px_36px_rgba(73,65,63,0.12)]"
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="h-24 w-full object-cover md:h-44 lg:h-56"
      />
    </motion.div>
  );
}

const timelineData: TimelineEntry[] = [
  {
    title: "2000",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-sm font-medium leading-7 text-[#5f5755] md:text-base">
          Rozpoczecie kariery w Mary Kay i pierwsze indywidualne konsultacje
          pielegnacyjne. To etap budowania fundamentu pracy z klientkami 1:1.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/section2_1.avif"
            alt="Poczatki konsultacji beauty"
          />
          <TimelineRevealImage
            src="/images/herosectionimg.jpg"
            alt="Pierwsze szkolenia"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2005",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-sm font-medium leading-7 text-[#5f5755] md:text-base">
          Osiagniecie poziomu pierwszych 100 konsultantek w zespole i regularne
          prowadzenie warsztatow produktowych. Marka osobista zaczela byc
          rozpoznawalna lokalnie.
        </p>
        <div className="mb-6 space-y-3">
          <div className="text-sm font-medium text-[#5f5755] md:text-base">
            - Rozwoj zespolu konsultantek
          </div>
          <div className="text-sm font-medium text-[#5f5755] md:text-base">
            - Cykliczne spotkania edukacyjne
          </div>
          <div className="text-sm font-medium text-[#5f5755] md:text-base">
            - Standaryzacja procesu konsultacji
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/section2_2.avif"
            alt="Rozwoj zespolu konsultantek"
          />
          <TimelineRevealImage
            src="/images/section2_3.avif"
            alt="Warsztaty beauty"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2012",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-sm font-medium leading-7 text-[#5f5755] md:text-base">
          Rozszerzenie dzialan o mentoring liderek i szkolenia z budowania
          trwalych relacji z klientkami. W tym okresie powstaly autorskie
          scenariusze konsultacji.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/herosectionImg2.avif"
            alt="Mentoring i szkolenia"
          />
          <TimelineRevealImage
            src="/images/section2_1.avif"
            alt="Autorskie metody konsultacji"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-sm font-medium leading-7 text-[#5f5755] md:text-base">
          Polaczenie pracy stacjonarnej z formatem online. Rozwoj nowoczesnej
          komunikacji i prowadzenie klientek krok po kroku przez pielegnacje,
          makijaz i dobor produktow.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/herosectionimg.jpg"
            alt="Nowoczesne konsultacje online"
          />
          <TimelineRevealImage
            src="/images/section2_2.avif"
            alt="Aktualny etap rozwoju marki osobistej"
          />
        </div>
      </div>
    ),
  },
];

export function AgnieszkaTimelineSection() {
  return (
    <section id="historia">
      <Timeline
        data={timelineData}
        heading="A jak to sie zaczelo..."
        description="Jak u każdego z nas, historia mojej pracy zaczela sie od pierwszych krokow i stopniowego rozwoju. To historia pelna pasji, nauki i nieustannego doskonalenia sie w dziedzinie pielegnacji i makijazu."
      />
    </section>
  );
}
