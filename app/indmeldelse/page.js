import PageHero from "@/components/PageHero";
import MembershipForm from "@/components/MembershipForm";
import { getJson, getSite } from "@/lib/content";

export const metadata = { title: "Indmeldelse" };

export default function IndmeldelsePage() {
  const site = getSite();
  const config = getJson("indmeldelse");

  return (
    <>
      <PageHero site={site} page="indmeldelse" title={config.title} />
      <section className="section">
        <div className="container container--narrow">
          <h2 className="section-title">{config.title}</h2>
          <p className="lead">{config.intro}</p>
          <MembershipForm config={config} />
        </div>
      </section>
    </>
  );
}
