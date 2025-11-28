export function PetrixIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="5" cy="5" r="1" fill="currentColor" />
      <circle cx="19" cy="5" r="1" fill="currentColor" />
      <circle cx="5" cy="19" r="1" fill="currentColor" />
      <circle cx="19" cy="19" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="0.5" fill="currentColor" />
      <circle cx="9" cy="15" r="0.5" fill="currentColor" />
      <circle cx="15" cy="15" r="0.5" fill="currentColor" />
      <circle cx="9" cy="9" r="0.5" fill="currentColor" />
      <line x1="12" y1="12" x2="5" y2="5" />
      <line x1="12" y1="12" x2="19" y2="5" />
      <line x1="12" y1="12" x2="5" y2="19" />
      <line x1="12" y1="12" x2="19" y2="19" />
      <line x1="12" y1="12" x2="15" y2="9" />
      <line x1="12" y1="12" x2="9" y2="15" />
      <line x1="12" y1="12" x2="15" y2="15" />
      <line x1="12" y1="12" x2="9" y2="9" />
    </svg>
  )
}
