import { useState } from "react";

export default function SpecTabs({ tabs, source }) {
  const [active, setActive] = useState(tabs[0].id);
  const [copied, setCopied] = useState(false);
  const current = tabs.find((t) => t.id === active);

  const copyAll = async () => {
    const text = tabs
      .map((t) => `[${t.label}]\n` + t.rows.map(([k, v]) => `${k}: ${v}`).join("\n"))
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            className={`tab${active === t.id ? " active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="spec-panel" role="tabpanel">
        {current.rows.map(([label, value]) => (
          <div className="spec-row" key={label}>
            <div className="label">{label}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>

      <div className="copy-bar">
        <button className="copy-btn" onClick={copyAll}>
          {copied ? "Tersalin" : "Salin semua spek"}
        </button>
        <span className="copy-msg">Sumber: {source}</span>
      </div>
    </div>
  );
}
