export const UserRole = {
  Admin: 1,
  Employee: 2,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
