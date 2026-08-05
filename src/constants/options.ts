import { TaskPriority, TaskStatus } from "@/types";

export const ROLE_OPTIONS = [
  {
    value: 0,
    label: "Select Role",
  },
  {
    value: 1,
    label: "Admin",
  },
  {
    value: 2,
    label: "Employee",
  },
];

export const TASK_PRIORITY_OPTIONS = [
  {
    value: TaskPriority.low,
    label: "Low",
  },
  {
    value: TaskPriority.medium,
    label: "Medium",
  },
  {
    value: TaskPriority.high,
    label: "High",
  },
];

export const TASK_STATUS_OPTIONS = [
  {
    value: TaskStatus.in_progress,
    label: "In Progress",
  },
  {
    value: TaskStatus.completed,
    label: "Completed",
  },
  {
    value: TaskStatus.canceled,
    label: "Canceled",
  },
];
