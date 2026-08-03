import { UserRole } from "@/types/enum/UserRole";

export const USER_ROLE = {
  [UserRole.Admin]: {
    label: "Admin",
    className: "bg-brass-100 text-brass-700",
  },

  [UserRole.Employee]: {
    label: "Employee",
    className: "bg-slate-100 text-slate-600",
  },
} as const;

export const USER_STATUS = {
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-700",
  },

  inactive: {
    label: "Inactive",
    className: "bg-slate-100 text-slate-500",
  },
} as const;
