import TaskApi from "@/api/task.api";

import type {
  Task,
  GetTasksRequest,
  SaveTaskRequest,
  ChangeTaskStatusRequest,
} from "@/types";

class TaskService {
  async getAll(params?: GetTasksRequest): Promise<Task[]> {
    const response = await TaskApi.getAll(params);

    return response.data.data;
  }

  async getById(id: number | string): Promise<Task> {
    const response = await TaskApi.getById(id);

    return response.data.data;
  }

  async create(data: SaveTaskRequest): Promise<Task> {
    const response = await TaskApi.create(data);

    return response.data.data;
  }

  async update(id: number | string, data: SaveTaskRequest): Promise<Task> {
    const response = await TaskApi.update(id, data);

    return response.data.data;
  }

  async delete(id: number | string): Promise<void> {
    await TaskApi.delete(id);
  }

  async changeStatus(
    id: number | string,
    data: ChangeTaskStatusRequest,
  ): Promise<Task> {
    const response = await TaskApi.changeStatus(id, data);

    return response.data.data;
  }
}

export default new TaskService();
