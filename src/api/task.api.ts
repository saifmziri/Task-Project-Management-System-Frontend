import api from "./axios";

import { API_ENDPOINTS } from "@/constants/api-endpoints";

import type {
  ApiResponse,
  Task,
  GetTasksRequest,
  CreateTaskRequest,
  UpdateTaskRequest,
  ChangeTaskStatusRequest,
} from "@/types";

const TaskApi = {
  getAll: (params?: GetTasksRequest) => {
    return api.get<ApiResponse<Task[]>>(API_ENDPOINTS.TASKS.LIST, {
      params,
    });
  },

  getById: (id: number | string) => {
    return api.get<ApiResponse<Task>>(API_ENDPOINTS.TASKS.BY_ID(id));
  },

  create: (data: CreateTaskRequest) => {
    return api.post<ApiResponse<Task>>(API_ENDPOINTS.TASKS.CREATE, data);
  },

  update: (id: number | string, data: UpdateTaskRequest) => {
    return api.put<ApiResponse<Task>>(API_ENDPOINTS.TASKS.UPDATE(id), data);
  },

  delete: (id: number | string) => {
    return api.delete<ApiResponse<null>>(API_ENDPOINTS.TASKS.DELETE(id));
  },

  changeStatus: (id: number | string, data: ChangeTaskStatusRequest) => {
    return api.patch<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS.CHANGE_STATUS(id),
      data,
    );
  },
};

export default TaskApi;
