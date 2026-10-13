import { useState } from "react";
import { GamesPanel } from "./Games";
import { work } from "../data/work";

const TABS = [
  { id: "game", label: "Game", icon: "🎮" },
  { id: "video", label: "Edit Video", icon: "🎬" },
  { id: "kantoran", label: "Kantoran", icon: "💼" }
];

function WorkPanel({ data }) {
  return (
    <>
      <p className="panel-intro">{data.intro}</p>

      <div className="work-grid">
        {data.items.map((it) => (
          <div className="work-card" key={it.name}>
            <div className="work-name">{it.name}</div>
            <div className="work-task">{it.task}</div>
            <p className="work-note">{it.note}</p>
            <div className="chips">
              {it.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="work-note-block">{data.note}</div>
    </>
  );
}

export default function UseCases() {
  const [tab, setTab] = useState("game");

  return (
    <section id="game">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-kicker">Kegunaan</div>
          <h2 className="sec-title">Game, edit video, sampai kerja</h2>
          <p className="sec-desc">
            Satu unit, tiga fungsi. Pilih tab-nya, bos — semuanya aman di spek ini.
          </p>
        </div>

        <div className="tabs usecase reveal" role="tablist" aria-label="Kegunaan PC">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
              role="tab"
              aria-selected={tab === t.id}
            >
              <span className="tab-icon" aria-hidden="true">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="uc-panel" key={tab}>
          {tab === "game" && <GamesPanel />}
          {tab === "video" && <WorkPanel data={work.video} />}
          {tab === "kantoran" && <WorkPanel data={work.office} />}
        </div>
      </div>
    </section>
  );
}
