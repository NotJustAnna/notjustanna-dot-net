import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { decoratorProps } from "@/components/about-page/lib/decorator";
import { Mail } from "lucide-react";

type Link = {
  label: string;
  href: string;
  icon: ReactNode;
  /** Static class names so Tailwind picks them up. */
  colour: string;
  extra?: Record<string, unknown>;
};

/** Each network gets its own autumn colour instead of its brand blue. */
const links: Link[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/notjustanna/", icon: <FontAwesomeIcon icon={faLinkedinIn} />, colour: "bg-leaf-amber text-leaf-ink" },
  { label: "GitHub", href: "https://github.com/notjustanna", icon: <FontAwesomeIcon icon={faGithub} />, colour: "bg-leaf-orange text-leaf-ink" },
  { label: "E-mail", href: "mailto:no@thankyou.net", icon: <Mail />, colour: "bg-leaf-vermilion text-band-ink", extra: decoratorProps },
  { label: "Bluesky", href: "https://bsky.app/profile/notjustanna.net", icon: <FontAwesomeIcon icon={faBluesky} />, colour: "bg-leaf-crimson text-band-ink" },
];

/**
 * `chip`: compact coloured buttons, for inline use.
 * `tile`: Metro start-screen tiles, icon on top and label bottom-left.
 */
export function SocialLinks({ variant = "chip" }: { variant?: "chip" | "tile" }) {
  return <>
    {links.map(({ label, href, icon, colour, extra }) => variant === "tile" ? (
      <a
        key={label}
        {...extra}
        aria-label={label}
        href={href}
        className={`press flex flex-col justify-between aspect-square p-3 no-underline hover:brightness-110 transition-[filter] [&_svg]:size-6 sm:[&_svg]:size-7 ${colour}`}
      >
        {icon}
        <span className="text-xs sm:text-sm font-semibold">{label}</span>
      </a>
    ) : (
      <a
        key={label}
        {...extra}
        aria-label={label}
        href={href}
        className={`press inline-flex items-center gap-2 h-10 px-4 text-sm font-semibold no-underline hover:brightness-110 transition-[filter] [&_svg]:size-4 ${colour}`}
      >
        {icon}<span className="max-sm:hidden">{label}</span>
      </a>
    ))}
  </>;
}
