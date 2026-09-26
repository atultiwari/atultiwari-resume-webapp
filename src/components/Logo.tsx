/** A glass slide with its frosted label and a stained section — the site's mark. */
export function Logo({ size = 30 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo">
      <rect x="2.5" y="9" width="27" height="14" rx="2" className="logo__glass" />
      <rect x="4.5" y="11" width="7" height="10" rx="1" className="logo__label" />
      <circle cx="20.5" cy="16" r="4.2" className="logo__tissue" />
      <circle cx="19.4" cy="15" r="1.3" className="logo__nucleus" />
      <circle cx="22" cy="17.4" r="0.9" className="logo__nucleus" />
    </svg>
  );
}
