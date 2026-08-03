import { FolderKanban } from "lucide-react";

import type { DashboardProjectProgress } from "@/types";

interface ProjectProgressProps {
  projects: DashboardProjectProgress[];
}

const ProjectProgress = ({ projects }: ProjectProgressProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-navy-900 text-[17px] font-semibold tracking-tight">
          Project Progress
        </h2>

        <p className="mt-1 text-[13.5px] text-slate-500">
          Completion progress for your projects.
        </p>
      </div>

      <div className="space-y-6 p-6">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderKanban size={16} className="text-brass-500" />

                <span className="text-navy-900 font-medium">
                  {project.name}
                </span>
              </div>

              <span className="text-navy-900 text-[13.5px] font-semibold">
                {project.progress}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-linear-to-r from-brass-400 to-brass-600 transition-all duration-500"
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-[13px] text-slate-500">
              {project.completed_tasks} of {project.total_tasks} tasks completed
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;
