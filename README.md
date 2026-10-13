# PC Gaming i5-12400F + RTX 3060 — Listing (Next.js)

Listing page untuk jual PC fullset bekas. Next.js 14 (pages router), tanpa Tailwind, tanpa database. Semua statis (static export ready), cocok untuk Vercel.

## Fitur interaktif
- Galeri 4 gambar + lightbox (keyboard: Esc, panah kiri/kanan)
- Tab spesifikasi (Komponen / Penyimpanan & OS / Kelengkapan) + tombol salin spek
- Slider tawaran harga: geser, badge posisi terhadap estimasi pasar, link WhatsApp jadi pesan tawaran siap kirim
- Section game: 5 game gratis populer, klik kartu untuk lihat setting grafik tertinggi + FPS estimasi, counter animasi "50+++ game bisa dimainkan", daftar 32 game populer lainnya
- FAQ accordion, sticky bar harga saat scroll, animasi reveal on scroll

## Gambar
Di-generate dengan Agnes AI model `agnes-image-2.5-flash`, disimpan di `public/`. Regenerate:

```bash
npm run gen:images    # 4 gambar produk (fullset, VGA, monitor, isi dalam) via Agnes AI
npm run fetch:games   # 5 key art game dari situs resmi (og:image / CDN resmi)
npm run gen:games     # fallback: generate key art via Agnes AI kalau fetch gagal
```

Butuh `AGNES_API_KEY` di `.env`.

## Sumber data
- Spesifikasi: `DxDiag1.txt` (13 Oktober 2026)
- Harga: estimasi marketplace Indonesia Oktober 2026 → `data/listing.js`
- Game (5 featured + 32 lainnya) → `data/games.js`

## Edit sebelum deploy
Semua data di satu file: `data/listing.js`

- `waNumber` → nomor WhatsApp (format 62xxx)
- `price` → harga jual
- `market` / `slider` → rentang estimasi pasar dan batas slider
- `notes`, `faq`, `parts` → teks konten

## Jalankan lokal

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verifikasi build
npm run start      # server produksi
```

## Deploy ke Vercel

```bash
npm i -g vercel
vercel --prod
```

Atau import repo ke dashboard Vercel (framework otomatis terdeteksi: Next.js). File `.env` tidak ikut ter-deploy (sudah ada di `.gitignore`).

## Catatan
- `index.html` versi pertama dihapus, diganti versi Next.js ini.
- Isi SSD C: tinggal 15,5 GB — sudah diberi catatan di halaman.
