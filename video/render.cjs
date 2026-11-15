#!/usr/bin/env node
/**
 * Renders video/film.html to real video files, frame by frame.
 *
 *   node video/render.cjs            → public/video/athena-boards-film.{mp4,webm,jpg}
 *   node video/render.cjs --stills   → public/img/scenes/*.webp (hero photos)
 *
 * Needs Playwright (any recent version) and ffmpeg on the PATH. If Chromium is
 * not where Playwright expects it, set CHROMIUM_PATH.
 *
 * The film is deterministic: film.js exposes window.__seek(seconds), so every
 * frame is drawn exactly, independent of how fast this machine is.
 */
const { chromium } = require("playwright");
const { spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "video");
const STILLS_OUT = path.join(ROOT, "public", "img", "scenes");
const FPS = 30;
const POSTER_AT = 24.9; // seconds: the screen live on the café wall

const launch = () =>
  chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ["--allow-file-access-from-files", "--font-render-hinting=none"],
  });

function ffmpeg(args, input) {
  const res = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { input, stdio: [input ? "pipe" : "ignore", "inherit", "inherit"] });
  if (res.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
}

async function renderFilm() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await launch();
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })).newPage();
  page.on("pageerror", (e) => console.error("page error:", e.message));
  await page.goto("file://" + path.join(__dirname, "film.html") + "?render", { waitUntil: "load" });
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
  const duration = await page.evaluate(() => window.__DUR);
  const frames = Math.round(duration * FPS);

  // Near-lossless master; the delivery files are encoded from it.
  const master = path.join(OUT, "master.mkv");
  const enc = spawn(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
      "-c:v", "libx264", "-preset", "veryfast", "-crf", "8", "-pix_fmt", "yuv444p", master],
    { stdio: ["pipe", "inherit", "inherit"] },
  );
  const done = new Promise((resolve, reject) => enc.on("close", (code) => (code === 0 ? resolve() : reject(new Error("ffmpeg exited " + code)))));

  const started = Date.now();
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => window.__seek(t), i / FPS);
    const shot = await page.screenshot({ type: "jpeg", quality: 97 });
    if (!enc.stdin.write(shot)) await new Promise((r) => enc.stdin.once("drain", r));
    if (i % 150 === 0) console.log(`frame ${i}/${frames}  (${((Date.now() - started) / 1000).toFixed(0)}s)`);
  }
  enc.stdin.end();
  await done;

  // Poster frame, straight from the stage.
  await page.evaluate((t) => window.__seek(t), POSTER_AT);
  const poster = await page.screenshot({ type: "png" });
  await browser.close();

  const base = path.join(OUT, "athena-boards-film");
  ffmpeg(["-i", "-", "-vf", "scale=1600:-2", "-q:v", "4", base + ".jpg"], poster);
  // H.264 for everything; a keyframe every second keeps chapter seeking snappy.
  ffmpeg(["-i", master, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-profile:v", "high",
    "-g", String(FPS), "-keyint_min", String(FPS), "-movflags", "+faststart", base + ".mp4"]);
  // VP9 for browsers that prefer it (smaller).
  ffmpeg(["-i", master, "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-g", String(FPS), "-pix_fmt", "yuv420p", base + ".webm"]);
  fs.unlinkSync(master);

  for (const ext of ["mp4", "webm", "jpg"]) {
    const f = `${base}.${ext}`;
    console.log(path.relative(ROOT, f), (fs.statSync(f).size / 1e6).toFixed(2) + " MB");
  }
}

/** Hero photos: each room as a 4:5 still with a real board on the screen. */
const STILLS = [
  { name: "cafe", venue: "cafe", board: "mamas-boy" },
  { name: "taqueria", venue: "taqueria", board: "lalos" },
  { name: "roastery", venue: "roastery", board: "thousand-faces-portrait", up: true },
  { name: "lobby", venue: "lobby", board: "ywco" },
];

async function renderStills() {
  fs.mkdirSync(STILLS_OUT, { recursive: true });
  const browser = await launch();
  // The room photos are 1024×1280; rendering at 1.5× keeps the board text sharp on dense screens.
  const page = await (await browser.newContext({ viewport: { width: 1024, height: 1280 }, deviceScaleFactor: 1.5 })).newPage();
  for (const s of STILLS) {
    const q = new URLSearchParams({ v: s.venue, img: `../public/img/${s.board}-lg.webp`, ...(s.up ? { up: "1" } : {}) });
    await page.goto("file://" + path.join(__dirname, "stills.html") + "?" + q, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
    const png = await page.screenshot({ type: "png" });
    const out = path.join(STILLS_OUT, s.name + ".webp");
    ffmpeg(["-i", "-", "-c:v", "libwebp", "-quality", "82", out], png);
    console.log(path.relative(ROOT, out), (fs.statSync(out).size / 1e3).toFixed(0) + " KB");
  }
  await browser.close();
}

(process.argv.includes("--stills") ? renderStills() : renderFilm()).catch((e) => {
  console.error(e);
  process.exit(1);
});
