export const TaskStatus = {
  pending: "pending",
  completed: "completed",
  canceled: "canceled",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
