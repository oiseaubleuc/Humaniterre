import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "forest";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  external?: boolean;
};

const variants = {
  primary:
    "bg-[#15261e] text-[#e7eedd] hover:bg-[#0c1914] dark:bg-[#8b9a56] dark:text-[#0c1914] dark:hover:bg-[#a3b56a]",
  secondary:
    "bg-transparent text-[#f3f5e8] ring-1 ring-inset ring-[#8b9a56]/50 hover:bg-[#15261e] dark:text-[#e7eedd] dark:ring-[#8b9a56]/40 dark:hover:bg-[#15261e]",
  light:
    "bg-[#e7eedd] text-[#15261e] hover:bg-[#f3f5e8] dark:bg-[#1c3328] dark:text-[#e7eedd] dark:hover:bg-[#243f32]",
  forest:
    "bg-[#8b9a56] text-[#0c1914] hover:bg-[#a3b56a] dark:bg-[#6d7a42] dark:text-[#f3f5e8] dark:hover:bg-[#8b9a56]",
};

export function Button({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className = "",
  onClick,
  external = false,
}: ButtonProps) {
  const classes = `group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b9a56] ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
