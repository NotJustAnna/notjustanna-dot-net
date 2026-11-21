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
    <header className="bg-band text-band-ink [&_:focus-visible]:outline-leaf-amber">
      {/* One row when it fits (lg+): name, pivot, toggle. Below that the pivot wraps to its own scrolling row. */}
      <div className="max-[57.75rem]:px-4 max-w-4xl min-[57.75rem]:mx-auto py-4 md:py-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a href="/" className="flex items-center gap-3 no-underline text-band-ink shrink-0">
          <img src={personalAvatar} alt="" className="size-9 object-cover" />
          <span className="text-lg font-semibold">Anna Silva</span>
        </a>
        <nav
          ref={navRef}
          aria-label="Sections"
          className="relative order-last w-[calc(100%+2rem)] -mx-4 px-4 overflow-x-auto scrollbar-none lg:order-none lg:w-auto lg:mx-0 lg:px-0 lg:ms-auto lg:overflow-visible"
        >
          <ul className="flex gap-x-4 lg:gap-x-5 list-none m-0 p-0 whitespace-nowrap">
            {pivots.map(({ href, label }) => {
              const active = isActive(href, current);
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block font-mono text-lg font-bold leading-tight no-underline transition-colors ${
                      active ? "text-leaf-amber" : "text-band-ink/60 hover:text-band-ink"
                    }`}
                  >
                    /{label}/
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="ms-auto lg:ms-0 -me-2 size-9 inline-flex items-center justify-center text-band-ink/75 hover:text-band-ink hover:bg-band-ink/10 transition-colors [&_svg]:size-5"
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}
