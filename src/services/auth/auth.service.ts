import { Constant } from "@/constants/common.constant";
import { IResponse } from "../../types/response.type";
import { ApiService } from "../api.service";
import {
  ICurrentUser,
  IRegisterWithEmailDto,
  IRegisterWithLinkedInDto,
  ITokens,
} from "./auth.dto";
import {
  ILoginWithEmailSchema,
  IRegisterSchema,
  IRegisterWithLinkedInSchema,
} from "./auth.schema";

export const AuthService = {
  loginWithEmail: async (schema: ILoginWithEmailSchema) => {
    const dto = schema;
    const { data } = await ApiService.post<ICurrentUser>(
      "/v1/auth/login-with-email",
      dto
    );
    return data;
  },
  getLinkedInSessionLink: async () => {
    const { data } = await ApiService.get<IResponse<{ link: string }>>(
      "/v1/auth/linkedin/signin"
    );
    return data;
  },

  refreshToken: async () => {
    const result = await ApiService.post<IResponse<ITokens>>("/v1/auth/token");
    return result.data.response;
  },
  // get the user profile full details
  getLoggedInUser: async () => {
    const result = await ApiService.post<IResponse<ICurrentUser>>("/v1/user");
    return result.data.response;
  },

  logoutUser: async () => {
    await ApiService.post("/v1/auth/logout");
  },

  registerUserWithEmail: async (schema: IRegisterSchema) => {
    const dto: IRegisterWithEmailDto = {
      provider: "simple",
      user: {
        firstName: schema.firstName,
        lastName: schema.lastName,
        email: schema.email,
        linkedInUrl: schema.linkedInUrl,
        password: schema.password,
        currentCompanyId: schema.currentCompanyId,
        currentCompanyName: schema.currentCompanyName,
        currentDepartmentId: schema.currentDepartmentId,
        currentDepartmentName: schema.currentDepartment,
        currentPositionId: schema.currentPositionId,
        currentPositionName: schema.currentPosition,
        startingAt: schema.startedAt,
        timeZone: Constant.TIME_ZONE,
      },
    };
    const { data } = await ApiService.post("/v1/auth/register", dto);

    return data;
  },

  registerUserWithLinkedIn: async (schema: IRegisterWithLinkedInSchema) => {
    const dto: IRegisterWithLinkedInDto = {
      firstName: schema.firstName,
      lastName: schema.lastName,
      email: schema.email,
      linkedInUrl: schema.linkedInUrl,
      currentCompanyId: schema.currentCompanyId,
      currentCompanyName: schema.currentCompanyName,
      currentDepartmentId: schema.currentDepartmentId,
      currentDepartmentName: schema.currentDepartment,
      currentPositionId: schema.currentPositionId,
      currentPositionName: schema.currentPosition,
      startingAt: schema.startedAt,
      timeZone: Constant.TIME_ZONE,
    };

    const { data } = await ApiService.post(
      "/v1/auth/linkedin/complete-reg",
      dto
    );

    return data;
  },
};
