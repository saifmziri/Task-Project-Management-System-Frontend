export const TaskPriority = {
  low: "low",
  medium: "medium",
  high: "high",
} as const;

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];
