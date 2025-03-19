import { IResponse } from "@/types/response.type";
import { ApiService } from "../api.service";
import { IAddColleagueDto, IEmployee, ISingleEmployee } from "./employee.dto";
import { IAddColleagueSchema } from "./employee.schema";

export const EmployeeService = {
  findEmployee: async (
    name?: string,
    companyId?: string,
    departmentId?: string,
    positionId?: string
  ) => {
    // Initialize an empty query string
    const queryParams: Record<string, string> = {};

    // Add parameters to query string only if they are truthy (not null or undefined)
    if (name) queryParams.name = name;

    // If companyId is provided, set it for the companyId parameter
    if (companyId) {
      queryParams.companyId = companyId;
    }

    // If departmentId is provided and companyId is NOT provided, add departmentId
    if (departmentId) {
      queryParams.departmentId = departmentId;
    }

    // If positionId is provided and companyId is NOT provided, add positionId
    if (positionId) {
      queryParams.positionId = positionId;
    }

    // Build the query string from the queryParams object
    const queryString = new URLSearchParams(queryParams).toString();

    // Send the request with the dynamically built query string
    const { data } = await ApiService.get<IResponse<IEmployee[]>>(
      `/v1/employee/all?${queryString}`
    );

    return data.response;
  },

  getSingleEmployee: async (id: string) => {
    const { data } = await ApiService.get<IResponse<ISingleEmployee>>(
      `/v1/employee/${id}`
    );
    return data.response;
  },

  addColleague: async (schema: IAddColleagueSchema) => {
    const dto: IAddColleagueDto = {
      firstName: schema.firstName,
      lastName: schema.lastName,
      linkedInUrl: schema.linkedInUrl,
      currentCompanyId: schema.currentCompanyId,
      currentCompanyName: schema.currentCompanyName,
      currentDepartmentId: schema.currentDepartmentId,
      currentDepartmentName: schema.currentDepartment,
      currentPositionId: schema.currentPositionId,
      currentPositionName: schema.currentPosition,
    };

    const { data } = await ApiService.post<IResponse>(
      "/v1/employee/add-colleague",
      dto
    );
    return data;
  },
};
