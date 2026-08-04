import { Skeleton } from "@/components/ui";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-52 rounded-md" />
        <Skeleton className="mt-2 h-4 w-80 rounded-md" />
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="mt-3 h-7 w-16 rounded-md" />
              </div>
              <Skeleton className="h-14 w-14 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>

        <div className="space-y-4 p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Project Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <Skeleton className="h-5 w-48 rounded-md" />
        </div>

        <div className="space-y-5 p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="mb-2 h-4 w-40 rounded-md" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Skeleton className="mb-6 h-5 w-36 rounded-md" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Skeleton className="mb-6 h-5 w-36 rounded-md" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;