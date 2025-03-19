import { IResponse } from "@/types/response.type";
import { ApiService } from "../api.service";
import { IEmployee } from "../employee/employee.dto";
import {
  IChangePassDto,
  IProfile,
  IProfileRatings,
  ISocialDto,
} from "./profile.dto";
import { IPassChangeSchema, IProfileSchema } from "./profile.schema";

export const ProfileService = {
  getProfileInfo: async () => {
    const { data } = await ApiService.get<IResponse<IProfile>>(`/v1/profile`);
    return data.response;
  },
  getProfileRatings: async () => {
    const { data } = await ApiService.get<IResponse<IProfileRatings>>(
      `/v1/profile/ratings`
    );
    return data.response;
  },
  getSavedEmployee: async () => {
    const { data } = await ApiService.get<IResponse<IEmployee[]>>(
      `/v1/profile/saved-user`
    );
    return data.response;
  },
  saveEmployee: async (employeeId: string) => {
    const { data } = await ApiService.post<IResponse>(`/v1/profile/save-user`, {
      employeeId: employeeId,
    });
    return data.response;
  },
  editSocial: async (schema: IProfileSchema) => {
    const dto: ISocialDto = {
      email: schema.email,
      linkedInUrl: schema.linkedInUrl,
      facebookUrl: schema.facebook,
    };
    const { data } = await ApiService.put<IResponse>(`/v1/profile/social`, dto);
    return data.response;
  },

  changePassword: async (schema: IPassChangeSchema) => {
    const dto: IChangePassDto = {
      currentPassword: schema.crntPass,
      newPassword: schema.newPass,
      confirmPassword: schema.confirmPass,
    };
    const { data } = await ApiService.put<IResponse>(
      `/v1/auth/change-password`,
      dto
    );
    return data.response;
  },
};
