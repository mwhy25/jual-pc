import { useState } from "react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((item, i) => (
        <div key={item.q} className={`faq-item${open === i ? " open" : ""}`}>
          <button
            className="faq-q"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {item.q}
          </button>
          <div className="faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
