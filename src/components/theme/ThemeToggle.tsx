"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystem = () => {
      if (localStorage.getItem("theme")) return;
      document.documentElement.classList.toggle("dark", media.matches);
    };
    media.addEventListener("change", applySystem);
    return () => media.removeEventListener("change", applySystem);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Changer le thème"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--on-dark)] transition duration-200 hover:bg-white/10"
    >
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
