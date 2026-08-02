import { CalendarDays } from "lucide-react";

import type { Project } from "@/types";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>

          <p className="mt-2 text-slate-500">{project.description}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-8">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={18} />

          <span>
            <strong>Start:</strong> {project.start_date}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={18} />

          <span>
            <strong>Due:</strong> {project.due_date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
