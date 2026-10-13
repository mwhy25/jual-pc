import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { games } from "../data/games";

function Counter() {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(eased * games.count));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="game-counter" ref={ref}>
      <div className="game-counter-num">
        {val}
        <span>+++</span>
      </div>
      <div className="game-counter-label">game bisa dimainkan</div>
    </div>
  );
}

export function GamesPanel() {
  const [active, setActive] = useState(0);
  const current = games.featured[active];

  return (
    <>
      <p className="panel-intro">{games.intro}</p>

      <div className="games-grid">
          {games.featured.map((g, i) => (
            <button
              key={g.name}
              className={`game-card${active === i ? " active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <div className="game-thumb">
                <Image src={g.img} alt={`Key art ${g.name}`} width={1536} height={1024} />
                <span className="game-free">Gratis</span>
              </div>
              <div className="game-card-body">
                <div className="game-name">{g.name}</div>
                <div className="game-genre">{g.genre}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="game-detail" key={current.name}>
          <div className="game-detail-img">
            <Image
              src={current.img}
              alt={`Setting grafik ${current.name}`}
              width={1536}
              height={1024}
            />
          </div>
          <div className="game-detail-body">
            <div className="game-detail-title">{current.name}</div>
            <div className="game-spec-grid">
              <div className="game-spec">
                <span className="gs-k">Grafik tertinggi</span>
                <span className="gs-v">{current.setting}</span>
              </div>
              <div className="game-spec">
                <span className="gs-k">Resolusi</span>
                <span className="gs-v">{current.res}</span>
              </div>
              <div className="game-spec">
                <span className="gs-k">FPS estimasi</span>
                <span className="gs-v">{current.fps}</span>
              </div>
            </div>
            <p className="game-note">{current.note}</p>
          </div>
        </div>

        <Counter />

        <div className="game-others">
          <div className="game-others-title">Populer lainnya yang tetap lancar</div>
          <div className="chips">
            {games.others.map((name) => (
              <span className="chip" key={name}>{name}</span>
            ))}
            <span className="chip chip-more">{games.moreNote}</span>
          </div>
        </div>
    </>
  );
}
