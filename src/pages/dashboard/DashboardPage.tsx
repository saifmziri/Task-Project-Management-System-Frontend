import { useCallback, useEffect, useState } from "react";

import { AlertCircle } from "lucide-react";

import { Spinner } from "@/components/ui";

import {
  StatsGrid,
  RecentTasks,
  ProjectProgress,
  TaskStatusChart,
  TaskPriorityChart,
} from "@/components/dashboard";

import DashboardService from "@/services/dashboard.service";

import { useApiRequest } from "@/hooks/useApiRequest";

import type { DashboardStats } from "@/types";

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const { execute, serverError } = useApiRequest();

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    await execute(async () => {
      const data = await DashboardService.get();

      setDashboard(data);
    });

    setLoading(false);
  }, [execute]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2.5 py-20 text-[14.5px] text-slate-500">
        <Spinner size={18} className="text-navy-900" />
        Loading dashboard...
      </div>
    );
  }

  if (serverError) {
    return (
      <div className="m-8 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[14.5px] text-rose-700">
        <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-500" />
        <span>{serverError}</span>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="py-20 text-center text-[14.5px] text-slate-500">
        Dashboard data not found.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-navy-900 text-[26px] font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-[14.5px] text-slate-500">
          Welcome back! Here&apos;s an overview of your platform.
        </p>
      </div>

      <StatsGrid dashboard={dashboard} />

      <RecentTasks tasks={dashboard.recent_tasks} />

      <ProjectProgress projects={dashboard.project_progress} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TaskStatusChart data={dashboard.tasks_by_status} />

        <TaskPriorityChart data={dashboard.tasks_by_priority} />
      </div>
    </div>
  );
};

export default DashboardPage;
