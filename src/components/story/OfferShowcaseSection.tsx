"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { CosmeticProduct } from "./cosmetics.types";
import { cosmeticsOffer } from "./cosmetics.data";
import { ProductDetailsModal } from "./ProductDetailsModal";
import styles from "./OfferShowcaseSection.module.css";

type TabKey = "cosmetics" | "events";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "cosmetics", label: "Kosmetyki" },
  { key: "events", label: "Organizacja wydarzen" },
];

function CosmeticsPanel({
  onOpenProduct,
}: {
  onOpenProduct: (product: CosmeticProduct) => void;
}) {
  return (
    <motion.div
      key="cosmetics"
      className={styles.panel}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <div className={styles.productsBlock}>
        <p className={styles.panelLead}>
          Produkty sa regularnie aktualizowane. Zakup odbywa sie podczas
          konsultacji lub po kontakcie bezposrednim, bez platnosci online na
          stronie.
        </p>

        <div className={styles.productsGrid}>
          {cosmeticsOffer.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              className={styles.productCard}
              onClick={() => onOpenProduct(item)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className={styles.productImageWrap}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 980px) 100vw, 32vw"
                  className={styles.productImage}
                />
              </div>

              <div className={styles.productBody}>
                <h4 className={styles.productName}>{item.name}</h4>
                <p className={styles.productDescription}>{item.description}</p>
                <p className={styles.productPrice}>Cena: {item.price}</p>
                <p className={styles.productHint}>Kliknij, aby zobaczyc szczegoly</p>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.aside
          className={styles.consultCard}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className={styles.consultKicker}>Potrzebujesz doradztwa?</p>
          <h3 className={styles.consultTitle}>
            Nie znalazlas tego, czego szukasz?
          </h3>
          <p className={styles.consultText}>
            Zadzwon do mnie, a razem znajdziemy kosmetyki stworzone dla Ciebie.
          </p>

          <div className={styles.consultActions}>
            <a href="tel:+48500100200" className={styles.consultButtonPrimary}>
              <span className={styles.ctaLabel}>Zadzwon</span>
            </a>
            <a href="#kontakt" className={styles.consultButtonSecondary}>
              <span className={styles.ctaLabel}>Napisz wiadomosc</span>
            </a>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
}

function EventsPanel() {
  return (
    <motion.div
      key="events"
      className={styles.panel}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <div className={styles.eventsLayout}>
        <motion.article
          className={styles.eventsVisualCard}
          initial={{ opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.eventsImageWrap}>
            <Image
              src="/images/wydarzeniaOrganizacja.jpg"
              alt="Organizacja wydarzen beauty"
              fill
              sizes="(max-width: 980px) 100vw, 42vw"
              className={styles.eventsImage}
            />
          </div>
          <div className={styles.eventsBadge}>Wycena indywidualna</div>
          <h3 className={styles.eventsCardTitle}>Beauty event szyty na miare</h3>
          <p className={styles.eventsCardText}>
            Spotkania dla grup, firm i klientek indywidualnych. Program obejmuje
            pokaz produktow, praktyczne wskazowki oraz konsultacje.
          </p>
        </motion.article>

        <motion.article
          className={styles.eventsInfoCard}
          initial={{ opacity: 0, x: 22 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className={styles.eventsKicker}>Jak to dziala</p>
          <h3 className={styles.eventsTitle}>Od pomyslu do realizacji</h3>

          <div className={styles.eventsSteps}>
            <div className={styles.eventStep}>
              <span className={styles.stepIndex}>01</span>
              <p>Krotka rozmowa o celu wydarzenia i grupie docelowej.</p>
            </div>
            <div className={styles.eventStep}>
              <span className={styles.stepIndex}>02</span>
              <p>Dopasowanie scenariusza, czasu i zakresu atrakcji beauty.</p>
            </div>
            <div className={styles.eventStep}>
              <span className={styles.stepIndex}>03</span>
              <p>Realizacja wydarzenia z opieka i wsparciem na miejscu.</p>
            </div>
          </div>

          <p className={styles.eventsNote}>
            Cena zalezy od liczby osob, miejsca i programu. Najlepiej ustalic ja
            po krotkiej konsultacji.
          </p>

          <a href="#kontakt" className={styles.eventsCta}>
            <span className={styles.ctaLabel}>Skontaktuj sie i ustal szczegoly</span>
          </a>
        </motion.article>
      </div>
    </motion.div>
  );
}

export function OfferShowcaseSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("cosmetics");
  const [selectedProduct, setSelectedProduct] = useState<CosmeticProduct | null>(
    null,
  );

  return (
    <section className={styles.section} id="oferta">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.kicker}>Kosmetyki i organizacja wydarzen</p>
          <h2 className={styles.title}>OFERTA</h2>
        </div>

        <div
          className={styles.tabsWrap}
          role="tablist"
          aria-label="Zakres oferty"
        >
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={styles.tabButton}
                onClick={() => {
                  setActiveTab(tab.key);
                  if (tab.key !== "cosmetics") {
                    setSelectedProduct(null);
                  }
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="offer-tab-indicator"
                    className={styles.tabActiveBg}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "cosmetics" ? (
            <CosmeticsPanel onOpenProduct={setSelectedProduct} />
          ) : (
            <EventsPanel />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

