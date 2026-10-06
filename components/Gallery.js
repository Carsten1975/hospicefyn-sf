"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Gallery({ images }) {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <div className="gallery">
        {images.map((src, i) => (
          <button key={src} className="gallery__item" onClick={() => setActive(i)} aria-label={`Vis billede ${i + 1}`}>
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox__close" onClick={close} aria-label="Luk">
            <X size={30} />
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Forrige"
          >
            <ChevronLeft size={40} />
          </button>
          <img src={images[active]} alt="" onClick={(e) => e.stopPropagation()} />
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Næste"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
}
