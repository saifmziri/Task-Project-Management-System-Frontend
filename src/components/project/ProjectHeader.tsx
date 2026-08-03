import { CalendarDays } from "lucide-react";

import type { Project } from "@/types";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy-900 text-[26px] font-semibold tracking-tight">
            {project.name}
          </h1>

          <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[13.5px] text-slate-600">
          <CalendarDays size={16} className="text-brass-500" />

          <span>
            <span className="font-medium text-slate-700">Start:</span>{" "}
            {project.start_date}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[13.5px] text-slate-600">
          <CalendarDays size={16} className="text-brass-500" />

          <span>
            <span className="font-medium text-slate-700">Due:</span>{" "}
            {project.due_date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;