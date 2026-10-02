"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

function preferredTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage indisponible */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
}

export function ThemeToggle() {
  const pathname = usePathname();

  useEffect(() => {
    applyTheme(preferredTheme());
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystem = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        return;
      }
      applyTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", applySystem);
    return () => media.removeEventListener("change", applySystem);
  }, []);

  function toggle() {
    const isDark =
      document.documentElement.dataset.theme === "dark" ||
      document.documentElement.classList.contains("dark");
    const theme = isDark ? "light" : "dark";
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* le thème change quand même pour cette visite */
    }
    applyTheme(theme);
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
