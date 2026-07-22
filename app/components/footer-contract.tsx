"use client";

import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "error";

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Copy command failed");
  }
}

export function FooterContract({
  address,
  isLive,
}: {
  address: string;
  isLive: boolean;
}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  function resetStatusAfter(delay: number) {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setStatus("idle"), delay);
  }

  async function handleCopy() {
    if (!isLive) return;

    try {
      await copyText(address);
      setStatus("copied");
      resetStatusAfter(1800);
    } catch {
      setStatus("error");
      resetStatusAfter(2200);
    }
  }

  return (
    <div className="footer-contract" aria-label="Official contract address">
      {isLive ? (
        <button
          className="footer-contract__control"
          type="button"
          onClick={handleCopy}
          aria-label={`Copy contract address ${address}`}
        >
          <code>{address}</code>
          {status !== "idle" ? (
            <span className="footer-contract__notice" aria-hidden="true">
              {status === "copied" ? "COPIED ✓" : "COPY FAILED"}
            </span>
          ) : null}
        </button>
      ) : (
        <div
          className="footer-contract__control footer-contract__control--pending"
          aria-label="Contract address not available yet"
        />
      )}

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
