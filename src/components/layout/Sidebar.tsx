import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  SquareCheckBig,
  Users,
  User,
  LogOut,
} from "lucide-react";

import { Button, ConfirmDialog } from "@/components/ui";

import AuthService from "@/services/auth.service";
import { CurrentUserService } from "@/services/current-user.service";

import { useToast } from "@/context/ToastContext";
import { useApiRequest } from "@/hooks/useApiRequest";

const Sidebar = () => {
  const navigate = useNavigate();

  const { showToast } = useToast();
  const { execute } = useApiRequest();

  const isAdmin = CurrentUserService.isAdmin();

  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = async () => {
    const success = await execute(async () => {
      await AuthService.logout();
    });

    if (!success) {
      return;
    }

    setOpenLogout(false);

    showToast("Logged out successfully.", "success");

    navigate("/login", {
      replace: true,
    });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14.5px] font-medium transition-colors duration-150 ${
      isActive
        ? "bg-brass-500/15 text-brass-300"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-linear-to-b from-navy-900 to-navy-950">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-brass-300 to-brass-500 shadow-[0_2px_8px_-1px_rgba(189,143,60,0.5)]">
            <svg
              viewBox="0 0 20 20"
              className="h-4.5 w-4.5"
              fill="none"
              stroke="#0b1220"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10.5l4 4 8-9" />
            </svg>
          </div>
          <h1 className="text-[19px] font-semibold tracking-tight text-white">
            Wandly
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <NavLink to="/Dashboard" end className={navLinkClass}>
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/projects" className={navLinkClass}>
            <FolderKanban size={19} />
            <span>Projects</span>
          </NavLink>

          {isAdmin && (
            <NavLink to="/tasks" className={navLinkClass}>
              <SquareCheckBig size={19} />
              <span>Tasks</span>
            </NavLink>
          )}

          {isAdmin && (
            <NavLink to="/users" className={navLinkClass}>
              <Users size={19} />
              <span>Users</span>
            </NavLink>
          )}

          <NavLink to="/profile" className={navLinkClass}>
            <User size={19} />
            <span>Profile</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <Button
            onClick={() => setOpenLogout(true)}
            className="flex w-full items-center justify-start gap-3 bg-transparent px-3 py-2.5 text-[14.5px] font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut size={19} />
            Logout
          </Button>
        </div>
      </aside>

      <ConfirmDialog
        open={openLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
