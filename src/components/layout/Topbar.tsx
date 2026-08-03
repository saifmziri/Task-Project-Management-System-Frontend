import { Bell } from "lucide-react";

import { CurrentUserService } from "@/services/current-user.service";
import { UserRole } from "@/types/enum/UserRole";

const Topbar = () => {
  const user = CurrentUserService.getUser();

  const role = user?.role_ID === UserRole.Admin ? "Admin" : "Employee";

  const avatar = user?.full_name.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
      <div className="ml-auto flex items-center gap-5">
        <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:cursor-pointer hover:bg-slate-100 hover:text-navy-900">
          <Bell size={20} />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="text-right">
          <p className="text-navy-900 text-[14px] font-semibold">
            {user?.full_name}
          </p>

          <p className="text-[12.5px] text-slate-500">{role}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-navy-800 to-navy-900 text-[14px] font-semibold text-brass-300 shadow-[0_0_0_2px_rgba(189,143,60,0.15)]">
          {avatar}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
