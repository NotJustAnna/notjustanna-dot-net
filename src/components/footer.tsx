import { SocialLinks } from "@/components/social-links";

export function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? "mt-0 md:mt-6" : "mt-6"} py-6 md:py-12 relative overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-xl border-t border-white/20 dark:border-white/10 shadow-xl dark:shadow-2xl`}>
      <div className="max-[57.75rem]:mx-3 max-w-4xl min-[57.75rem]:mx-auto space-y-4 px-2">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 w-fit">
            Anna Silva
          </h1>
          <p className="text-muted-foreground text-lg">
            Usually, <span className="font-mono text-foreground font-semibold">@notjustanna</span> on the internet.
          </p>
        </div>
        <div className="flex justify-center md:justify-start flex-wrap gap-3">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
