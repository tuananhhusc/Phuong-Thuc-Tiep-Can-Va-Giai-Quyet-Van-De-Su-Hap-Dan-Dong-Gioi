"use client";

export default function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center my-12 opacity-80">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent w-1/4" />
      <div className="mx-4 flex items-center justify-center gap-1.5 text-gold-400">
        {/* Vatican style or ornate cross representation using simple SVG */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transform rotate-45"
        >
          <rect x="9" y="9" width="6" height="6" />
          <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
        </svg>
        <span className="text-xs font-serif font-semibold tracking-wider text-gold-500">✦</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transform rotate-45"
        >
          <rect x="9" y="9" width="6" height="6" />
          <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
        </svg>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent w-1/4" />
    </div>
  );
}
