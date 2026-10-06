import { ChevronDown } from "lucide-react";

export default function PageHero({ site, page, title, children, large = false }) {
  const image = site.backgrounds[page] || site.backgrounds.forside;
  return (
    <section
      className={`page-hero ${large ? "page-hero--large" : ""}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="page-hero__overlay" />
      <div className="container page-hero__inner">
        <img className="page-hero__logo" src={site.logoWhite} alt="" aria-hidden="true" />
        {title && <h1 className="page-hero__title">{title}</h1>}
        {large ? (
          <h1 className="page-hero__tagline page-hero__tagline--big">{site.tagline}</h1>
        ) : (
          <p className="page-hero__tagline">{site.tagline}</p>
        )}
        {children}
      </div>
      {large && (
        <a href="#velkommen" className="scroll-down" aria-label="Rul ned">
          <ChevronDown size={44} strokeWidth={1.5} />
        </a>
      )}
    </section>
  );
}
