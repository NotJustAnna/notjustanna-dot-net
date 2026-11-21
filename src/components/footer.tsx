import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="mt-16 md:mt-24 bg-card">
      <div className="max-[57.75rem]:mx-4 max-w-4xl min-[57.75rem]:mx-auto py-10 md:py-14 space-y-6">
        <div className="flex flex-col gap-1">
          <p className="text-4xl md:text-5xl font-bold tracking-[-0.03em] m-0">Anna Silva</p>
          <p className="text-muted-foreground text-lg m-0">
            Usually <span className="text-foreground font-semibold">@notjustanna</span> on the internet.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
