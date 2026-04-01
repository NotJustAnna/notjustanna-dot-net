import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderBase } from "@/components/header-base";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/development", label: "Development" },
  { href: "/tech", label: "Technology" },
  { href: "/ramblings", label: "Ramblings" },
];

export function BlogHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const linkClass = (href: string) =>
    `transition-colors ${isActive(href) ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`;

  const mobileLinkClass = (href: string) =>
    `flex items-center rounded-(--radius-md) px-3 py-2 text-sm transition-colors ${
      isActive(href)
        ? "bg-accent text-accent-foreground font-medium"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }`;

  return (
    <div>
      <HeaderBase
        actions={
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        }
      >
        <div className="hidden md:flex gap-4 text-sm font-normal">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={linkClass(href)}>{label}</a>
          ))}
        </div>
      </HeaderBase>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-1 p-2 mt-1 mb-4 bg-background border border-border rounded-(--radius-lg) shadow-md">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={mobileLinkClass(href)}>{label}</a>
          ))}
        </div>
      )}
    </div>
  );
}
