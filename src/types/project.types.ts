export interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  due_date: string;
}

export interface GetProjectsParams {
  search?: string;
}

export interface SaveProjectRequest {
  name: string;
  description: string;
  start_date: string;
  due_date: string;
}
