import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getSite } from "@/lib/content";

export default function NotFound() {
  const site = getSite();
  return (
    <>
      <PageHero site={site} title="Siden blev ikke fundet" />
      <section className="section">
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="lead">Siden eller filen findes ikke (længere).</p>
          <Link href="/" className="btn btn-solid">Til forsiden</Link>
        </div>
      </section>
    </>
  );
}
