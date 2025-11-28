import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function PetrixLoading() {
  return (
    <div className="container mx-auto p-4 h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading Petrix...</p>
      </div>
    </div>
  )
}
