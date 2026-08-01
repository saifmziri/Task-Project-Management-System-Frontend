import { TaskPriority } from "@/types/enum/TaskPriority";
import { TaskStatus } from "@/types/enum/TaskStatus";

export const TASK_STATUS = {
  [TaskStatus.pending]: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
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
