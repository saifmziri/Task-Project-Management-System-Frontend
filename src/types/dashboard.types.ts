import { TaskStatus } from "@/types/enum/TaskStatus";
import { TaskPriority } from "@/types/enum/TaskPriority";

export interface DashboardStats {
  total_projects: number;
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  canceled_tasks: number;
  total_users: number;

  recent_tasks: DashboardRecentTask[];
  project_progress: DashboardProjectProgress[];

  tasks_by_priority: DashboardTaskPriority;
  tasks_by_status: DashboardTaskStatus;
}

export interface DashboardRecentTask {
  id: number;
  task_name: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;

  project_id: number;
  project_name: string;

  user_id: number;
  user_name: string;

  created_at: string;
}

export interface DashboardProjectProgress {
  id: number;
  name: string;
  total_tasks: number;
  completed_tasks: number;
  progress: number;
}

export interface DashboardTaskPriority {
  high: number;
  medium: number;
  low: number;
}

export interface DashboardTaskStatus {
  completed: number;
  in_progress: number;
  canceled: number;
}
