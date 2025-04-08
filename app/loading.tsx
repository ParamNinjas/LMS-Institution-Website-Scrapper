import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="w-[350px] h-[350px] flex flex-column animate-pulse skeleton-loader">
      <Skeleton className="h-[250px] w-[348px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  )
}
