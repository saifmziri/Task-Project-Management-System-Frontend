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
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-navy-900/5">
      <div className="mb-4">
        <h2 className="text-navy-900 line-clamp-1 text-lg font-semibold tracking-tight">
          {project.name}
        </h2>

        <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-slate-500">
          {project.description}
        </p>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-[13.5px] text-slate-500">
          <CalendarDays size={16} className="text-brass-500" />

          <span>
            {project.start_date} - {project.due_date}
          </span>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Link
          to={`/projects/${project.id}`}
          className="text-navy-900 inline-flex items-center gap-1.5 text-[14.5px] font-medium transition-colors hover:text-brass-600"
        >
          View Project
          <ArrowRight
            size={17}
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </Link>

        {isAdmin && (
          <div className="flex gap-1">
            <Button
              onClick={() => onEdit(project)}
              className="bg-transparent px-2.5 py-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900 focus-visible:ring-offset-0"
            >
              <Pencil size={16} />
            </Button>

            <Button
              onClick={() => onDelete(project)}
              className="bg-transparent px-2.5 py-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 focus-visible:ring-offset-0"
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