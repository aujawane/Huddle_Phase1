"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";
  const isFinder = pathname === "/find-clubs";

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link className="logo" href="/">huddle<span>.</span></Link>
      <div className="nav-links">
        <Link href="/about" aria-current={isAbout ? "page" : undefined}>About</Link>
        <Link href="/#how">How it works</Link>
        <Link href="/#explore">Explore</Link>
        <Link className="nav-button" href="/find-clubs" aria-current={isFinder ? "page" : undefined}>Find your club →</Link>
      </div>
      <div className="mobile-nav-actions">
        <Link href="/about" aria-current={isAbout ? "page" : undefined}>About</Link>
        <Link className="mobile-menu" aria-label="Find your club" href="/find-clubs" aria-current={isFinder ? "page" : undefined}>⌕</Link>
      </div>
    </nav>
  );
}
