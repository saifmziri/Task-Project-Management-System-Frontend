import { CalendarDays, User, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui";

import { TASK_PRIORITY, TASK_STATUS } from "@/constants/task";

import { formatDate } from "@/utils/date";

import type { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  isAdmin: boolean;
}

const TaskCard = ({ task, isAdmin }: TaskCardProps) => {
  const status = TASK_STATUS[task.status];
  const priority = TASK_PRIORITY[task.priority];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {task.task_name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Assigned to {task.user_name}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />

          <span>{formatDate(task.due_date)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User size={16} />

          <span>Priority:</span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${priority.className}`}
          >
            {priority.label}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-2">
        {isAdmin ? (
          <>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Pencil size={16} />
              Edit
            </Button>

            <Button className="bg-red-600 text-white hover:bg-red-700">
              <Trash2 size={16} />
              Delete
            </Button>
          </>
        ) : (
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Change Status
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
