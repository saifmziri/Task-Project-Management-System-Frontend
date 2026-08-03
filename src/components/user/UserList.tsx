import { UserX } from "lucide-react";

import UserCard from "./UserCard";

import type { User } from "@/types";

interface UserListProps {
  users: User[];
  isAdmin: boolean;
  onEdit: (user: User) => void;
  onChangeStatus: (user: User) => void;
}

const UserList = ({
  users,
  isAdmin,
  onEdit,
  onChangeStatus,
}: UserListProps) => {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-20 text-center">
        <div className="brass-ring mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
          <UserX size={20} strokeWidth={1.75} className="text-navy-900" />
        </div>

        <h2 className="text-navy-900 text-lg font-semibold tracking-tight">
          No users found
        </h2>

        <p className="mt-1.5 text-[14.5px] text-slate-500">
          Try searching with another keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
};

export default UserList;
