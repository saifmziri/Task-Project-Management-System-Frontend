import { Skeleton } from "@/components/ui";

const ProjectDetailsSkeleton = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Project Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />

        <div className="mt-6 flex gap-3">
          <Skeleton className="h-9 w-32 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </div>

      {/* Tasks Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>

        <Skeleton className="h-11 w-32 rounded-lg" />
      </div>

      {/* Search */}
      <Skeleton className="h-11 w-full rounded-lg" />

      {/* Tasks */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3.5 w-24" />
              </div>

              <Skeleton className="h-6 w-16 shrink-0 rounded-full" />
            </div>

            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3.5 w-24" />
            </div>

            <div className="mt-5 flex justify-end gap-1 border-t border-slate-100 pt-4">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailsSkeleton;