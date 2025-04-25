import {Button} from "@/components/ui/button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {decoratorProps} from "@/lib/decorator.tsx";
import {Mail} from "lucide-react";
import {faBluesky} from "@fortawesome/free-brands-svg-icons/faBluesky";

export function Footer() {
    return <div className="bg-secondary text-secondary-foreground">
        <div className="max-[57.75rem]:mx-3 max-w-4xl min-[57.75rem]:mx-auto py-12 space-y-1">
            <h1 className="text-4xl font-semibold">
                Anna Silva
            </h1>
            <p className="text-muted-foreground">
                Usually, <span className="font-mono">@notjustanna</span> on the internet.
            </p>
            <div className="flex gap-3">
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