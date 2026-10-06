import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { FileText } from "lucide-react";
import { getJson, getSite } from "@/lib/content";

export const metadata = { title: "Generalforsamling & referater" };

export default function GeneralforsamlingPage() {
  const site = getSite();
  const page = getJson("generalforsamling");

  return (
    <>
      <PageHero site={site} page="generalforsamling" title="Generalforsamling & referater" />
      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">{page.title}</h2>
          <ul className="doc-list">
            {page.documents.map((d) => (
              <li key={d.file}>
                <a href={d.file} target="_blank" rel="noopener">
                  <FileText size={22} aria-hidden="true" />
                  <span>{d.label}</span>
                  <small>PDF</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand site={site} />
    </>
  );
}
