"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";

type TimelineRevealImageProps = {
  src: string;
  alt: string;
};

function TimelineRevealImage({ src, alt }: TimelineRevealImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <motion.button
        type="button"
        aria-label={`Powiększ zdjęcie: ${alt}`}
        onClick={() => setIsOpen(true)}
        className="block w-full cursor-zoom-in overflow-hidden rounded-xl bg-white text-left shadow-[0_12px_36px_rgba(73,65,63,0.12)]"
        initial={{ filter: "blur(14px)", opacity: 0.72, scale: 1.03 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          quality={88}
          className="h-40 w-full bg-white object-contain md:h-44 lg:h-56"
        />
      </motion.button>

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] grid place-items-center bg-[#181316]/78 p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              onClick={() => setIsOpen(false)}
            >
              <div
                className="relative h-[min(88svh,850px)] w-[min(1100px,92vw)] overflow-hidden rounded-2xl border border-white/30 bg-white shadow-[0_28px_88px_rgba(12,10,12,0.4)]"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  quality={92}
                  sizes="92vw"
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Zamknij powiększenie"
                  className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#49413f]/20 bg-white/95 text-xl leading-none text-[#49413f] shadow-md"
                >
                  ×
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

const timelineData: TimelineEntry[] = [
  {
    title: "Podlasie",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-base font-medium leading-8 text-[#5f5755] md:text-base">
          Dorastałam na Podlasiu, w bliskim kontakcie z naturą. To stąd wzięły
          się moje zamiłowanie do harmonii, ciszy i podróży.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/event-award.webp"
            alt="Agnieszka Luzarska podczas wydarzenia"
          />
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/portrait-legacy.webp"
            alt="Portret Agnieszki Luzarskiej"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Praca z ludźmi",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-base font-medium leading-8 text-[#5f5755] md:text-base">
          Ukończyłam liceum medyczne i Wydział Filozofii Chrześcijańskiej na
          Akademii Teologii Katolickiej. Podczas studiów pracowałam jako
          asystentka stomatologiczna, a później przez osiem lat uczyłam
          filozofii i etyki.
        </p>
        <div className="mb-6 space-y-3">
          <div className="text-base font-medium text-[#5f5755] md:text-base">
            - doświadczenie pedagogiczne
          </div>
          <div className="text-base font-medium text-[#5f5755] md:text-base">
            - praca z młodzieżą
          </div>
          <div className="text-base font-medium text-[#5f5755] md:text-base">
            - rozwijanie talentu do prowadzenia innych
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/team-celebration.webp"
            alt="Agnieszka Luzarska z zespołem"
          />
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/leadership-team.webp"
            alt="Spotkanie zespołu Mary Kay"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Spotkanie z Mary Kay",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-base font-medium leading-8 text-[#5f5755] md:text-base">
          Spotkanie Kosmetyczne pokazało mi dobry produkt i prosty model
          biznesowy. Po otrzymaniu Zestawu Startowego zaczęłam prowadzić własne
          spotkania, a program Konsultantka Gwiazda ukończyłam w ciągu miesiąca.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/wings-portrait.webp"
            alt="Agnieszka Luzarska podczas wydarzenia Mary Kay"
          />
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/floral-portrait.webp"
            alt="Agnieszka Luzarska na tle kwiatowej ścianki"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Świadomy wybór",
    content: (
      <div>
        <p className="mb-6 max-w-3xl text-base font-medium leading-8 text-[#5f5755] md:text-base">
          Kolejny etap przyniósł program DWP i decyzję, by rozwijać Mary Kay
          zamiast łączyć ją z pracą nauczycielki. Dziś wspieram konsultantki i
          przyszłe liderki, budując zespół oparty na relacjach, rzetelności i
          etyce.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/products-blue.webp"
            alt="Agnieszka Luzarska z produktami Mary Kay"
          />
          <TimelineRevealImage
            src="/images/AgnieszkaLImages/new/products-pink.webp"
            alt="Agnieszka Luzarska podczas prezentacji produktów"
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
        heading="A jak to się zaczęło..."
        description="Moja droga prowadziła od Podlasia i pracy z młodzieżą, przez pierwsze Spotkanie Kosmetyczne, do świadomego wyboru Mary Kay. Dziś łączę edukację, relacje i rozwój zespołu."
      />
    </section>
  );
}
