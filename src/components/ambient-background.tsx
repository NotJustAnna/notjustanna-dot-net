export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background transition-colors duration-300">
      <div className="absolute top-0 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.18),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:160px_160px] dark:hidden" />
    </div>
  );
}
