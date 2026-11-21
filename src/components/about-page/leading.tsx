import {SocialLinks} from "@/components/social-links";

const identity = [
  { label: "she / her", className: "bg-leaf-crimson text-band-ink" },
  { label: "transgender", className: "bg-leaf-orange text-leaf-ink" },
  { label: "autistic", className: "bg-leaf-amber text-leaf-ink" },
];

export function Leading() {
  return <section className="flex flex-col gap-6 bg-card p-6 sm:p-10 max-[57.75rem]:-mx-4">
    <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
      {identity.map(({ label, className }) => (
        <li key={label} className={`px-2.5 py-1 text-sm font-semibold ${className}`}>{label}</li>
      ))}
    </ul>
    <h1 className="font-extrabold tracking-[-0.035em] leading-[1.05] text-4xl sm:text-5xl md:text-6xl text-balance m-0">
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
