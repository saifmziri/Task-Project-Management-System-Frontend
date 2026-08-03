import { Mail, Phone, Pencil, Power } from "lucide-react";

import { Button } from "@/components/ui";

import { USER_ROLE, USER_STATUS } from "@/constants/user";

import type { User } from "@/types";

interface UserCardProps {
  user: User;
  isAdmin: boolean;
  onEdit: (user: User) => void;
  onChangeStatus: (user: User) => void;
}

const UserCard = ({ user, isAdmin, onEdit, onChangeStatus }: UserCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-navy-900/5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-navy-900 text-[15.5px] font-semibold tracking-tight">
            {user.full_name}
          </h2>

          <p className="mt-1 text-[13.5px] text-slate-500">
            {USER_ROLE[user.role_ID].label}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11.5px] font-medium ${
            USER_STATUS[user.status].className
          }`}
        >
          {USER_STATUS[user.status].label}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-[13.5px] text-slate-600">
          <Mail size={16} className="text-brass-500" />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center gap-2 text-[13.5px] text-slate-600">
          <Phone size={16} className="text-brass-500" />
          <span>{user.phone_number}</span>
        </div>
      </div>

      {/* Actions */}
      {isAdmin && (
        <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <Button
            onClick={() => onEdit(user)}
            className="bg-transparent px-2.5 py-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900 focus-visible:ring-offset-0"
          >
            <Pencil size={16} />
            Edit
          </Button>

          <Button
            onClick={() => onChangeStatus(user)}
            className={
              user.status === "active"
                ? "bg-rose-50 text-rose-600 hover:bg-rose-100 focus-visible:ring-rose-400"
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 focus-visible:ring-emerald-400"
            }
          >
            <Power size={16} />
            {user.status === "active" ? "Deactivate" : "Activate"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
