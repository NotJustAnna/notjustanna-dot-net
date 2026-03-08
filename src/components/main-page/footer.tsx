import {Button} from "@/components/ui/button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {decoratorProps} from "@/components/main-page/lib/decorator.tsx";
import {Mail} from "lucide-react";
import {faBluesky} from "@fortawesome/free-brands-svg-icons/faBluesky";

export function Footer() {
  return <div className="mt-12 py-12 relative overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-xl border-t border-white/20 dark:border-white/10 shadow-xl dark:shadow-2xl">
    <div className="max-[57.75rem]:mx-3 max-w-4xl min-[57.75rem]:mx-auto space-y-4">
      <div className="space-y-1">
        <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 w-fit">
          Anna Silva
        </h1>
        <p className="text-muted-foreground text-lg">
          Usually, <span className="font-mono text-foreground font-semibold">@notjustanna</span> on the internet.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="flavor_linkedin">
          <a aria-label="LinkedIn" href="https://linkedin.com/in/notjustanna/"><FontAwesomeIcon icon={faLinkedinIn}/><span
            className="max-sm:hidden">LinkedIn</span></a>
        </Button>
        <Button asChild variant="flavor_github">
          <a aria-label="GitHub" href="https://github.com/notjustanna"><FontAwesomeIcon icon={faGithub}/><span
            className="max-sm:hidden">GitHub</span></a>
        </Button>
        <Button asChild>
          <a {...decoratorProps} aria-label="E-mail" href="mailto:no@thankyou.net"><Mail/><span
            className="max-sm:hidden">E-mail</span></a>
        </Button>
        <Button asChild aria-label="Bluesky" variant="flavor_bluesky">
          <a href="https://bsky.app/profile/notjustanna.net"><FontAwesomeIcon icon={faBluesky}/><span
            className="max-sm:hidden">Bluesky</span></a>
        </Button>
      </div>
    </div>
  </div>;
}