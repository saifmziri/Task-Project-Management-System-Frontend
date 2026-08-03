import { Calendar, FolderKanban, User, ClipboardList } from "lucide-react";

import { TASK_PRIORITY, TASK_STATUS } from "@/constants/task";

import type { DashboardRecentTask } from "@/types";

interface RecentTasksProps {
  tasks: DashboardRecentTask[];
}

const RecentTasks = ({ tasks }: RecentTasksProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-navy-900 text-[17px] font-semibold tracking-tight">
          Recent Tasks
        </h2>

        <p className="mt-1 text-[13.5px] text-slate-500">
          Latest created tasks.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50/60"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClipboardList size={16} className="text-brass-500" />

                <span className="text-navy-900 font-medium">
                  {task.task_name}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FolderKanban size={14} />
                  {task.project_name}
                </span>

                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {task.user_name}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {task.due_date}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[11.5px] font-medium ${
                  TASK_PRIORITY[task.priority].className
                }`}
              >
                {TASK_PRIORITY[task.priority].label}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-[11.5px] font-medium ${
                  TASK_STATUS[task.status].className
                }`}
              >
                {TASK_STATUS[task.status].label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;
