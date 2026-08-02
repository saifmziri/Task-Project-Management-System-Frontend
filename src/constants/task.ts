import { TaskPriority } from "@/types/enum/TaskPriority";
import { TaskStatus } from "@/types/enum/TaskStatus";

export const TASK_STATUS = {
  [TaskStatus.in_progress]: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700",
  },

  [TaskStatus.completed]: {
    label: "Completed",
    className: "bg-green-100 text-green-700",
  },

  [TaskStatus.canceled]: {
    label: "Canceled",
    className: "bg-red-100 text-red-700",
  },
};

export const TASK_PRIORITY = {
  [TaskPriority.low]: {
    label: "Low",
    className: "bg-slate-100 text-slate-700",
  },

  [TaskPriority.medium]: {
    label: "Medium",
    className: "bg-orange-100 text-orange-700",
  },

  [TaskPriority.high]: {
    label: "High",
    className: "bg-red-100 text-red-700",
  },
};
