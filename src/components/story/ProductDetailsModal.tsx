"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import type { CosmeticProduct } from "./cosmetics.types";
import {
  CONTACT_ASK_PRODUCT_EVENT,
  type ContactAskProductDetail,
} from "./contact.constants";
import styles from "./ProductDetailsModal.module.css";

type ProductDetailsModalProps = {
  product: CosmeticProduct;
  onClose: () => void;
};

export function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  const images = useMemo(() => {
    const result = [product.image, ...(product.gallery ?? [])];
    return Array.from(new Set(result));
  }, [product.gallery, product.image]);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const hasAnyExtraDetails =
    !!product.detailedDescription ||
    !!product.actionDescription ||
    (product.applicationTips?.length ?? 0) > 0 ||
    (product.ingredients?.length ?? 0) > 0;

  const handleAskAboutProduct = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClose();

    window.setTimeout(() => {
      const detail: ContactAskProductDetail = {
        productName: product.name,
      };

      window.dispatchEvent(
        new CustomEvent(CONTACT_ASK_PRODUCT_EVENT, {
          detail,
        }),
      );

      document
        .getElementById("kontakt")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Zamknij szczegoly produktu"
        >
          x
        </button>

        <div className={styles.layout}>
          <div className={styles.visualColumn}>
            <div className={styles.mainImageWrap}>
              <Image
                src={images[selectedImage]}
                alt={product.alt}
                fill
                sizes="(max-width: 980px) 100vw, 48vw"
                className={styles.mainImage}
              />
            </div>

            {images.length > 1 && (
              <div className={styles.thumbGrid}>
                {images.map((src, index) => (
                  <button
                    key={`${product.id}-${src}`}
                    type="button"
                    className={`${styles.thumbButton} ${index === selectedImage ? styles.thumbButtonActive : ""}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Pokaz zdjecie ${index + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${product.alt} ${index + 1}`}
                      fill
                      sizes="90px"
                      className={styles.thumbImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.contentColumn}>
            <p className={styles.price}>Cena: {product.price}</p>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.shortDescription}>{product.description}</p>

            {product.detailedDescription && (
              <div className={styles.block}>
                <h4>Szczegolowy opis</h4>
                <p>{product.detailedDescription}</p>
              </div>
            )}

            {product.actionDescription && (
              <div className={styles.block}>
                <h4>Sposob dzialania</h4>
                <p>{product.actionDescription}</p>
              </div>
            )}

            {(product.applicationTips?.length ?? 0) > 0 && (
              <div className={styles.block}>
                <h4>Wskazowki aplikacji</h4>
                <ul>
                  {product.applicationTips?.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {(product.ingredients?.length ?? 0) > 0 && (
              <div className={styles.block}>
                <h4>Wybrane skladniki</h4>
                <ul>
                  {product.ingredients?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {!hasAnyExtraDetails && (
              <div className={styles.missingInfo}>
                Szczegolowe informacje o tym produkcie beda uzupelniane
                stopniowo. Napisz lub zadzwon, a podpowiem najlepsze
                zastosowanie.
              </div>
            )}

            <a
              href="#kontakt"
              className={styles.askButton}
              onClick={handleAskAboutProduct}
            >
              <span className={styles.askLabel}>Spytaj o produkt</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
