import ProjectApi from "@/api/project.api";

import type { Project, GetProjectsParams, SaveProjectRequest } from "@/types";

class ProjectService {
  async getAll(params?: GetProjectsParams): Promise<Project[]> {
    const response = await ProjectApi.getAll(params);
console.log("ProjectService.getAll response:", response); // Debugging line
    return response.data.data;
  }

  async getById(id: number | string): Promise<Project> {
    const response = await ProjectApi.getById(id);

    return response.data.data;
  }

  async create(data: SaveProjectRequest): Promise<Project> {
    const response = await ProjectApi.create(data);

    return response.data.data;
  }

  async update(
    id: number | string,
    data: SaveProjectRequest,
  ): Promise<Project> {
    const response = await ProjectApi.update(id, data);

    return response.data.data;
  }

  async delete(id: number | string): Promise<void> {
    await ProjectApi.delete(id);
  }
}

export default new ProjectService();
