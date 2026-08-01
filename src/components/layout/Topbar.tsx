import { Bell, Search } from "lucide-react";

import { CurrentUserService } from "@/services/current-user.service";
import { UserRole } from "@/types/enum/UserRole";

const Topbar = () => {
  const user = CurrentUserService.getUser();

  const role = user?.role_ID === UserRole.Admin ? "Admin" : "Employee";

  const avatar = user?.full_name.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none transition focus:border-slate-900"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button className="relative rounded-lg p-2 text-slate-600 transition hover:cursor-pointer hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">
            {user?.full_name}
          </p>

          <p className="text-xs text-slate-500">{role}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {avatar}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
