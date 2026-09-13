"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TelegramIcon, XIcon } from "./platform-icons";

const navLinks = [
  ["THE INCIDENT", "#incident"],
  ["LIVE", "#live"],
  ["ANATOMY", "#anatomy"],
  ["GET $JIMSEM", "#get-jimsem"],
  ["JIMSEMAP", "#roadmap"],
  ["MEMES", "#sightings"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    const desktopQuery = window.matchMedia("(min-width: 1241px)");
    const closeForDesktop = () => {
      if (desktopQuery.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", closeForDesktop);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", closeForDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="navbar-wrap">
        <nav className="navbar" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="JIMSEM home">
            <span className="brand__portrait" aria-hidden="true">
              <Image
                src="/assets/logo-cropped.png"
                alt=""
                width={852}
                height={819}
                sizes="70px"
                priority
              />
            </span>
            <span className="brand__name">JIMSEM</span>
            <small>$JIMSEM</small>
          </a>

          <div className="desktop-nav">
            {navLinks.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </div>

          <div className="navbar-actions">
            <span
              className="icon-sticker icon-sticker--x"
              aria-hidden="true"
            >
              <XIcon />
            </span>
            <span
              className="icon-sticker icon-sticker--telegram"
              aria-hidden="true"
            >
              <TelegramIcon />
            </span>
            <a className="nav-adopt" href="#get-jimsem">
              ADOPT THE CREATURE
            </a>
            <button
              ref={menuButtonRef}
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>

        <div className="navbar-fringe" aria-hidden="true" />
      </div>

      <nav
        className="mobile-nav"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {navLinks.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#get-jimsem" onClick={() => setMenuOpen(false)}>
          ADOPT THE CREATURE ↗
        </a>
        <div className="mobile-nav__socials">
          <span
            className="mobile-social-link mobile-social-link--x"
            aria-hidden="true"
          >
            <XIcon aria-hidden="true" />
          </span>
          <span
            className="mobile-social-link mobile-social-link--telegram"
            aria-hidden="true"
          >
            <TelegramIcon aria-hidden="true" />
          </span>
        </div>
      </nav>

    </header>
  );
}
