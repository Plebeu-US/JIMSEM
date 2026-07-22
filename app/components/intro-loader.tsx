"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export const INTRO_FRAME_COUNT = 20;
export const INTRO_DURATION_MS = 2_000;
const EXIT_FADE_MS = 160;

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [closing, setClosing] = useState(false);

  const finish = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const site = document.querySelector<HTMLElement>(".site-shell");
    document.body.classList.add("intro-active");
    site?.setAttribute("inert", "");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("intro-active");
      site?.removeAttribute("inert");
    };
  }, [finish, visible]);

  useEffect(() => {
    if (!visible || !ready) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const reducedTimer = window.setTimeout(finish, 400);
      return () => window.clearTimeout(reducedTimer);
    }

    const startedAt = performance.now();
    let animationFrame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - startedAt, INTRO_DURATION_MS);

      if (elapsed >= INTRO_DURATION_MS - EXIT_FADE_MS) setClosing(true);

      if (elapsed >= INTRO_DURATION_MS) {
        finish();
        return;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [finish, ready, visible]);

  if (!visible) return null;

  return (
    <div
      className="intro-loader"
      data-closing={closing ? "true" : "false"}
      data-ready={ready ? "true" : "false"}
      role="status"
      aria-live="polite"
      aria-label="JIMSEM transformation loading"
    >
      <div className="intro-loader__shell">
        <div className="intro-loader__visual">
          <div className="intro-loader__sequence" aria-hidden="true">
            <Image
              className="intro-loader__strip"
              src="/assets/loader/jimsem-transform-strip.webp"
              alt=""
              width={15360}
              height={768}
              sizes="(max-width: 440px) 88vw, 760px"
              unoptimized
              priority
              draggable={false}
              onLoad={() => setReady(true)}
              onError={finish}
            />
          </div>
          <span className="intro-loader__camera" aria-hidden="true">
            CAM 01 // BIOHAZARD FEED
          </span>
          <span className="intro-loader__rec" aria-hidden="true">
            ● REC
          </span>
        </div>
      </div>
    </div>
  );
}
