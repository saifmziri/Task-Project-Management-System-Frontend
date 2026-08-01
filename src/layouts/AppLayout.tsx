import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-64 flex min-h-screen flex-col">
        <Topbar />

        <main className="flex-1 p-6 pt-22">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
