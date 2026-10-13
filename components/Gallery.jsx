import { useEffect, useState } from "react";
import Image from "next/image";

export default function Gallery({ items }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, items.length]);

  return (
    <>
      <div className="gallery">
        {items.map((item, i) => (
          <button
            key={item.src}
            className="cell reveal"
            style={{ transitionDelay: `${i * 70}ms` }}
            onClick={() => setActive(i)}
            aria-label={`Buka gambar: ${item.caption}`}
          >
            <Image src={item.src} alt={item.alt} width={1536} height={1024} />
            <span className="cap">{item.caption}</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lb" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <button className="lb-close" onClick={() => setActive(null)}>Tutup (Esc)</button>
          <button
            className="lb-btn lb-prev"
            aria-label="Sebelumnya"
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + items.length) % items.length); }}
          >&#8592;</button>
          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[active].src}
              alt={items[active].alt}
              width={1536}
              height={1024}
              priority
            />
          </div>
          <button
            className="lb-btn lb-next"
            aria-label="Selanjutnya"
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % items.length); }}
          >&#8594;</button>
          <div className="lb-cap">
            {items[active].caption} &middot; {active + 1}/{items.length}
          </div>
        </div>
      )}
    </>
  );
}
