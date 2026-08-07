import TaskApi from "@/api/task.api";

import type {
  Task,
  GetTasksRequest,
  SaveTaskRequest,
  ChangeTaskStatusRequest,
} from "@/types";

class TaskService {
  async getAll(params?: GetTasksRequest): Promise<Task[]> {
    return (await TaskApi.getAll(params)).data.data;
  }

  async getById(id: number | string): Promise<Task> {
    return (await TaskApi.getById(id)).data.data;
  }

  async create(data: SaveTaskRequest): Promise<Task> {
    return (await TaskApi.create(data)).data.data;
  }

  async update(id: number | string, data: SaveTaskRequest): Promise<Task> {
    return (await TaskApi.update(id, data)).data.data;
  }

  async delete(id: number | string): Promise<void> {
    await TaskApi.delete(id);
  }

  async changeStatus(
    id: number | string,
    data: ChangeTaskStatusRequest,
  ): Promise<Task> {
    return (await TaskApi.changeStatus(id, data)).data.data;
  }
}

export default new TaskService();
