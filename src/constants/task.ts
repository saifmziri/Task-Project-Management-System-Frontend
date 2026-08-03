import { TaskPriority } from "@/types/enum/TaskPriority";
import { TaskStatus } from "@/types/enum/TaskStatus";

export const TASK_STATUS = {
  [TaskStatus.in_progress]: {
    label: "In Progress",
    className: "bg-brass-100 text-brass-700",
  },

  [TaskStatus.completed]: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700",
  },

  [TaskStatus.canceled]: {
    label: "Canceled",
    className: "bg-rose-100 text-rose-700",
  },
};

export const TASK_PRIORITY = {
  [TaskPriority.low]: {
    label: "Low",
    className: "bg-slate-100 text-slate-600",
  },

  [TaskPriority.medium]: {
    label: "Medium",
    className: "bg-amber-100 text-amber-700",
  },

  [TaskPriority.high]: {
    label: "High",
    className: "bg-rose-100 text-rose-700",
  },
};
