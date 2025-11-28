export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  let spinnerSize = "w-6 h-6"
  if (size === "sm") {
    spinnerSize = "w-4 h-4"
  } else if (size === "lg") {
    spinnerSize = "w-8 h-8"
  }
  return (
    <svg className={`animate-spin ${spinnerSize} text-sky-500`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  )
}
