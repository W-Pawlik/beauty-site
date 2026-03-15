"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import {
  CONTACT_ASK_PRODUCT_EVENT,
  type ContactAskProductDetail,
} from "./contact.constants";
import { cosmeticsOffer } from "./cosmetics.data";
import styles from "./ContactSection.module.css";

type ContactMode = "message" | "skin-card";

type ModeOption = {
  id: ContactMode;
  title: string;
  description: string;
};

type SkinQuestion = {
  id: string;
  label: string;
  name: string;
  options: string[];
};

type ProductQuestionEntry = {
  id: string;
  name: string;
  question: string;
};

const modeOptions: ModeOption[] = [
  {
    id: "message",
    title: "Szybka wiadomosc",
    description: "Krotki kontakt i szybka odpowiedz z propozycja konsultacji.",
  },
  {
    id: "skin-card",
    title: "Karta potrzeb skory",
    description: "6 pytan + wiadomosc, aby lepiej dopasowac pielegnacje.",
  },
];

const skinQuestions: SkinQuestion[] = [
  {
    id: "q1",
    label: "Typ cery",
    name: "skinType",
    options: [
      "Cera sucha",
      "Cera mieszana",
      "Cera tlusta",
      "Cera wrazliwa",
      "Cera dojrzala",
    ],
  },
  {
    id: "q2",
    label: "Glowna potrzeba",
    name: "primaryNeed",
    options: [
      "Nawilzenie",
      "Rozswietlenie",
      "Wyrownanie kolorytu",
      "Dzialanie anti-age",
      "Kontrola sebum",
    ],
  },
  {
    id: "q3",
    label: "Poziom wrazliwosci",
    name: "sensitivity",
    options: ["Niski", "Sredni", "Wysoki"],
  },
  {
    id: "q4",
    label: "Aktualna rutyna",
    name: "routine",
    options: [
      "Podstawowa (oczyszczanie + krem)",
      "Sredniozaawansowana",
      "Zaawansowana",
    ],
  },
  {
    id: "q5",
    label: "Ulubiona konsystencja",
    name: "texture",
    options: ["Lekka (zel/serum)", "Kremowa", "Bez preferencji"],
  },
  {
    id: "q6",
    label: "Makijaz na co dzien",
    name: "dailyMakeup",
    options: ["Codziennie", "Okazjonalnie", "Rzadko"],
  },
];

function normalizeProductName(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function ContactSection() {
  const [mode, setMode] = useState<ContactMode>("message");
  const [includeProductQuestion, setIncludeProductQuestion] = useState(false);
  const [productEntries, setProductEntries] = useState<ProductQuestionEntry[]>([]);
  const [productNameInput, setProductNameInput] = useState("");
  const [productQuestion, setProductQuestion] = useState("");
  const [productError, setProductError] = useState("");
  const productNameOptions = cosmeticsOffer.map((product) => product.name);

  const removeProductEntry = (idToRemove: string) => {
    setProductEntries((previous) =>
      previous.filter((entry) => entry.id !== idToRemove),
    );
  };

  const handleAddProductClick = () => {
    const trimmed = productNameInput.trim().replace(/\s+/g, " ");
    const trimmedQuestion = productQuestion.trim();

    if (!trimmed) {
      setProductError("Podaj nazwe produktu.");
      return;
    }

    if (!trimmedQuestion) {
      setProductError("Wpisz pytanie o produkt.");
      return;
    }

    const normalizedInput = normalizeProductName(trimmed);
    const exists = productEntries.some(
      (entry) => normalizeProductName(entry.name) === normalizedInput,
    );

    if (exists) {
      setProductError("Ten produkt jest juz na liscie.");
      return;
    }

    setProductEntries((previous) => [
      ...previous,
      {
        id: `${normalizedInput}-${Date.now()}`,
        name: trimmed,
        question: trimmedQuestion,
      },
    ]);
    setProductNameInput("");
    setProductQuestion("");
    setProductError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (includeProductQuestion && productEntries.length === 0) {
      setProductError("Dodaj przynajmniej jeden produkt.");
      return;
    }

    setProductError("");
  };

  useEffect(() => {
    const handleAskProduct = (event: Event) => {
      const customEvent = event as CustomEvent<ContactAskProductDetail>;
      setMode("message");
      setIncludeProductQuestion(true);
      setProductError("");

      if (customEvent.detail?.productName) {
        setProductNameInput(customEvent.detail.productName);
      }
    };

    window.addEventListener(CONTACT_ASK_PRODUCT_EVENT, handleAskProduct);

    return () => {
      window.removeEventListener(CONTACT_ASK_PRODUCT_EVENT, handleAskProduct);
    };
  }, []);

  return (
    <section className={styles.section} id="kontakt">
      <div className={styles.decorOne} aria-hidden="true" />
      <div className={styles.decorTwo} aria-hidden="true" />

      <div className={styles.container}>
        <motion.aside
          className={styles.infoPanel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className={styles.kicker}>Kontakt</p>
          <h2 className={styles.title}>Zacznijmy od rozmowy o Twojej skorze</h2>
          <p className={styles.description}>
            Wybierz szybka wiadomosc albo karta potrzeb skory. Otrzymasz
            konkretna odpowiedz i propozycje dalszych krokow.
          </p>

          <div className={styles.processList}>
            <div className={styles.processItem}>
              <span>01</span>
              <p>Wybierz wygodny tryb kontaktu.</p>
            </div>
            <div className={styles.processItem}>
              <span>02</span>
              <p>Opisz potrzeby lub wypelnij 6 pytan.</p>
            </div>
            <div className={styles.processItem}>
              <span>03</span>
              <p>Otrzymasz rekomendacje i dalszy plan dzialania.</p>
            </div>
          </div>

          <div className={styles.quickGrid}>
            <a href="tel:+48500100200" className={styles.quickCard}>
              <span className={styles.quickHead}>
                <span className={styles.quickIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6.6 3h3.2l1.2 5.1-2.2 1.9c.8 1.7 2.2 3.2 3.9 4l1.9-2.2L20 13v3.2C20 18 18.6 19.4 16.8 19.4c-7.5 0-13.6-6.1-13.6-13.6C3.2 4.4 4.6 3 6.6 3z" />
                  </svg>
                </span>
                <span className={styles.quickLabel}>Telefon</span>
              </span>
              <span className={styles.quickValue}>+48 500 100 200</span>
            </a>
            <a href="mailto:kontakt@agnieszkaluzarska.pl" className={styles.quickCard}>
              <span className={styles.quickHead}>
                <span className={styles.quickIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13zm2 1.1v.3l7 4.9 7-4.9v-.3a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5zm14 2.7-6.4 4.5a1 1 0 0 1-1.2 0L5 9.3v9.2c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5V9.3z" />
                  </svg>
                </span>
                <span className={styles.quickLabel}>E-mail</span>
              </span>
              <span className={styles.quickValue}>kontakt@agnieszkaluzarska.pl</span>
            </a>
            <div className={`${styles.quickCard} ${styles.quickCardStatic}`}>
              <span className={styles.quickHead}>
                <span className={styles.quickIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.8c-3.7 0-6.7 3-6.7 6.7 0 5.2 6.1 11.5 6.4 11.8.2.2.5.2.7 0 .3-.3 6.4-6.6 6.4-11.8 0-3.7-3-6.7-6.8-6.7zm0 9.3a2.6 2.6 0 1 1 0-5.3 2.6 2.6 0 0 1 0 5.3z" />
                  </svg>
                </span>
                <span className={styles.quickLabel}>Lokalizacja</span>
              </span>
              <span className={styles.quickValue}>Warszawa, Polska</span>
            </div>
          </div>

          <div className={styles.socials}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={styles.socialLink}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm4.25 3.2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.5-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className={styles.socialLink}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.5 9h3V6h-3c-2.76 0-4.5 1.74-4.5 4.5V13H6v3h3v6h3v-6h3l1-3h-4v-2.5c0-.9.6-1.5 1.5-1.5z" />
              </svg>
            </a>
          </div>
        </motion.aside>

        <motion.div
          className={styles.formPanel}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.modeGrid} role="tablist" aria-label="Tryb formularza">
            {modeOptions.map((item) => {
              const active = mode === item.id;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={styles.modeCard}
                  onClick={() => setMode(item.id)}
                  whileHover={{ y: -2 }}
                >
                  {active && (
                    <motion.span
                      layoutId="contact-mode-card"
                      className={styles.modeCardActive}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className={styles.modeCardTitle}>{item.title}</span>
                  <span className={styles.modeCardDesc}>{item.description}</span>
                </motion.button>
              );
            })}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGrid}>
              <label className={styles.label}>
                Imie i nazwisko
                <input className={styles.input} type="text" name="name" required />
              </label>

              <label className={styles.label}>
                E-mail
                <input className={styles.input} type="email" name="email" required />
              </label>
            </div>

            <label className={styles.label}>
              Telefon
              <input className={styles.input} type="tel" name="phone" />
            </label>

            <label className={styles.productToggle}>
              <input
                className={styles.productToggleInput}
                type="checkbox"
                checked={includeProductQuestion}
                onChange={(event) => {
                  setIncludeProductQuestion(event.target.checked);
                  if (!event.target.checked) {
                    setProductError("");
                  }
                }}
              />
              <span>Chce dodac pytanie o produkt</span>
            </label>

            <AnimatePresence initial={false}>
              {includeProductQuestion && (
                <motion.div
                  className={styles.productQuestionBox}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <label className={styles.label}>
                    Produkty, o ktore pytasz
                    <div className={styles.selectedProducts}>
                      {productEntries.length > 0 ? (
                        productEntries.map((entry) => (
                          <span className={styles.productChip} key={entry.id}>
                            <span
                              className={styles.productChipName}
                              data-tooltip={entry.question}
                              title={entry.question}
                            >
                              {entry.name}
                            </span>
                            <button
                              type="button"
                              className={styles.productChipRemove}
                              onClick={() => removeProductEntry(entry.id)}
                              aria-label={`Usun ${entry.name}`}
                            >
                              x
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className={styles.selectedProductsHint}>
                          Dodaj jeden lub kilka produktow.
                        </span>
                      )}
                    </div>
                  </label>

                  <div className={styles.productAddRow}>
                    <select
                      className={`${styles.select} ${styles.productSelect}`}
                      name="productNameInput"
                      value={productNameInput}
                      onChange={(event) => setProductNameInput(event.target.value)}
                    >
                      <option value="">Wybierz produkt z oferty</option>
                      {productNameOptions.map((productName) => (
                        <option key={productName} value={productName}>
                          {productName}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className={styles.addProductButton}
                      onClick={handleAddProductClick}
                    >
                      <span className={styles.addProductButtonLabel}>Dodaj</span>
                    </button>
                  </div>

                  <input
                    className={styles.hiddenProductsField}
                    type="text"
                    name="productNames"
                    readOnly
                    value={productEntries
                      .map((entry) => `${entry.name}: ${entry.question}`)
                      .join(" | ")}
                  />

                  <label className={styles.label}>
                    Pytanie o produkt
                    <textarea
                      className={`${styles.textarea} ${styles.textareaMini}`}
                      name="productQuestion"
                      rows={3}
                      placeholder="Napisz, o co chcesz zapytac."
                      value={productQuestion}
                      onChange={(event) =>
                        setProductQuestion(event.target.value)
                      }
                    />
                  </label>

                  {productError && (
                    <p className={styles.productError} role="alert">
                      {productError}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {mode === "skin-card" ? (
                <motion.div
                  key="skin-card"
                  className={styles.skinQuestions}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {skinQuestions.map((question, index) => (
                    <motion.label
                      key={question.id}
                      className={styles.questionCard}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut", delay: index * 0.04 }}
                    >
                      <span className={styles.questionTop}>
                        <span className={styles.questionIndex}>{index + 1}</span>
                        <span className={styles.questionLabel}>{question.label}</span>
                      </span>
                      <select className={styles.select} name={question.name} required>
                        <option value="">Wybierz</option>
                        {question.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </motion.label>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  className={styles.messageHint}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  Wyslij szybka wiadomosc, a odezwe sie i zaproponuje dogodny
                  termin konsultacji.
                </motion.div>
              )}
            </AnimatePresence>

            <label className={styles.label}>
              Wiadomosc
              <textarea className={styles.textarea} name="message" rows={5} required />
            </label>

            <motion.button
              type="submit"
              className={styles.submit}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={styles.submitLabel}>
                {mode === "skin-card" ? "Wyslij karte i wiadomosc" : "Wyslij wiadomosc"}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
