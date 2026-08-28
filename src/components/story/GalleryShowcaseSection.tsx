"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./GalleryShowcaseSection.module.css";
import { IMAGE_BLUR_DATA_URL } from "./imagePlaceholders";

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
    src: "/images/AgnieszkaLImages/new/portrait-blue-chair.webp",
    alt: "Agnieszka Luzarska w niebieskim żakiecie",
    title: "Makijaz okazjonalny",
    caption: "Delikatne wykonczenie i dopasowanie do typu urody.",
  },
  {
    id: "g-2",
    src: "/images/AgnieszkaLImages/new/floral-portrait.webp",
    alt: "Agnieszka Luzarska na tle kwiatowej ścianki",
    title: "Glow skin look",
    caption: "Naturalny blask i lekka, trwala formula.",
  },
  {
    id: "g-3",
    src: "/images/AgnieszkaLImages/new/portrait-legacy.webp",
    alt: "Portret Agnieszki Luzarskiej",
    title: "Kobieca pewnosc",
    caption: "Makijaz podkreslajacy naturalne atuty.",
  },
  {
    id: "g-4",
    src: "/images/AgnieszkaLImages/new/products-pink.webp",
    alt: "Agnieszka Luzarska podczas prezentacji produktów",
    title: "Styl i elegancja",
    caption: "Dopasowany look na co dzien i na wyjscia.",
  },
  {
    id: "g-5",
    src: "/images/AgnieszkaLImages/new/team-event.webp",
    alt: "Agnieszka Luzarska podczas wydarzenia zespołowego",
    title: "Subtelne wykonczenie",
    caption: "Harmonia koloru i pielegnacji cery.",
  },
  {
    id: "g-6",
    src: "/images/AgnieszkaLImages/new/products-blue.webp",
    alt: "Agnieszka Luzarska z produktami Mary Kay",
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
                  alt={item.alt}
                  fill
                  sizes="(max-width: 980px) 50vw, 33vw"
                  priority={index === 0}
                  quality={76}
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
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
                  alt={selectedItem.alt}
                  fill
                  sizes="90vw"
                  quality={82}
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
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
