const identity = [
  { label: "she / her", className: "bg-leaf-crimson text-band-ink" },
  { label: "transgender", className: "bg-leaf-orange text-leaf-ink" },
  { label: "autistic", className: "bg-leaf-amber text-leaf-ink" },
];

export function IdentityBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 list-none p-0 m-0 ${className}`}>
      {identity.map(({ label, className }) => (
        <li key={label} className={`px-2.5 py-1 text-sm font-semibold ${className}`}>{label}</li>
      ))}
    </ul>
  );
}
