"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { donateHref, navLinks } from "@/config/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
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
    <header className="sticky top-0 z-50 bg-[var(--green-900)] text-[var(--on-dark)]">
      <a
        href="#contenu"
        className="absolute left-4 top-3 z-10 -translate-y-20 rounded-full bg-[var(--lime)] px-4 py-2 text-sm font-semibold text-[var(--green-900)] transition focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 rounded-full"
          aria-label="Collectif Humaniterre, retour à l'accueil"
        >
          <img
            src="/images/logo-dark.png"
            alt=""
            className="size-11 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <form action="/projecten" method="get" className="hidden items-center lg:flex" role="search">
            {searchOpen ? (
              <input
                name="q"
                type="search"
                placeholder="Rechercher"
                aria-label="Rechercher"
                autoFocus
                className="h-11 w-40 rounded-full border border-white/20 bg-white/10 px-3 text-sm text-[var(--on-dark)] outline-none placeholder:text-[var(--on-dark-muted)]"
              />
            ) : null}
            <button
              type={searchOpen ? "submit" : "button"}
              aria-label="Rechercher"
              aria-expanded={searchOpen}
              onClick={() => {
                if (!searchOpen) setSearchOpen(true);
              }}
              className="inline-flex size-11 items-center justify-center rounded-full text-[var(--on-dark)] hover:bg-white/10"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>
          </form>
          <Link
            href={donateHref}
            className="hidden min-h-11 items-center rounded-full bg-[var(--lime)] px-5 text-sm font-semibold text-[var(--green-900)] transition hover:brightness-95 sm:inline-flex"
          >
            Faire un don
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-[var(--on-dark)] hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((current) => !current)}
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          className="border-t border-white/10 bg-[var(--green-900)] px-4 py-4 md:hidden"
          aria-label="Menu mobile"
        >
          <form action="/projecten" method="get" className="mb-3" role="search">
            <label htmlFor="recherche-mobile" className="sr-only">
              Rechercher
            </label>
            <input
              id="recherche-mobile"
              name="q"
              type="search"
              placeholder="Rechercher"
              className="h-11 w-full rounded-full border border-white/20 bg-white/10 px-4 text-sm text-[var(--on-dark)] outline-none placeholder:text-[var(--on-dark-muted)]"
            />
          </form>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block min-h-11 rounded-xl px-3 py-3 text-base ${
                      active
                        ? "font-semibold text-[var(--lime)] underline decoration-[var(--lime)] underline-offset-4"
                        : "text-[var(--on-dark)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={donateHref}
                className="mt-2 inline-flex min-h-11 items-center rounded-full bg-[var(--lime)] px-5 text-sm font-semibold text-[var(--green-900)]"
              >
                Faire un don
              </Link>
            </li>
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
      className={`inline-flex min-h-11 items-center text-sm ${
        active
          ? "font-semibold text-[var(--lime)] underline decoration-[var(--lime)] underline-offset-8"
          : "text-[var(--on-dark)] hover:text-[var(--lime)]"
      }`}
    >
      {children}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
