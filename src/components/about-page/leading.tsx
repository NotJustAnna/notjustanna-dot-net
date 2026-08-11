import {SocialLinks} from "@/components/social-links";

export function Leading() {
  return <div className="relative overflow-hidden bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl dark:shadow-2xl rounded-2xl space-y-6 p-6 transition-all duration-500 hover:shadow-blue-500/10 hover:-translate-y-1">
    <div className="space-y-4">
      <p className="font-bold tracking-tight max-[425px]:text-2xl min-[425px]:max-md:text-3xl text-4xl mb-4 text-balance">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-200 dark:from-blue-400 dark:to-purple-400">
          I build the thing your developers needed yesterday.
        </span>
      </p>
      <p className="text-lg">
        Backend mostly, frontend when it needs me, and — because someone always has to — the CI/CD and
        cloud architecture underneath. Scripting layers, compilers, static-reflection libraries, GIS
        platforms: the work I get handed tends to be the work nobody has a template for.
      </p>
      <p className="text-lg">
        When something needs understanding a layer deeper than the epic asked for, I go and read it —
        the framework&apos;s source, the build pipeline, a JVM bug report. That habit has fixed more
        production issues than any amount of guessing.
      </p>
      <p className="text-lg">
        Five years of it, across consulting, product teams, and my own freelance clients.
      </p>
      <p className="text-blue-100 dark:text-blue-400 tracking-wide font-semibold italic min-sm:ms-3 text-sm">
                If that sounds like someone you&apos;d want on your team — good. That was the idea.
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
