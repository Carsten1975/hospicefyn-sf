import Link from "next/link";

export default function CtaBand({ site }) {
  return (
    <section className="cta-band" style={{ backgroundImage: `url(${site.backgrounds.cta})` }}>
      <div className="cta-band__overlay" />
      <div className="container cta-band__inner">
        <h2 className="section-title section-title--light">{site.cta.title}</h2>
        <p>{site.cta.text}</p>
        <Link href="/indmeldelse/" className="btn btn-outline">
          {site.cta.button}
        </Link>
      </div>
    </section>
  );
}
