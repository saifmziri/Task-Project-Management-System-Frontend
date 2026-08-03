import {
  FolderKanban,
  ClipboardList,
  CircleCheckBig,
  Users,
  LoaderCircle,
  CircleX,
} from "lucide-react";

import DashboardCard from "./StatCard";

import type { DashboardStats } from "@/types";

interface DashboardCardsProps {
  dashboard: DashboardStats;
}

const DashboardCards = ({ dashboard }: DashboardCardsProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <DashboardCard
        title="Projects"
        value={dashboard.total_projects}
        icon={FolderKanban}
      />

      <DashboardCard
        title="Tasks"
        value={dashboard.total_tasks}
        icon={ClipboardList}
      />

      <DashboardCard
        title="Completed"
        value={dashboard.completed_tasks}
        icon={CircleCheckBig}
        iconClassName="text-emerald-600"
      />

      <DashboardCard
        title="In Progress"
        value={dashboard.in_progress_tasks}
        icon={LoaderCircle}
        iconClassName="text-brass-600"
      />

      <DashboardCard
        title="Canceled"
        value={dashboard.canceled_tasks}
        icon={CircleX}
        iconClassName="text-rose-500"
      />

      <DashboardCard title="Users" value={dashboard.total_users} icon={Users} />
    </div>
  );
};

export default DashboardCards;
