import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships the finished JIMSEM experience instead of the starter", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(page, /HALF JIMOTHY/);
  assert.match(page, /JOIN THE TRASH COUNCIL/);
  assert.match(page, /WRONG HABITAT\. SAME GUY\./);
  assert.match(page, /aria-labelledby="hero-title"/);
  assert.doesNotMatch(page, /A VERY SERIOUS INTERNET ANIMAL/);
  assert.doesNotMatch(page, /FACE: CONCERNED|BODY: ROUND|PLAN: UNKNOWN/);
  assert.doesNotMatch(page, /className="token-stats"/);
  assert.match(layout, /\$JIMSEM — Half Jimothy\. Half Raccoon\./);
  assert.doesNotMatch(page, /SkeletonPreview|Your site is taking shape/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
});

test("includes the required final artwork", async () => {
  const assets = [
    "public/assets/jimsem-hero.png",
    "public/assets/jimsem-incident.png",
    "public/assets/navbar-strip-cropped.png",
    "public/assets/logo-cropped.png",
    "public/assets/jimsem-birdfeeder.png",
    "public/assets/jimsem-aquarium.png",
    "public/assets/jimsem-cat-shelter.png",
    "public/og.png",
  ];

  for (const asset of assets) {
    await access(new URL(asset, root));
    const details = await stat(new URL(asset, root));
    assert.ok(details.size > 10_000, `${asset} should be a real image asset`);
  }
});

test("includes a looping live player with a browser fallback", async () => {
  const [page, header] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/components/site-header.tsx", root), "utf8"),
  ]);
  const preferredSource = page.indexOf('src="/media/jimsem-live.webm"');
  const fallbackSource = page.indexOf('src="/media/jimsem-live.mp4"');

  assert.match(page, /className="live-section"/);
  assert.match(page, /<video[\s\S]*autoPlay[\s\S]*controls[\s\S]*loop[\s\S]*muted[\s\S]*playsInline/);
  assert.match(header, /\["LIVE", "#live"\]/);
  assert.ok(preferredSource >= 0, "the preferred live source should be configured");
  assert.ok(fallbackSource > preferredSource, "the fallback source should come second");
});

test("includes the fast JIMSEM transformation loader", async () => {
  const [loader, layout] = await Promise.all([
    readFile(new URL("app/components/intro-loader.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);

  assert.match(loader, /INTRO_FRAME_COUNT = 20/);
  assert.match(loader, /INTRO_DURATION_MS = 2_000/);
  assert.match(loader, /requestAnimationFrame/);
  assert.match(loader, /prefers-reduced-motion: reduce/);
  assert.match(loader, /role="status"/);
  assert.match(loader, /jimsem-transform-strip\.webp/);
  assert.doesNotMatch(loader, /FRAME \{|SKIP MUTATION|JIMSEM IS|QUADRUPED MODE|progressbar/);
  assert.match(layout, /<body>[\s\S]*<IntroLoader \/>[\s\S]*\{children\}[\s\S]*<\/body>/);

  const strip = new URL("public/assets/loader/jimsem-transform-strip.webp", root);
  await access(strip);
  assert.ok((await stat(strip)).size > 10_000, "the optimized animation strip should exist");

  for (let frame = 1; frame <= 20; frame += 1) {
    const filename = `public/assets/loader/jimsem-transform-${String(frame).padStart(2, "0")}.webp`;
    await access(new URL(filename, root));
    const details = await stat(new URL(filename, root));
    assert.ok(details.size > 10_000, `${filename} should be a real animation frame`);
  }
});
