import { TaskStatus } from "@/types/enum/TaskStatus";
import { TaskPriority } from "@/types/enum/TaskPriority";

export interface Task {
  id: number;
  task_name: string;
  project_id: number;
  user_id: number;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
  user_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTaskRequest {
  task_name: string;
  project_id: number;
  user_id: number;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
}

export interface UpdateTaskRequest {
  task_name: string;
  project_id: number;
  user_id: number;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
}

export interface ChangeTaskStatusRequest {
  status: TaskStatus;
}

export interface GetTasksRequest {
  search?: string;
  project_id?: number;
}
