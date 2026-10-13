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
    // .env opsional
  }
}

const STYLE =
  "cinematic digital game key art, high detail lighting, rich color grade, horizontal 16:9 composition, no text, no logo, no watermark";

const IMAGES = [
  {
    file: "game-genshin.png",
    prompt: `Anime-style open world fantasy adventure game key art: a young traveler with a sword standing on a cliff edge overlooking a glowing ancient temple, waterfalls and floating rocks, warm golden sunset, vibrant blue sky. ${STYLE}`
  },
  {
    file: "game-valorant.png",
    prompt: `Stylized tactical hero shooter key art: two futuristic special forces agents aiming rifles inside a clean modern map corridor with minimal architecture, bold cel-shaded look, teal and warm red color contrast, dramatic side light. ${STYLE}`
  },
  {
    file: "game-pubg.png",
    prompt: `Gritty realistic battle royale shooter key art: a soldier in military gear sprinting across an abandoned island airbase, scattered crates and concrete bunkers, parachutes drifting in the dusk sky, hazy orange light. ${STYLE}`
  },
  {
    file: "game-apex.png",
    prompt: `Sci-fi battle royale key art: three armored arena legends in dynamic action poses in a desert canyon arena with futuristic structures, dust particles in the air, strong orange and teal sunset lighting, lens flare. ${STYLE}`
  },
  {
    file: "game-fortnite.png",
    prompt: `Colorful cartoon battle royale key art: stylized characters building wooden ramps and jumping through a bright toy-like landscape with rolling hills and playful structures, vivid daylight, saturated colors, fun energetic mood. ${STYLE}`
  }
];

async function generate(item) {
  const res = await fetch("https://apihub.agnes-ai.com/v1/images/generations", {
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
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("response tanpa b64_json");

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
