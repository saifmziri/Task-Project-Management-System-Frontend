import { CalendarDays, Pencil } from "lucide-react";

import { Button } from "@/components/ui";

import type { Project } from "@/types";

interface ProjectHeaderProps {
  project: Project;
  isAdmin: boolean;
}

const ProjectHeader = ({ project, isAdmin }: ProjectHeaderProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>

          <p className="mt-2 text-slate-500">{project.description}</p>
        </div>

        {isAdmin && (
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            <Pencil size={18} />
            Edit
          </Button>
        )}
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
