"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ site }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className={`site-header ${solid ? "is-solid" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="header-logo" onClick={() => setOpen(false)}>
          <img src={solid ? site.logoBlack : site.logoWhite} alt={site.name} />
        </Link>

        <nav className="header-nav" aria-label="Hovedmenu">
          {site.menu.map((item) =>
            item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            )
          )}
          <Link href="/indmeldelse/" className="btn btn-cta">
            indmeldelse
          </Link>
        </nav>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
          <span>{open ? "Luk" : "Menu"}</span>
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobilmenu">
          {site.menu.map((item) =>
            item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            )
          )}
          <Link href="/indmeldelse/" className="btn btn-cta" onClick={() => setOpen(false)}>
            indmeldelse
          </Link>
        </nav>
      </div>
    </header>
  );
}
