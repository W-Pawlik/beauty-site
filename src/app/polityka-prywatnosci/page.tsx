import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Informacje o prywatności, danych kontaktowych i plikach cookies na stronie Agnieszki Luzarskiej.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link className={styles.backLink} href="/">
          Wróć do strony głównej
        </Link>

        <p className={styles.kicker}>Informacje prawne</p>
        <h1>Polityka prywatności</h1>
        <p className={styles.lead}>
          Poniżej wyjaśniam, jakie dane mogą pojawić się w kontakcie ze mną,
          dlaczego mogą być potrzebne i jak dbam o prywatność osób odwiedzających
          tę stronę.
        </p>

        <section aria-labelledby="administrator">
          <h2 id="administrator">1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest Agnieszka Luzarska. W sprawach
            dotyczących prywatności możesz napisać na adres{" "}
            <a href="mailto:kontakt@agnieszkaluzarska.pl">
              kontakt@agnieszkaluzarska.pl
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="data">
          <h2 id="data">2. Jakie dane mogą być przetwarzane</h2>
          <p>
            Jeśli skontaktujesz się ze mną e-mailem lub telefonicznie, mogą to
            być dane, które podasz dobrowolnie, na przykład imię, adres e-mail,
            numer telefonu i treść wiadomości. Strona nie ma kont użytkowników,
            płatności online ani formularza podłączonego obecnie do serwera.
            Dane wpisane w formularzu na stronie są na tym etapie sprawdzane
            lokalnie w przeglądarce i nie są wysyłane.
          </p>
        </section>

        <section aria-labelledby="purposes">
          <h2 id="purposes">3. Cele i podstawa przetwarzania</h2>
          <p>
            Dane przekazane w bezpośrednim kontakcie są wykorzystywane do
            odpowiedzi na pytanie, ustalenia konsultacji lub przygotowania
            informacji o ofercie. Podstawą może być podjęcie działań na Twoje
            żądanie przed zawarciem umowy albo prawnie uzasadniony interes
            administratora polegający na obsłudze korespondencji.
          </p>
        </section>

        <section aria-labelledby="recipients">
          <h2 id="recipients">4. Odbiorcy i czas przechowywania</h2>
          <p>
            Dane mogą trafić do dostawców poczty elektronicznej, usług
            telekomunikacyjnych i hostingu, wyłącznie w zakresie potrzebnym do
            obsługi kontaktu i działania strony. Przechowuję je przez czas
            potrzebny do odpowiedzi i prowadzenia sprawy, a następnie przez okres
            niezbędny do ochrony przed ewentualnymi roszczeniami.
          </p>
        </section>

        <section aria-labelledby="rights">
          <h2 id="rights">5. Twoje prawa</h2>
          <p>
            Masz prawo żądać dostępu do danych, ich sprostowania, usunięcia,
            ograniczenia przetwarzania oraz, gdy ma to zastosowanie, przeniesienia
            danych lub wycofania zgody. Możesz też wnieść skargę do Prezesa
            Urzędu Ochrony Danych Osobowych. W tym celu napisz na adres podany w
            sekcji kontaktowej.
          </p>
        </section>

        <section aria-labelledby="analytics">
          <h2 id="analytics">6. Analityka</h2>
          <p>
            Strona korzysta z Vercel Web Analytics. Narzędzie ma służyć do
            zbiorczych statystyk odwiedzin i według dokumentacji Vercel nie używa
            plików cookies ani identyfikatorów śledzących użytkownika między
            stronami. Nie wysyłamy do analityki danych wpisywanych w formularzu
            ani nie konfigurujemy własnych zdarzeń zawierających dane osobowe.
          </p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies">7. Pliki cookies</h2>
          <p>
            W aktualnej wersji strona nie wykorzystuje własnych ani reklamowych
            plików cookies. Niezbędne techniczne dane mogą być obsługiwane przez
            przeglądarkę, hosting lub urządzenie użytkownika, aby strona mogła
            działać prawidłowo. Ponieważ nie ma tu opcjonalnych cookies
            analitycznych, marketingowych ani profilujących, nie wyświetlamy
            banera zgody cookie.
          </p>
          <p>
            Jeśli w przyszłości pojawią się narzędzia wymagające zgody, zostaną
            uruchomione dopiero po świadomym wyborze użytkownika, a informacja o
            nich zostanie zaktualizowana.
          </p>
        </section>

        <section aria-labelledby="external">
          <h2 id="external">8. Linki zewnętrzne</h2>
          <p>
            Odnośniki do poczty, telefonu i serwisów społecznościowych prowadzą
            poza tę stronę. Po ich otwarciu zastosowanie mają zasady prywatności
            odpowiedniego dostawcy.
          </p>
        </section>

        <p className={styles.updated}>Ostatnia aktualizacja: 28 sierpnia 2026 r.</p>
      </article>
    </main>
  );
}
