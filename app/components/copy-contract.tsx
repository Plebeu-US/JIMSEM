"use client";

import { useState } from "react";

export function CopyContract({
  address,
  isLive,
}: {
  address: string;
  isLive: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = address;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (!copied) throw new Error("Copy command failed");
    }

    setStatus("copied");
    window.setTimeout(() => setStatus("idle"), 1800);
  }

  async function handleCopy() {
    try {
      await copyAddress();
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2200);
    }
  }

  return (
    <div className="contract-ribbon">
      <span className="contract-ribbon__label">
        {isLive ? "OFFICIAL CREATURE ID" : "CREATURE ID STATUS"}
      </span>
      <code>{address}</code>
      <button type="button" onClick={handleCopy} disabled={!isLive}>
        {!isLive
          ? "NOT LIVE YET"
          : status === "copied"
            ? "TACTICAL DIGITS ACQUIRED"
            : status === "error"
              ? "COPY FAILED — TRY AGAIN"
              : "COPY THE DIGITS"}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied"
          ? "Contract address copied"
          : status === "error"
            ? "The contract address could not be copied"
            : ""}
      </span>
    </div>
  );
}
