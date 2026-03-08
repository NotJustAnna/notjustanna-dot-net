import {Button} from "@/components/ui/button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {decoratorProps} from "@/components/main-page/lib/decorator.tsx";
import {Mail} from "lucide-react";
import {faBluesky} from "@fortawesome/free-brands-svg-icons/faBluesky";

export function Leading() {
  return <div className="relative overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl dark:shadow-2xl rounded-2xl space-y-6 p-8 transition-all duration-500 hover:shadow-blue-500/10 hover:-translate-y-1">
    <div className="space-y-4">
      <p className="font-bold tracking-tight max-[425px]:text-2xl min-[425px]:max-md:text-3xl text-4xl mb-4 text-balance">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Technical challenges are just code waiting to be developed.
        </span>
      </p>
      <p className="text-lg">
        <i>That’s how I work.</i> Why develop the next ERP when you can <span className="font-semibold bg-clip-text text-transparent bg-[length:200%_auto] animate-[text-gradient_3s_ease_infinite_alternate] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">meaningfully</span> change the world?
      </p>
      <p className="text-blue-800 dark:text-blue-400 tracking-wide font-semibold italic min-sm:ms-3 text-sm">
                If the above sounds like someone you’d want in your team, what are you waiting for?
      </p>
    </div>
    <h3 className="font-semibold min-[400px]:hidden text-center mb-2">Get in touch:</h3>
    <div className="flex flex-wrap gap-3 items-center min-sm:ms-4 min-[400px]:max-sm:-ms-6 max-sm:justify-center">
      <h3 className="font-semibold max-[400px]:hidden">
                Get in touch:
      </h3>
      <Button asChild variant="flavor_linkedin" size="sm">
        <a aria-label="LinkedIn" href="https://linkedin.com/in/notjustanna/"><FontAwesomeIcon icon={faLinkedinIn}/><span
          className="max-sm:hidden">LinkedIn</span></a>
      </Button>
      <Button asChild variant="flavor_github" size="sm">
        <a aria-label="GitHub" href="https://github.com/notjustanna"><FontAwesomeIcon icon={faGithub}/><span
          className="max-sm:hidden">GitHub</span></a>
      </Button>
      <Button asChild size="sm">
        <a {...decoratorProps} aria-label="E-mail" href="mailto:no@thankyou.net"><Mail/><span
          className="max-sm:hidden">E-mail</span></a>
      </Button>
      <Button asChild aria-label="Bluesky" variant="flavor_bluesky" size="sm">
        <a href="https://bsky.app/profile/notjustanna.net"><FontAwesomeIcon icon={faBluesky}/><span
          className="max-sm:hidden">Bluesky</span></a>
      </Button>
    </div>
  </div>;
}