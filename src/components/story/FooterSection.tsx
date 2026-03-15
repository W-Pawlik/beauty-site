"use client";

import styles from "./FooterSection.module.css";

const navItems = [
  { label: "Start", href: "#home" },
  { label: "O mnie", href: "#aboutMe" },
  { label: "Oferta", href: "#oferta" },
  { label: "Galeria", href: "#galeria" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
];

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <h3 className={styles.brandTitle}>Piekna z Mary Kay</h3>
            <p className={styles.brandSubtitle}>Agnieszka Luzarska</p>
          </div>

          <div className={styles.navColumn}>
            <h4 className={styles.columnTitle}>Nawigacja</h4>
            <nav aria-label="Stopka - nawigacja" className={styles.nav}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.contactColumn}>
            <h4 className={styles.columnTitle}>Kontakt</h4>
            <div className={styles.contactRow}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13zm2 1.1v.3l7 4.9 7-4.9v-.3a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5zm14 2.7-6.4 4.5a1 1 0 0 1-1.2 0L5 9.3v9.2c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5V9.3z" />
                </svg>
              </span>
              <a href="mailto:kontakt@agnieszkaluzarska.pl" className={styles.contactLink}>
                kontakt@agnieszkaluzarska.pl
              </a>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M6.6 3h3.2l1.2 5.1-2.2 1.9c.8 1.7 2.2 3.2 3.9 4l1.9-2.2L20 13v3.2C20 18 18.6 19.4 16.8 19.4c-7.5 0-13.6-6.1-13.6-13.6C3.2 4.4 4.6 3 6.6 3z" />
                </svg>
              </span>
              <a href="tel:+48500100200" className={styles.contactLink}>
                +48 500 100 200
              </a>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.8c-3.7 0-6.7 3-6.7 6.7 0 5.2 6.1 11.5 6.4 11.8.2.2.5.2.7 0 .3-.3 6.4-6.6 6.4-11.8 0-3.7-3-6.7-6.8-6.7zm0 9.3a2.6 2.6 0 1 1 0-5.3 2.6 2.6 0 0 1 0 5.3z" />
                </svg>
              </span>
              <p className={styles.location}>Warszawa, Polska</p>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            Copyright {new Date().getFullYear()} Agnieszka Luzarska
          </p>

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
        </div>
      </div>
    </footer>
  );
}
