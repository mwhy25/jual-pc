import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const TARGETS = [
  { slug: "game-genshin", name: "Genshin Impact", urls: ["https://genshin.hoyoverse.com/"] },
  { slug: "game-valorant", name: "Valorant", newsHub: "https://playvalorant.com/en-us/news/", urls: ["https://playvalorant.com/", "https://playvalorant.com/en-us/", "https://playvalorant.com/th-th/"] },
  { slug: "game-pubg", name: "PUBG", urls: ["https://www.pubg.com/"] },
  { slug: "game-apex", name: "Apex Legends", urls: ["https://www.ea.com/games/apex-legends"] },
  { slug: "game-fortnite", name: "Fortnite", urls: ["https://www.fortnite.com/", "https://www.fortnite.com/news", "https://store.epicgames.com/en-US/p/fortnite"], fromApi: "https://store-content.ak.epicgames.com/api/en-US/content/products/fortnite", prefer: "2560x1440" }
];

const MIN_BYTES = 30 * 1024;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const BROWSER_HEADERS = {
  "User-Agent": UA,
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1"
};

function pickImageUrl(html) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m && m[1]) return m[1];
  }
  return null;
}

function extFrom(url, contentType) {
  const m = url.match(/\.(png|jpe?g|webp)(?:$|\?)/i);
  if (m) return m[1].toLowerCase().replace("jpeg", "jpg");
  if (contentType) {
    const map = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
    const key = contentType.split(";")[0].trim().toLowerCase();
    if (map[key]) return map[key];
  }
  return "jpg";
}

async function fetchImage(t, url) {
  const pageRes = await fetch(url, {
    headers: { ...BROWSER_HEADERS, Referer: new URL(url).origin + "/" },
    redirect: "follow"
  });
  if (!pageRes.ok) throw new Error(`halaman ${pageRes.status} (${url})`);
  const html = await pageRes.text();

  const img = pickImageUrl(html);
  if (img) {
    try {
      const abs = new URL(img, url).href;
      const imgRes = await fetch(abs, { headers: { "User-Agent": UA, Referer: url }, redirect: "follow" });
      if (imgRes.ok) {
        const buf = Buffer.from(await imgRes.arrayBuffer());
        if (buf.length >= MIN_BYTES) {
          return { buf, abs, contentType: imgRes.headers.get("content-type") };
        }
      }
    } catch {
      // lanjut ke scan
    }
  }

  // fallback: gambar terbesar di halaman
  const candidates = [...new Set(
    (html.match(/https?:\/\/[^"' )\\]+?\.(?:png|jpe?g|webp)/gi) || [])
      .filter((u) => !/logo|icon|favicon|sprite|arrow|badge/i.test(u))
  )].slice(0, 15);

  let best = null;
  for (const c of candidates) {
    try {
      const head = await fetch(c, { method: "HEAD", headers: { "User-Agent": UA, Referer: url }, redirect: "follow" });
      if (!head.ok) continue;
      const size = Number(head.headers.get("content-length") || 0);
      if (size >= MIN_BYTES && (!best || size > best.size)) best = { url: c, size };
    } catch {
      // abaikan
    }
  }
  if (!best) throw new Error(`tidak ada gambar besar (${url})`);

  const imgRes = await fetch(best.url, { headers: { "User-Agent": UA, Referer: url }, redirect: "follow" });
  if (!imgRes.ok) throw new Error(`gambar ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  if (buf.length < MIN_BYTES) throw new Error(`gambar terlalu kecil (${buf.length} B)`);

  return { buf, abs: best.url, contentType: imgRes.headers.get("content-type") };
}

// Ambil gambar berita terbaru dari hub news (Next.js __NEXT_DATA__)
async function fromNewsHub(t) {
  const res = await fetch(t.newsHub, { headers: { "User-Agent": UA, Accept: "text/html" }, redirect: "follow" });
  if (!res.ok) throw new Error(`news hub ${res.status}`);
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) throw new Error("__NEXT_DATA__ tidak ada");
  const data = JSON.parse(m[1]);

  const blades = data?.props?.pageProps?.page?.blades || [];
  const grid = blades.find((b) => Array.isArray(b.items) && b.items.length);
  if (!grid) throw new Error("blade artikel tidak ditemukan");

  const item = grid.items.find((it) => it.imageMedia?.url && it.title);
  if (!item) throw new Error("artikel tanpa gambar");

  const url = item.imageMedia.url;
  const imgRes = await fetch(url, { headers: { "User-Agent": UA, Referer: t.newsHub }, redirect: "follow" });
  if (!imgRes.ok) throw new Error(`gambar news ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  if (buf.length < MIN_BYTES) throw new Error(`gambar terlalu kecil (${buf.length} B)`);

  const ext = extFrom(url, imgRes.headers.get("content-type"));
  const file = `${t.slug}.${ext}`;
  writeFileSync(resolve(root, "public", file), buf);
  console.log(`OK  ${t.name} -> ${file} (${(buf.length / 1024).toFixed(0)} KB) — berita: "${item.title}"`);
}

async function run(t) {
  if (t.newsHub) {
    try {
      await fromNewsHub(t);
      return;
    } catch (err) {
      console.error(`  news hub gagal (${err.message}), fallback ke halaman utama`);
    }
  }
  if (t.fromApi) {
    try {
      const res = await fetch(t.fromApi, { headers: { "User-Agent": UA } });
      if (res.ok) {
        const text = await res.text();
        const found = [...new Set(text.match(/https?:[^"'\\]+?\.(?:png|jpe?g|webp)/gi) || [])]
          .filter((u) => !/logo|icon|favicon|ratings|PEGI|ESRB|CERO|KR-|RU-/i.test(u));
        const pick =
          found.find((u) => u.includes(t.prefer)) ||
          found.find((u) => /keyart|launcher|blades?/i.test(u));
        if (pick) {
          const imgRes = await fetch(pick, { headers: { "User-Agent": UA } });
          if (imgRes.ok) {
            const buf = Buffer.from(await imgRes.arrayBuffer());
            if (buf.length >= MIN_BYTES) {
              const ext = extFrom(pick, imgRes.headers.get("content-type"));
              const file = `${t.slug}.${ext}`;
              writeFileSync(resolve(root, "public", file), buf);
              console.log(`OK  ${t.name} -> ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
              return;
            }
          }
        }
      }
    } catch {
      // lanjut ke fallback halaman
    }
  }
  let lastErr;
  for (const url of t.urls) {
    try {
      const { buf, abs, contentType } = await fetchImage(t, url);
      const ext = extFrom(abs, contentType);
      const file = `${t.slug}.${ext}`;
      writeFileSync(resolve(root, "public", file), buf);
      console.log(`OK  ${t.name} -> ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
      return;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

let failed = 0;
for (const t of TARGETS) {
  try {
    await run(t);
  } catch (err) {
    failed++;
    console.error(`FAIL ${t.name}: ${err.message} — pakai gambar generate lama`);
  }
}
if (failed) process.exitCode = 1;
