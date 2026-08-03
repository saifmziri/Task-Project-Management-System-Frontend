import api from "./axios";

import { API_ENDPOINTS } from "@/constants/api-endpoints";

import type { ApiResponse, User, SearchRequest } from "@/types";
import type { UpdateUserRequest, ChangeUserStatusRequest } from "@/types";

const UserApi = {
  getAll: (params?: SearchRequest) => {
    return api.get<ApiResponse<User[]>>(API_ENDPOINTS.USERS.LIST, {
      params,
    });
  },

  update: (id: number, data: UpdateUserRequest) => {
    return api.put<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.USERS.UPDATE(id),
      data,
    );
  },

  changeStatus: (id: number, data: ChangeUserStatusRequest) => {
    return api.patch<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.USERS.CHANGE_STATUS(id),
      data,
    );
  },
};

export default UserApi;
