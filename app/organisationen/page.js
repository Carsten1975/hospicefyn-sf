import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Phone, MapPin } from "lucide-react";
import { getJson, getSite } from "@/lib/content";

export const metadata = { title: "Organisationen" };

export default function OrganisationPage() {
  const site = getSite();
  const org = getJson("organisationen");

  return (
    <>
      <PageHero site={site} page="organisationen" title={org.title} />
      <section className="section">
        <div className="container">
          <h2 className="section-title">Bestyrelsen</h2>
          <div className="board-grid">
            {org.members.map((m) => (
              <article key={m.name} className="board-card">
                <div className="board-card__photo">
                  <img src={m.photo} alt={m.name} loading="lazy" />
                </div>
                <div className="board-card__body">
                  <h3>{m.name}</h3>
                  <p className="board-card__role">{m.role}</p>
                  <p className="board-card__line">
                    <MapPin size={16} aria-hidden="true" /> {m.address}
                  </p>
                  <p className="board-card__line">
                    <Phone size={16} aria-hidden="true" />{" "}
                    <a href={`tel:+45${m.phone.replace(/\s/g, "")}`}>{m.phone}</a>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand site={site} />
    </>
  );
}
