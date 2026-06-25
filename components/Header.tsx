"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Artigos" },
  { href: "/about", label: "Sobre mim" },
  { href: "/contact", label: "Contato" },
];

const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return (
        pathname === "/" ||
        (pathname !== "/about" && pathname !== "/contact")
      );
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-sans text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative text-sm transition-colors ${
                isActive(href)
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
              {isActive(href) && (
                <span className="absolute -bottom-[17px] left-0 h-0.5 w-full rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
