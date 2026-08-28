import { LandingStory } from "@/components/story/LandingStory";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Agnieszka Luzarska",
    jobTitle: "Konsultantka pielęgnacji i makijażu Mary Kay",
    description:
      "Konsultacje pielęgnacyjne, makijażowe i spotkania beauty prowadzone spokojnie, praktycznie i z uważnością na potrzeby klientek.",
    knowsAbout: ["pielęgnacja skóry", "makijaż", "konsultacje beauty"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingStory />
    </>
  );
}
