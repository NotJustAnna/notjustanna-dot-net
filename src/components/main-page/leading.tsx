import {buttonVariants} from "@/components/ui/button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {decoratorProps} from "@/lib/decorator.tsx";
import {Mail} from "lucide-react";
import {faBluesky} from "@fortawesome/free-brands-svg-icons/faBluesky";

export function Leading() {
    return <div className="bg-secondary rounded-xl space-y-5 p-5">
        <div className="space-y-1.25">
            <p className="font-semibold max-[425px]:text-xl min-[425px]:max-md:text-2xl text-3xl mb-3">
                Technical challenges are just code waiting to be developed.
            </p>
            <p>
                <i>That’s how I work.</i> Why develop the next ERP when you can <i>meaningfully</i> change the world?
            </p>
            <p className="text-blue-400 italic min-sm:ms-3 text-sm">
                If the above sounds like someone you’d want in your team, what are you waiting for?
            </p>
        </div>
        <h3 className="font-semibold min-[400px]:hidden text-center mb-2">Get in touch:</h3>
        <div className="flex flex-wrap gap-3 items-center min-sm:ms-4 min-[400px]:max-sm:-ms-6 max-sm:justify-center">
            <h3 className="font-semibold max-[400px]:hidden">
                Get in touch:
            </h3>
            <a className={buttonVariants({variant: 'flavor_linkedin', size: "sm"})}
               href="https://linkedin.com/in/notjustanna/"><FontAwesomeIcon icon={faLinkedinIn}/><span
                className="max-sm:hidden">LinkedIn</span></a>
            <a className={buttonVariants({variant: 'flavor_github', size: 'sm'})} href="https://github.com/notjustanna"><FontAwesomeIcon
                icon={faGithub}/><span className="max-sm:hidden">GitHub</span></a>
            <a className={buttonVariants({size: "sm"})} {...decoratorProps} href="mailto:no@thankyou.net"><Mail/><span
                className="max-sm:hidden">E-mail</span></a>
            <a className={buttonVariants({variant: 'flavor_bluesky', size: "sm"})}
               href="https://bsky.app/profile/notjustanna.net"><FontAwesomeIcon icon={faBluesky}/><span
                className="max-sm:hidden">Bluesky</span></a>
        </div>
    </div>;
}