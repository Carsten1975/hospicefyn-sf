import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { getMarkdown, getSite } from "@/lib/content";

export const metadata = { title: "Vedtægter" };

export default function VedtaegterPage() {
  const site = getSite();
  const page = getMarkdown("vedtaegter");

  return (
    <>
      <PageHero site={site} page="vedtaegter" title={page.data.title} />
      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">{page.data.heading}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      </section>
      <CtaBand site={site} />
    </>
  );
}
