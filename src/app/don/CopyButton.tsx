"use client";

import { useState } from "react";
import styles from "./don.module.css";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Presse-papiers indisponible : on ne fait rien, la valeur reste visible.
    }
  }

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-label={label}>
      <span aria-live="polite">{copied ? "Copié ✓" : "Copier"}</span>
    </button>
  );
}
