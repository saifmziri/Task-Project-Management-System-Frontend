import api from "./axios";

import { API_ENDPOINTS } from "@/constants/api-endpoints";

import type {
  ApiResponse,
  Project,
  GetProjectsParams,
  SaveProjectRequest,
} from "@/types";

const ProjectApi = {
  getAll: (params?: GetProjectsParams) => {
    return api.get<ApiResponse<Project[]>>(API_ENDPOINTS.PROJECTS.LIST, {
      params,
    });
  },

  getById: (id: number | string) => {
    return api.get<ApiResponse<Project>>(API_ENDPOINTS.PROJECTS.BY_ID(id));
  },

  create: (data: SaveProjectRequest) => {
    return api.post<ApiResponse<Project>>(API_ENDPOINTS.PROJECTS.CREATE, data);
  },

  update: (id: number | string, data: SaveProjectRequest) => {
    return api.put<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECTS.UPDATE(id),
      data,
    );
  },

  delete: (id: number | string) => {
    return api.delete<ApiResponse<null>>(API_ENDPOINTS.PROJECTS.DELETE(id));
  },
};

export default ProjectApi;
