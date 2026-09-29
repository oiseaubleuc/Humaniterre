"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { donateHref, navLinks } from "@/config/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#8b9a56]/30 bg-[#2f3a22]/95 backdrop-blur-md dark:border-[#8b9a56]/20 dark:bg-[#0c1914]/95">
      <a
        href="#contenu"
        className="absolute left-4 top-3 z-10 -translate-y-20 rounded-full bg-[#8b9a56] px-4 py-2 text-sm text-[#0c1914] transition focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b9a56]"
          aria-label="HUMANITERRE, retour à l'accueil"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={donateHref}>Nous soutenir</Button>
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[#f3f5e8] transition hover:bg-[#15261e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b9a56] md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((current) => !current)}
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          className="border-t border-[#8b9a56]/30 bg-[#2f3a22] px-5 py-4 dark:border-[#8b9a56]/20 dark:bg-[#0c1914] md:hidden"
          aria-label="Menu mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-3 py-3 text-base transition ${
                      active
                        ? "bg-[#15261e] font-semibold text-[#d5e09a]"
                        : "text-[#f3f5e8] hover:bg-[#15261e]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[#d5e09a] after:transition-all after:duration-300 ${
        active
          ? "font-semibold text-[#d5e09a] after:w-full"
          : "text-[#f3f5e8]/75 after:w-0 hover:text-[#d5e09a] hover:after:w-full"
      }`}
    >
      {children}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
