import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    // .env optional kalau env var sudah di-set
  }
}

const IMAGES = [
  {
    file: "pc-fullset.png",
    prompt:
      "Photorealistic product photo of a full desktop gaming setup: black tempered-glass PC tower with visible NVIDIA GeForce RTX 3060 graphics card and RGB RAM, next to a slim 24 inch Xiaomi monitor showing a colorful game menu, mechanical gaming keyboard and gaming mouse on a dark desk, moody dark room with subtle green and teal accent lighting, commercial product photography, sharp focus, horizontal 16:9"
  },
  {
    file: "gpu-closeup.png",
    prompt:
      "Macro close-up photograph of an NVIDIA GeForce RTX 3060 12GB graphics card installed inside a PC, fans and heatsink fins visible, subtle green accent light reflecting off the shroud, shallow depth of field, dark background, premium hardware photography, horizontal 16:9"
  },
  {
    file: "monitor-desk.png",
    prompt:
      "Photorealistic photo of a 24 inch Xiaomi slim-bezel monitor on a clean dark desk displaying a vivid Windows 11 desktop at 119Hz, back of a gaming keyboard in foreground with soft RGB glow, dark room with warm side light, lifestyle desk setup photography, horizontal 16:9"
  },
  {
    file: "internals.png",
    prompt:
      "Photorealistic top-down view into an open PC case: Intel Core i5 processor area, 24GB DDR4 RAM sticks, M.2 NVMe SSD on the motherboard, clean cable management, soft studio lighting with a faint green tint, hardware detail photography, horizontal 16:9"
  }
];

async function generate(item) {
  const res = await fetch(
    "https://apihub.agnes-ai.com/v1/images/generations",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AGNES_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "agnes-image-2.5-flash",
        prompt: item.prompt,
        n: 1,
        size: "1536x1024",
        response_format: "b64_json"
      })
    }
  );

  if (!res.ok) {
    throw new Error(`${item.file}: HTTP ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${item.file}: response tanpa b64_json`);

  writeFileSync(resolve(root, "public", item.file), Buffer.from(b64, "base64"));
  console.log(`OK  ${item.file}`);
}

loadEnv();
if (!process.env.AGNES_API_KEY) {
  console.error("AGNES_API_KEY tidak ditemukan di .env");
  process.exit(1);
}

for (const item of IMAGES) {
  try {
    await generate(item);
  } catch (err) {
    console.error(`FAIL ${item.file}: ${err.message}`);
    process.exitCode = 1;
  }
}
