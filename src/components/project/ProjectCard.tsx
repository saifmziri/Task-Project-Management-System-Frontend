import { CalendarDays, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui";

import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  isAdmin: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectCard = ({
  project,
  isAdmin,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4">
        <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
          {project.name}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {project.description}
        </p>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />

          <span>
            {project.start_date} - {project.due_date}
          </span>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 font-medium text-slate-900 transition-colors hover:text-slate-700"
        >
          View Project
          <ArrowRight size={18} />
        </Link>

        {isAdmin && (
          <div className="flex gap-2">
            <Button
              onClick={() => onEdit(project)}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Pencil size={16} />
            </Button>

            <Button
              onClick={() => onDelete(project)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
