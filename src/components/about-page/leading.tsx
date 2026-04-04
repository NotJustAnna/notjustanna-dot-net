import {SocialLinks} from "@/components/social-links";

export function Leading() {
  return <div className="relative overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl dark:shadow-2xl rounded-2xl space-y-6 p-6 transition-all duration-500 hover:shadow-blue-500/10 hover:-translate-y-1">
    <div className="space-y-4">
      <p className="font-bold tracking-tight max-[425px]:text-2xl min-[425px]:max-md:text-3xl text-4xl mb-4 text-balance">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Technical challenges are just code waiting to be developed.
        </span>
      </p>
      <p className="text-lg">
        <i>That&apos;s how I work.</i> Why develop the next ERP when you can <span className="font-semibold bg-clip-text text-transparent bg-[length:200%_auto] animate-[text-gradient_3s_ease_infinite_alternate] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">meaningfully</span> change the world?
      </p>
      <p className="text-blue-800 dark:text-blue-400 tracking-wide font-semibold italic min-sm:ms-3 text-sm">
                If the above sounds like someone you&apos;d want in your team, what are you waiting for?
      </p>
    </div>
    <h3 className="font-semibold min-[400px]:hidden text-center mb-2">Get in touch:</h3>
    <div className="flex flex-wrap gap-3 items-center min-sm:ms-4 min-[400px]:max-sm:-ms-6 max-sm:justify-center">
      <h3 className="font-semibold max-[400px]:hidden">
                Get in touch:
      </h3>
      <SocialLinks size="sm" />
    </div>
  </div>;
}
