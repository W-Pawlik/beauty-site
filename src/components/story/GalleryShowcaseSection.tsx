"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./GalleryShowcaseSection.module.css";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    src: "/images/herosectionimg.jpg",
    alt: "Portret kobiety beauty",
    title: "Makijaz okazjonalny",
    caption: "Delikatne wykonczenie i dopasowanie do typu urody.",
  },
  {
    id: "g-2",
    src: "/images/herosectionImg2.avif",
    alt: "Kobieta z makijazem",
    title: "Glow skin look",
    caption: "Naturalny blask i lekka, trwala formula.",
  },
  {
    id: "g-3",
    src: "/images/section2_1.avif",
    alt: "Portret kobiety",
    title: "Kobieca pewnosc",
    caption: "Makijaz podkreslajacy naturalne atuty.",
  },
  {
    id: "g-4",
    src: "/images/section2_2.avif",
    alt: "Kobieta beauty z bliska",
    title: "Styl i elegancja",
    caption: "Dopasowany look na co dzien i na wyjscia.",
  },
  {
    id: "g-5",
    src: "/images/section2_3.avif",
    alt: "Portret kobiecy beauty",
    title: "Subtelne wykonczenie",
    caption: "Harmonia koloru i pielegnacji cery.",
  },
  {
    id: "g-6",
    src: "/images/woman_talking_on_the_phone_closeup.webp",
    alt: "Kobieta rozmawiajaca przez telefon",
    title: "Kontakt i relacja",
    caption: "Bliska wspolpraca i indywidualne doradztwo beauty.",
  },
];

export function GalleryShowcaseSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem =
    galleryItems.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedId]);

  return (
    <section className={styles.section} id="galeria">
      <div className={styles.container}>
        <p className={styles.kicker}>WYBRANE KADRY Z MOJEJ PRACY</p>
        <h2 className={styles.title}>GALERIA</h2>

        <div className={styles.grid}>
          {galleryItems.map((item, index) => (
            <motion.button
              type="button"
              key={item.id}
              className={styles.tile}
              onClick={() => setSelectedId(item.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                layoutId={`gallery-item-${item.id}`}
                className={styles.tileImageWrap}
              >
                <Image
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 980px) 50vw, 33vw"
                  className={styles.tileImageBg}
                />
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 980px) 50vw, 33vw"
                  className={styles.tileImage}
                />
              </motion.div>
              {/* <div className={styles.tileMeta}>
                <h3 className={styles.tileTitle}>{item.title}</h3>
                <p className={styles.tileCaption}>{item.caption}</p>
              </div> */}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className={styles.modalCard}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div
                layoutId={`gallery-item-${selectedItem.id}`}
                className={styles.modalImageWrap}
              >
                <Image
                  src={selectedItem.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="90vw"
                  className={styles.modalImageBg}
                />
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  fill
                  sizes="90vw"
                  className={styles.modalImage}
                />
              </motion.div>

              {/* <div className={styles.modalMeta}>
                <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
                <p className={styles.modalCaption}>{selectedItem.caption}</p>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setSelectedId(null)}
                >
                  Zamknij
                </button>
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
