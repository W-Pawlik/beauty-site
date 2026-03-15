"use client";

import Image from "next/image";
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
  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
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
        <nav aria-label="Primary navigation" className={styles.nav}>
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
