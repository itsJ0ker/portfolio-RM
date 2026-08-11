export function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <path d="M12 4v16" />
      <path d="M8 20h8" />
      <path d="M5 6.5c0 .8.7 1.5 1.5 1.5l-1 1.1H3L2 8.5C2 7.7 2.7 7 3.5 7H4c0-.8.4-1.5 1-2" />
      <path d="M18.5 6.5c0 .8.7 1.5 1.5 1.5l1 1.1h-3.5L16 8.5c0-.8.7-1.5 1.5-1.5h.5c0-.8-.4-1.5-1-2" />
      <path d="M4.3 6.2 12 3l7.7 3.2" />
      <path d="M5.5 13.5a2.5 2.5 0 0 0 5 0L12 8" />
      <path d="M18.5 13.5a2.5 2.5 0 0 1-5 0L12 8" />
      <path d="M12 8v-3" />
    </svg>
  );
}

export function GavelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <path d="m14 6 4 4-7 7-4-4z" />
      <path d="m10 14 2-2" />
      <path d="m18 4 2 2" />
      <path d="m14.5 2.5 3 3" />
      <path d="m21 8.5 1.5 1.5" />
    </svg>
  );
}

export function QuillIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <path d="M20 3C12 3 6 8 6 14c0 2 1 4 3 5l1-1c-1-1-1-3-0-4 2-3 6-5 10-7-1 4-2 7-4 9-1 1-1 2 0 3l1-1c2-2 4-7 5-13-2 1-4 2-7 3" />
    </svg>
  );
}

export function PlaceOfJustice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <path d="M4 21V10" />
      <path d="M20 21V10" />
      <path d="M3 21h18" />
      <path d="M8 8h8" />
      <path d="M8 10V8c0-1.1.9-2 2-2" />
      <path d="M16 10V8c0-1.1-.9-2-2-2" />
      <path d="M13 6V4h-2v2" />
      <path d="M12 21v-8l-3-3M12 13l3-3" />
    </svg>
  );
}

export function ColumnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <path d="M3 21h18" />
      <path d="M5 21V7a7 7 0 0 1 14 0v14" />
      <path d="M9 21V9a3 3 0 0 1 6 0v12" />
      <path d="M4 10h4M16 10h4" />
    </svg>
  );
}

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M9 7h6M9 11h6" />
    </svg>
  );
}

export function SealIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

export function RibbonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className ?? "h-8 w-8"}>
      <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
      <path d="m9 14-1.5 8L12 19l4.5 3L15 14" />
    </svg>
  );
}

export const roleIcons: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  scale: ScaleIcon,
  gavel: GavelIcon,
  quill: QuillIcon,
  column: ColumnIcon,
  book: BookIcon,
  columns: PlaceOfJustice,
};