import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { listing, rupiah } from "../data/listing";
import Gallery from "../components/Gallery";
import SpecTabs from "../components/SpecTabs";
import PriceNego from "../components/PriceNego";
import Faq from "../components/Faq";
import UseCases from "../components/UseCases";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const ref = useReveal();
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = `https://wa.me/${listing.waNumber}?text=${encodeURIComponent(
    "Halo bos, saya lihat listing PC gaming fullset i5-12400F + RTX 3060 di web. Masih ready?"
  )}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>PC Gaming i5-12400F + RTX 3060 Fullset — Turun Harga! COD Halim Jaktim</title>
        <meta
          name="description"
          content="PC gaming rakitan pribadi: i5-12400F, RTX 3060 12GB, RAM 24GB. Fullset turun jadi Rp8.900.000 (dari Rp9.500.000), PC only Rp7.000.000. COD ambil di rumah, Halim Jaktim. Transfer BCA/Mandiri/BRI."
        />
      </Head>

      <div ref={ref}>
        {/* HERO */}
        <header className="hero">
          <div className="hero-bg">
            <Image
              src="/pc-fullset.png"
              alt="Fullset PC gaming i5-12400F dengan RTX 3060, monitor, keyboard, dan mouse"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="hero-inner">
            <div className="wrap">
              <span className="tag">Gas, bos! Unit pribadi dicairin &middot; Fullset &middot; DxDiag 13 Okt 2026</span>
              <h1>
                Tinggal colok,<br />
                <em>langsung gas.</em>
              </h1>
              <p className="hero-sub">
                PC gaming rakitan pribadi, rawatan sendiri: i5-12400F, RTX 3060 12GB,
                RAM 24GB, plus monitor Xiaomi 24&quot; 119Hz, keyboard, dan mouse.
                Laporan DxDiag-nya bersih — no error, no drama, siap main.
              </p>
              <div className="hero-price">
                <span className="amount">
                  <s className="old-price">{rupiah(listing.priceOld)}</s>
                  {rupiah(listing.price)}
                </span>
                <span className="drop-chip">Turun dari Rp9,5 jt, bos! 🔥</span>
                <span className="unit-chip">⚡ Cuma 1 unit!</span>
                <span className="cod-chip">📍 COD Halim, Jaktim</span>
              </div>
              <p className="hero-price-note">
                Fullset nego &middot; PC only {rupiah(listing.pcOnly.price)} tanpa nego
                &middot; Transfer BCA / Mandiri / BRI
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#harga">Nego dulu, bos</a>
                <a className="btn btn-ghost" href="#spek">Intip speknya</a>
              </div>
            </div>
          </div>
        </header>

        {/* STATUS STRIP */}
        <div className="strip">
          <div className="wrap">
            <div className="strip-grid">
              <div className="strip-item">
                <div className="k">RAM 24 GB DDR</div>
                <div className="v">Lega banget — multitasking santai. Terbaca DxDiag: 24576 MB</div>
              </div>
              <div className="strip-item">
                <div className="k">NVIDIA RTX 3060 12 GB</div>
                <div className="v">Game AAA aman di setting tinggi. VGA dedicated 12113 MB</div>
              </div>
              <div className="strip-item">
                <div className="k ok">720 GB</div>
                <div className="v">Muat banyak game — siap pakai setelah reset / install ulang (SSD 243 GB + HDD 477 GB)</div>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <section id="galeri">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="sec-kicker">Galeri</div>
              <h2 className="sec-title">Barangnya kayak gini, bos</h2>
              <p className="sec-desc">
                Klik gambar buat perbesar. Pakai panah kiri/kanan buat pindah —
                foto asli, bukan gambar internet.
              </p>
            </div>
            <Gallery items={listing.gallery} />
          </div>
        </section>

        {/* SPECS */}
        <section id="spek">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="sec-kicker">Spesifikasi</div>
              <h2 className="sec-title">Isi unitnya, jujur semua</h2>
              <p className="sec-desc">
                Semua data diambil langsung dari laporan DxDiag, bukan tulisan
                tangan — angkanya asli, bos.
              </p>
            </div>
            <div className="reveal">
              <SpecTabs tabs={listing.tabs} source={listing.source} />
            </div>
          </div>
        </section>

        {/* USE CASES: GAME > EDIT VIDEO > KANTORAN */}
        <UseCases />

        {/* PRICE */}
        <section id="harga">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="sec-kicker">Harga</div>
              <h2 className="sec-title">Nego di sini, bos. Jangan malu-malu</h2>
              <p className="sec-desc">
                Harga segini masih masuk akal banget buat spek kayak gini. Geser
                slider, tawaran langsung jadi pesan WhatsApp — tinggal kirim.
              </p>
            </div>
            <PriceNego data={listing} />
          </div>
        </section>

        {/* TRANSAKSI */}
        <section className="deal-section">
          <div className="wrap">
            <div className="deal-grid reveal">
              <div className="deal-card">
                <div className="deal-icon">📍</div>
                <div>
                  <div className="deal-title">COD Ambil di Rumah</div>
                  <p className="deal-desc">{listing.deal.codNote}</p>
                </div>
              </div>
              <div className="deal-card">
                <div className="deal-icon">🏦</div>
                <div>
                  <div className="deal-title">Transfer Bank Saja</div>
                  <p className="deal-desc">{listing.deal.paymentNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTES + FAQ */}
        <section id="catatan">
          <div className="wrap">
            <div className="two-col">
              <div className="reveal">
                <div className="sec-head">
                  <div className="sec-kicker">Catatan penjual</div>
                  <h2 className="sec-title">Sebelum beli</h2>
                </div>
                <ul className="note-list">
                  {listing.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
              <div className="reveal" style={{ transitionDelay: "80ms" }}>
                <div className="sec-head">
                  <div className="sec-kicker">FAQ</div>
                  <h2 className="sec-title">Pertanyaan</h2>
                </div>
                <Faq items={listing.faq} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="wrap">
            <div className="cta-block reveal">
              <h2>Jangan kebanyakan mikir, bos — unit gini cepet laku</h2>
              <p>
                Cuma ada satu unit, siapa cepat dapat. Fullset komplit: PC + monitor +
                keyboard + mouse, kondisi normal, Windows 11 Pro siap pakai. Mau test
                dulu? Silakan, gas aja ke rumah.
              </p>
              <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer">
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>
        </section>

        <footer>
          <div className="wrap">
            Data dari DxDiag1.txt &middot; {listing.source} &middot; Estimasi harga
            marketplace Indonesia Oktober 2026
          </div>
        </footer>
      </div>

      {/* STICKY BAR */}
      <div className={`sticky-bar${stuck ? " show" : ""}`}>
        <div className="sticky-inner">
          <div>
            <div className="sticky-price">{rupiah(listing.price)}</div>
            <div className="sticky-name">
              Cuma 1 unit &middot; siapa cepat dapat &middot; Fullset nego &middot; PC only {rupiah(listing.pcOnly.price)}
            </div>
          </div>
          <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
