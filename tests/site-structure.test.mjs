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
  assert.match(page, /aria-labelledby="hero-title"/);
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
    "public/og.png",
  ];

  for (const asset of assets) {
    await access(new URL(asset, root));
    const details = await stat(new URL(asset, root));
    assert.ok(details.size > 10_000, `${asset} should be a real image asset`);
  }
});
