import { SocialLinks } from "@/components/social-links";
import { IdentityBadges } from "@/components/identity-badges";

export function Footer({ flush = false }: { flush?: boolean }) {
  return (
    <footer className={`mt-16 md:mt-24 ${flush ? "max-[57.75rem]:mt-0" : ""} bg-band text-band-ink [&_:focus-visible]:outline-leaf-amber`}>
      <div className="max-[57.75rem]:px-4 max-w-4xl min-[57.75rem]:mx-auto py-10 md:py-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="flex flex-col gap-1">
          <p className="text-4xl md:text-5xl font-bold tracking-[-0.03em] m-0">Anna Silva</p>
          <p className="text-band-ink/75 text-lg m-0">
            Usually <span className="text-leaf-amber font-semibold">@notjustanna</span> on the internet.
          </p>
          <IdentityBadges className="mt-3" />
        </div>
        <div className="grid grid-cols-4 gap-1.5 md:w-[26rem]">
          <SocialLinks variant="tile" />
        </div>
      </div>
    </footer>
  );
}
