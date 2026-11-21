import {SocialLinks} from "@/components/social-links";

export function Leading() {
  return <section className="flex flex-col gap-6 bg-card p-6 sm:p-10 max-[57.75rem]:-mx-4">
    <h1 className="font-extrabold tracking-[-0.03em] leading-[1.1] text-3xl sm:text-4xl md:text-[2.75rem] text-balance m-0">
      I build the thing your developers needed yesterday.
    </h1>
    <div className="space-y-4 text-lg leading-relaxed max-w-2xl">
      <p>
        Backend mostly, frontend when it needs me, and — because someone always has to — the CI/CD and
        cloud architecture underneath. Scripting layers, compilers, static-reflection libraries, GIS
        platforms: the work I get handed tends to be the work nobody has a template for.
      </p>
      <p>
        When something needs understanding a layer deeper than the epic asked for, I go and read it —
        the framework&apos;s source, the build pipeline, a JVM bug report. That habit has fixed more
        production issues than any amount of guessing.
      </p>
      <p>
        Five years of it, across consulting, product teams, and my own freelance clients.
      </p>
      <p className="font-semibold text-link">
        If that sounds like someone you&apos;d want on your team — good. That was the idea.
      </p>
    </div>
    <div className="flex flex-wrap gap-2 pt-2">
      <SocialLinks />
    </div>
  </section>;
}
