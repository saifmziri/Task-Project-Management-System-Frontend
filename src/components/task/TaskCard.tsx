import { CalendarDays, User, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui";

import { TASK_PRIORITY, TASK_STATUS } from "@/constants/task";

import { formatDate } from "@/utils/date";

import type { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  isAdmin: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

const TaskCard = ({ task, isAdmin, onEdit, onDelete }: TaskCardProps) => {
  const status = TASK_STATUS[task.status];
  const priority = TASK_PRIORITY[task.priority];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-navy-900/5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-navy-900 text-[15.5px] font-semibold tracking-tight">
            {task.task_name}
          </h3>

          <p className="mt-1 text-[13.5px] text-slate-500">
            Assigned to {task.user_name}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11.5px] font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-[13.5px] text-slate-600">
          <CalendarDays size={16} className="text-brass-500" />

          <span>{formatDate(task.due_date)}</span>
        </div>

        <div className="flex items-center gap-2 text-[13.5px] text-slate-600">
          <User size={16} className="text-brass-500" />

          <span>Priority:</span>

          <span
            className={`rounded-full px-2 py-1 text-[11.5px] font-medium ${priority.className}`}
          >
            {priority.label}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-end gap-1 border-t border-slate-100 pt-4">
        {isAdmin ? (
          <>
            <Button
              onClick={() => onEdit?.(task)}
              className="bg-transparent px-2.5 py-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900 focus-visible:ring-offset-0"
            >
              <Pencil size={16} />
              Edit
            </Button>

            <Button
              onClick={() => onDelete?.(task)}
              className="bg-transparent px-2.5 py-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 focus-visible:ring-offset-0"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </>
        ) : (
          <Button className="border border-slate-300 bg-white text-slate-700 hover:border-brass-400 hover:bg-brass-50 hover:text-brass-700 focus-visible:ring-offset-0">
            Change Status
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
