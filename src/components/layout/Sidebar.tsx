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

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <h1 className="text-xl font-bold text-slate-900">Tally</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/projects"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <FolderKanban size={20} />
            <span>Projects</span>
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/tasks"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <SquareCheckBig size={20} />
              <span>Tasks</span>
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Users size={20} />
              <span>Users</span>
            </NavLink>
          )}

          <NavLink
            to="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <User size={20} />
            <span>Profile</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <Button
            onClick={() => setOpenLogout(true)}
            className="flex w-full items-center justify-start gap-3 bg-transparent px-3 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
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
