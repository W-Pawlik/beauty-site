"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

const navigationItems = [
  { label: "O mnie", href: "#aboutMe" },
  { label: "Oferta", href: "#oferta" },
  { label: "Galeria", href: "#galeria" },
  { label: "Opinie", href: "#opinie" },
] as const;

type HeroHeaderProps = {
  onNavigate?: (href: string) => boolean;
};

export function HeroHeader({ onNavigate }: HeroHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth > 980) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileMenuOpen(false);

    if (onNavigate && onNavigate(href)) {
      event.preventDefault();
      return;
    }

    if (!href.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={styles.header}>
      <a
        className={styles.brand}
        href="#home"
        onClick={(event) => handleAnchorClick(event, "#home")}
      >
        <Image
          src="/brand/logo_AL_vector.svg"
          alt="AL Mary Kay logo"
          width={116}
          height={46}
          className={styles.brandLogo}
          priority
        />
      </a>

      <div className={styles.navCluster}>
        <button
          type="button"
          className={`${styles.menuToggle} ${mobileMenuOpen ? styles.menuToggleOpen : ""}`}
          aria-label={mobileMenuOpen ? "Zamknij menu" : "Otworz menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-primary-nav"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>

        <button
          type="button"
          className={`${styles.menuBackdrop} ${mobileMenuOpen ? styles.menuBackdropVisible : ""}`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden={!mobileMenuOpen}
          tabIndex={mobileMenuOpen ? 0 : -1}
        />

        <nav
          id="mobile-primary-nav"
          aria-label="Primary navigation"
          className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ""}`}
        >
          {navigationItems.map((item) => (
            <a
              key={item.label}
              className={styles.navItem}
              href={item.href}
              onClick={(event) => handleAnchorClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}

          <div className={styles.drawerFooter}>
            <p className={styles.drawerQuote}>
              Kobiecosc to sila, swiatlo i piekno, ktore zaczyna sie od Ciebie.
            </p>
          </div>
        </nav>

        <a
          className={styles.ctaButton}
          href="#kontakt"
          onClick={(event) => handleAnchorClick(event, "#kontakt")}
        >
          <span className={styles.ctaLabel}>Skontaktuj sie</span>
        </a>
      </div>
    </header>
  );
}
