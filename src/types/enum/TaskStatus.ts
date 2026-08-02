export const TaskStatus = {
  in_progress: "in_progress",
  completed: "completed",
  canceled: "canceled",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
