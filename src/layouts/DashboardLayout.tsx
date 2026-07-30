import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
