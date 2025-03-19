import { IResponse } from "@/types/response.type";
import { ApiService } from "../api.service";
import { ICompany, IDepartment, IPosition } from "./company.dto";

export const CompanyService = {
  getCompanyByName: async (companyName: string) => {
    const { data } = await ApiService.get<IResponse<ICompany[]>>(
      `/v1/company?name=${companyName}`
    );
    return data;
  },
  getDepartmentByName: async (departmentName: string) => {
    const { data } = await ApiService.get<IResponse<IDepartment[]>>(
      `/v1/company/department?name=${departmentName}`
    );
    return data;
  },
  getPositionByName: async (positionName: string) => {
    const { data } = await ApiService.get<IResponse<IPosition[]>>(
      `/v1/company/position?name=${positionName}`
    );
    return data;
  },
};
