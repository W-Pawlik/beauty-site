import type { CosmeticProduct } from "./cosmetics.types";

// Tu dodawaj kolejne kosmetyki, ktore maja byc widoczne w ofercie.
export const cosmeticsOffer: CosmeticProduct[] = [
  {
    id: "timewise-set",
    name: "Zestaw pielegnacyjny TimeWise",
    description:
      "Codzienna rutyna pielegnacyjna dopasowana do potrzeb skory i trybu zycia.",
    price: "149 zl",
    image: "/images/kosmetyk1.jpg",
    alt: "Zestaw pielegnacyjny TimeWise",
    gallery: ["/images/kosmetyk2.jpg", "/images/kosmettyk3.jpg"],
    detailedDescription:
      "Kompleksowy zestaw do codziennej pielegnacji twarzy. Pomaga utrzymac komfort skory i swiezy wyglad przez caly dzien.",
    actionDescription:
      "Wspiera bariere ochronna skory, ogranicza przesuszenie i poprawia wyglad cery przy regularnym stosowaniu.",
    applicationTips: [
      "Stosuj rano i wieczorem na oczyszczona skore.",
      "Nakladaj produkty od najlzejszej do najbogatszej konsystencji.",
      "W ciagu dnia dolacz ochrone SPF.",
    ],
    ingredients: ["Gliceryna", "Peptydy", "Witamina E", "Ekstrakt roslinny"],
  },
  {
    id: "foundation-finish",
    name: "Podklad i wykonczenie makijazu",
    description:
      "Naturalne krycie, lekka formula i trwalosc na co dzien oraz na wieczorne wyjscia.",
    price: "119 zl",
    image: "/images/kosmetyk2.jpg",
    alt: "Podklad i wykonczenie makijazu",
    gallery: ["/images/kosmettyk3.jpg"],
    detailedDescription:
      "Podklad o komfortowej formule, ktory wyrownuje koloryt i daje efekt swiezej, zadbanej cery.",
    applicationTips: [
      "Rozprowadzaj cienkimi warstwami od srodka twarzy na zewnatrz.",
      "Dla wiekszego krycia dokladaj produkt punktowo.",
      "Utrwal strefe T lekkim pudrem.",
    ],
    ingredients: ["Pigmenty mineralne", "Nawilzajace emolienty"],
  },
  {
    id: "palette-daily",
    name: "Piecioramienna paleta kolorow",
    description:
      "Uniwersalna paleta odcieni do makijazu dziennego i eleganckiego looku wieczorowego.",
    price: "89 zl",
    image: "/images/kosmettyk3.jpg",
    alt: "Paleta kolorow do makijazu",
    gallery: ["/images/kosmetyk1.jpg"],
    actionDescription:
      "Pozwala tworzyc wiele wariantow makijazu: od delikatnego po bardziej wyrazisty.",
    applicationTips: [
      "Zacznij od bazowego cienia na cala powieke.",
      "Ciemniejszy odcien naloz w zewnetrznym kaciku oka.",
    ],
  },
  {
    id: "cc-cream-light",
    name: "CC Cream lekkie krycie",
    description:
      "Wyrownuje koloryt, subtelnie kryje i sprawdza sie przy szybkim makijazu dziennym.",
    price: "99 zl",
    image: "/images/kosmettyk3.jpg",
    alt: "CC cream Mary Kay",
    gallery: ["/images/kosmetyk2.jpg"],
    detailedDescription:
      "Produkt typu 2w1: delikatna korekcja kolorytu i codzienny komfort noszenia.",
  },
  {
    id: "hydrating-base",
    name: "Baza nawilzajaca pod makijaz",
    description:
      "Przygotowuje skore pod podklad i poprawia wyglad makijazu przez wiele godzin.",
    price: "109 zl",
    image: "/images/kosmetyk1.jpg",
    alt: "Baza pod makijaz",
    ingredients: ["Kwas hialuronowy", "Pantenol"],
  },
  {
    id: "finish-powder",
    name: "Puder wykanczajacy",
    description:
      "Wygladza i utrwala makijaz, pozostawiajac naturalne, satynowe wykonczenie.",
    price: "79 zl",
    image: "/images/kosmetyk2.jpg",
    alt: "Puder wykanczajacy",
  },
];
