import { useState, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import personalAvatar from "@/assets/profile/personal/avatar-mini.jpg?url";

const pivots = [
  { href: "/", label: "posts" },
  { href: "/development", label: "development" },
  { href: "/tech", label: "tech" },
  { href: "/ramblings", label: "ramblings" },
  { href: "/about", label: "about" },
];

/** Which pivot a path belongs to. Paginated home (`/2`, `/3`…) still counts as "posts". */
function isActive(href: string, pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (href === "/") return path === "/" || /^\/\d+$/.test(path);
  return path === href || path.startsWith(`${href}/`);
}

export function HeaderBase({ pathname, section }: { pathname: string; section?: string }) {
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const current = section ?? pathname;

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    // Like a Metro pivot: if the active section is off-screen, bring it to the front.
    // Measure after the webfont lands, or the fallback font's widths throw it off.
    document.fonts.ready.then(() => {
      const nav = navRef.current;
      const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!nav || !active) return;
      const navBox = nav.getBoundingClientRect();
      const activeBox = active.getBoundingClientRect();
      if (activeBox.right > navBox.right) {
        nav.scrollLeft += activeBox.left - navBox.left - parseFloat(getComputedStyle(nav).paddingLeft);
      }
    });
  }, []);

  function toggleTheme() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <header className="pt-6 md:pt-10 mb-8 md:mb-12">
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-3 no-underline text-foreground">
          <img src={personalAvatar} alt="" className="size-9 object-cover" />
          <span className="text-base font-semibold">Anna Silva</span>
        </a>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="ms-auto size-9 inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors [&_svg]:size-5"
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>
      <nav
        ref={navRef}
        aria-label="Sections"
        className="relative mt-3 -mx-4 px-4 overflow-x-auto scrollbar-none"
      >
        <ul className="flex gap-x-6 list-none m-0 p-0 whitespace-nowrap">
          {pivots.map(({ href, label }) => {
            const active = isActive(href, current);
            return (
              <li key={href}>
                <a
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`block text-[2.5rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] no-underline transition-colors ${
                    active ? "text-foreground" : "text-foreground/25 hover:text-foreground/60"
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
