import UserApi from "@/api/user.api";

import type { User, SearchRequest } from "@/types";
import type {
  UpdateUserRequest,
  ChangeUserStatusRequest,
} from "@/types";

const UserService = {
  async getAll(params?: SearchRequest): Promise<User[]> {
    const response = await UserApi.getAll(params);

    return response.data.data;
  },

  async update(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await UserApi.update(id, data);

    return response.data.data.user;
  },

  async changeStatus(
    id: number,
    data: ChangeUserStatusRequest,
  ): Promise<User> {
    const response = await UserApi.changeStatus(id, data);

    return response.data.data.user;
  },
};

export default UserService;