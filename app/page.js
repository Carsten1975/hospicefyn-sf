import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import SupportIcon from "@/components/SupportIcon";
import { getJson, getMarkdown, getSite } from "@/lib/content";

export default function HomePage() {
  const site = getSite();
  const intro = getMarkdown("forside");
  const gallery = getJson("galleri");

  return (
    <>
      <PageHero site={site} page="forside" large>
        <div className="hero-buttons">
          {site.frontpageButtons.map((b) => (
            <a key={b.label} href={b.href} className="btn btn-outline" target="_blank" rel="noopener">
              {b.label}
            </a>
          ))}
        </div>
      </PageHero>

      <section id="velkommen" className="section">
        <div className="container">
          <h2 className="section-title section-title--left">{intro.data.title}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: intro.html }} />
        </div>
      </section>

      <section className="support" style={{ backgroundImage: `url(${site.backgrounds.tilskud})` }}>
        <div className="support__overlay" />
        <div className="container support__inner">
          <h2 className="section-title section-title--light">{site.support.title}</h2>
          <div className="support-grid">
            {site.support.items.map((item) => (
              <div key={item.title} className="support-item">
                <div className="support-item__icon">
                  <SupportIcon name={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{gallery.title}</h2>
          <p className="section-subtitle">{gallery.subtitle}</p>
          <Gallery images={gallery.images} />
        </div>
      </section>

      <CtaBand site={site} />
    </>
  );
}
