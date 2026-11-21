import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { decoratorProps } from "@/components/about-page/lib/decorator";
import { Mail } from "lucide-react";

/** Flat, square, monochrome until hovered — no brand blues. */
const linkClass =
  "press inline-flex items-center gap-2 h-10 px-4 text-sm font-semibold no-underline bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors [&_svg]:size-4";

export function SocialLinks() {
  return <>
    <a className={linkClass} aria-label="LinkedIn" href="https://linkedin.com/in/notjustanna/">
      <FontAwesomeIcon icon={faLinkedinIn} /><span className="max-sm:hidden">LinkedIn</span>
    </a>
    <a className={linkClass} aria-label="GitHub" href="https://github.com/notjustanna">
      <FontAwesomeIcon icon={faGithub} /><span className="max-sm:hidden">GitHub</span>
    </a>
    <a className={linkClass} {...decoratorProps} aria-label="E-mail" href="mailto:no@thankyou.net">
      <Mail /><span className="max-sm:hidden">E-mail</span>
    </a>
    <a className={linkClass} aria-label="Bluesky" href="https://bsky.app/profile/notjustanna.net">
      <FontAwesomeIcon icon={faBluesky} /><span className="max-sm:hidden">Bluesky</span>
    </a>
  </>;
}
