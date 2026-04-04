import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { decoratorProps } from "@/components/about-page/lib/decorator";
import { Mail } from "lucide-react";

export function SocialLinks({ size }: { size?: "default" | "sm" | "lg" | "icon" }) {
  return <>
    <Button asChild variant="flavor_linkedin" size={size}>
      <a aria-label="LinkedIn" href="https://linkedin.com/in/notjustanna/">
        <FontAwesomeIcon icon={faLinkedinIn} /><span className="max-sm:hidden">LinkedIn</span>
      </a>
    </Button>
    <Button asChild variant="flavor_github" size={size}>
      <a aria-label="GitHub" href="https://github.com/notjustanna">
        <FontAwesomeIcon icon={faGithub} /><span className="max-sm:hidden">GitHub</span>
      </a>
    </Button>
    <Button asChild size={size}>
      <a {...decoratorProps} aria-label="E-mail" href="mailto:no@thankyou.net">
        <Mail /><span className="max-sm:hidden">E-mail</span>
      </a>
    </Button>
    <Button asChild aria-label="Bluesky" variant="flavor_bluesky" size={size}>
      <a href="https://bsky.app/profile/notjustanna.net">
        <FontAwesomeIcon icon={faBluesky} /><span className="max-sm:hidden">Bluesky</span>
      </a>
    </Button>
  </>;
}
