import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      <div aria-hidden className="glow-lantern absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[520px] pointer-events-none opacity-60" />
      <div aria-hidden className="pattern-zellige absolute inset-0 opacity-50 pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div aria-hidden className="relative mx-auto mb-10 w-56">
          <svg viewBox="0 0 120 140" className="w-full h-auto text-navy dark:text-cream">
            <path
              d="M20 138 V68 C20 38 45 10 60 10 C75 10 100 38 100 68 V138"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M28 138 V68 C28 42 48 18 60 18 C72 18 92 42 92 68 V138"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <path
              d="M60 10 C57 26 34 58 28 76"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <path
              d="M60 10 C63 26 86 58 92 76"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <circle
              cx="60"
              cy="10"
              r="3"
              fill="#FFB909"
              stroke="none"
            />
            <path
              d="M60 4 V-2 M60 22 V28"
              stroke="#FFB909"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 34 C56 40 56 46 60 52 C64 46 64 40 60 34 Z"
              fill="#FFB909"
              fillOpacity="0.9"
            />
            <path
              d="M60 74 C52 66 48 56 48 46 C48 38 53 33 60 33 C67 33 72 38 72 46 C72 56 68 66 60 74 Z"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </svg>
          <span aria-hidden className="absolute -left-8 top-8 zellige-star text-xl text-golden animate-float-soft" />
          <span aria-hidden className="absolute -right-6 bottom-10 zellige-star text-sm text-golden animate-float-soft" style={{ animationDelay: '1.2s' }} />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange mb-4">404 — Lost in the medina</p>
        <h1 className="text-5xl md:text-6xl font-bold text-navy dark:text-cream mb-6 leading-tight">
          Looks like this place<br />doesn&apos;t exist.
        </h1>
        <p className="text-lg text-navy/60 dark:text-cream/60 font-light max-w-md mx-auto mb-10">
          The door you&apos;re looking for may have been hidden behind a new alley.
          Let&apos;s get you back to the stay you&apos;ll remember.
        </p>

        <div className="ornament-divider mx-auto justify-center mb-10">
          <span aria-hidden className="zellige-star text-lg text-golden" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/explore"
            className="button-press inline-flex items-center gap-2 bg-golden hover:bg-orange text-navy font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg"
          >
            Explore stays
          </Link>
          <Link
            href="/"
            className="button-press inline-flex items-center gap-2 bg-white text-navy font-bold px-8 py-4 rounded-2xl transition-colors shadow-sm hover:bg-cream/70"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}