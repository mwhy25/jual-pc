import { useState } from "react";
import { rupiah } from "../data/listing";

// Badge dari sisi seller: anchor rendah ditekan, yang beli di harga target
// disetujui, yang tawar tinggi didorong cepat deal.
const BADGES = [
  { max: 7800000, cls: "low", text: "Hmmmm… coba dulu deh bos, chat aja dulu 😅" },
  { max: 8300000, cls: "low", text: "Waduh, tipis banget bos. Masih coba nego ya?" },
  { max: 8800000, cls: "mid", text: "Nah, mulai masuk nih bos. Tinggal cocok sedikit!" },
  { max: 9400000, cls: "deal", text: "Harga spesial bos — sudah turun dari Rp9,5 jt!" },
  { max: 10400000, cls: "high", text: "Wih, tawaran mantap! Bisa amankan unit lebih cepat." },
  { max: Infinity, cls: "high", text: "Serius nih bos? Bisa langsung kita amankan hari ini!" }
];

export default function PriceNego({ data }) {
  const { price, priceOld, market, slider, pcOnly, waNumber } = data;
  const [offer, setOffer] = useState(price);
  const [plan, setPlan] = useState("fullset");

  const pct = (v) => ((v - slider.min) / (slider.max - slider.min)) * 100;

  const badge = BADGES.find((b) => offer <= b.max);

  const waFullset = encodeURIComponent(
    `Halo bos, saya tertarik PC gaming fullset i5-12400F + RTX 3060. Harga jual ${rupiah(price)}, saya ajukan tawaran ${rupiah(offer)}. Boleh lanjut?`
  );
  const waPcOnly = encodeURIComponent(
    `Halo bos, saya mau ambil PC Only i5-12400F + RTX 3060 seharga ${rupiah(pcOnly.price)}. Saya setuju harga pas tanpa nego. Masih ready?`
  );

  return (
    <div className="price-layout">
      <div className="price-card reveal">
        <h3>Hitung-hitungan harga per part</h3>
        {data.parts.map(([name, low, high]) => (
          <div className="part-row" key={name}>
            <span>{name}</span>
            <span className="rng">
              {low === high ? rupiah(low) : `${rupiah(low)} – ${rupiah(high)}`}
            </span>
          </div>
        ))}
        <div className="part-total">
          <span>Total pasar</span>
          <span className="rng">{rupiah(market.low)} – {rupiah(market.high)}</span>
        </div>
        <p className="nego-hint" style={{ marginTop: 12, marginBottom: 0 }}>
          Hitungan pasar Oktober 2026, bos. Spek segini di harga segini? Worth it.
        </p>
      </div>

      <div className="price-card reveal" style={{ transitionDelay: "80ms" }}>
        <h3>Pilih paket</h3>
        <div className="plan-tabs">
          <button
            className={`plan-btn${plan === "fullset" ? " active" : ""}`}
            onClick={() => setPlan("fullset")}
          >
            <span className="plan-name">Fullset</span>
            <span className="plan-price">
              <s className="old-price">{rupiah(priceOld)}</s>
              {rupiah(price)}
            </span>
            <span className="plan-desc">PC + monitor + keyboard + mouse</span>
          </button>
          <button
            className={`plan-btn${plan === "pconly" ? " active" : ""}`}
            onClick={() => setPlan("pconly")}
          >
            <span className="plan-name">PC Only</span>
            <span className="plan-price">{rupiah(pcOnly.price)}</span>
            <span className="plan-desc">Harga pas, tanpa nego</span>
          </button>
        </div>

        {plan === "fullset" ? (
          <>
            <div className="nego-value">
              <s className="old-price">{rupiah(priceOld)}</s>
              {rupiah(offer)}
            </div>
            <span className={`nego-badge ${badge.cls}`}>{badge.text}</span>

            <div className="scale">
              <div className="scale-track" />
              <div
                className="scale-zone"
                style={{ left: `${pct(market.low)}%`, width: `${pct(market.high) - pct(market.low)}%` }}
              />
              <div className="scale-pin" data-label="Tawaranmu" style={{ left: `calc(${pct(offer)}% - 1.5px)` }} />
              <span className="scale-mark" style={{ left: `${pct(market.low)}%` }}>{rupiah(market.low)}</span>
              <span className="scale-mark" style={{ left: `${pct(market.high)}%` }}>{rupiah(market.high)}</span>
            </div>

            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={offer}
              onChange={(e) => setOffer(Number(e.target.value))}
              aria-label="Pilih harga tawaran"
            />
            <p className="nego-hint">
              Harga normal {rupiah(priceOld)}, sekarang cukup {rupiah(price)}. Geser buat atur
              tawaran, lalu kirim langsung ke WhatsApp — chat aja dulu, bos.
            </p>

            <div className="nego-actions">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${waNumber}?text=${waFullset}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Kirim tawaran via WhatsApp
              </a>
              <button className="btn btn-ghost" onClick={() => setOffer(price)}>
                Reset ke {rupiah(price)}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="nego-value">{rupiah(pcOnly.price)}</div>
            <span className="nego-badge deal">Harga pas, tanpa nego — siapa cepat dapat, bos! 🔥</span>

            <ul className="pc-only-list">
              {pcOnly.includes.map((i) => (
                <li key={i} className="inc">{i}</li>
              ))}
              {pcOnly.excludes.map((i) => (
                <li key={i} className="exc">{i}</li>
              ))}
            </ul>

            <p className="nego-hint">
              Harga paling bawah, bos. Unit PC + komponen internal saja — tanpa monitor,
              keyboard, dan mouse.
            </p>

            <div className="nego-actions">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${waNumber}?text=${waPcOnly}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ambil PC Only via WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
