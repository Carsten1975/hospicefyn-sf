import Link from "next/link";

export default function Footer({ site }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Link href="/" className="footer-logo">
          <img src={site.logoBlack} alt={site.name} />
        </Link>
        <a className="footer-mail" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <Link href="/cookiepolitik/">Cookiepolitik</Link>
          <span className="sep">|</span>
          <span>{site.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
