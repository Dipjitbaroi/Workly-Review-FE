import { DateString } from "@/types/common.type";

// * Response Object
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ICurrentUser {
  id: string;
  avatar: string;
  code: string;
  email: string;
  gender: string;
  isApproved: boolean;
  isEmailVerified: boolean;
  lastLoggedIn: DateString;
  phone: string;
  type: string;
  updatedAt: DateString;
  address: string;
  dob: string;
  city: string;
  state: string;
  zip: string;
  linkedInId: string | null;
  linkedInUrl: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  countryCode: string;
  zipCode: null;
  timeZone: string;
  fcmToken: null;
  companies: [
    {
      id: string;
      userId: string;
      companyId: string;
      departmentId: string;
      positionId: string;
      startingAt: DateString;
      endAt?: DateString;
      createdAt: DateString;
    }
  ];
  createdAt: DateString;
}

export type IRegisterWithEmailDto = {
  provider: string;
  user: {
    firstName: string;
    lastName: string;
    linkedInUrl: string;
    email: string;
    password: string;
    timeZone: string;
    fcmToken?: null | string;
    currentCompanyId?: string;
    currentCompanyName: string;
    currentDepartmentId?: string;
    currentDepartmentName: string;
    currentPositionId?: string;
    currentPositionName: string;
    startingAt: Date;
  };
};

export interface IRegisterWithLinkedInDto {
  firstName: string;
  lastName: string;
  email: string;
  linkedInUrl: string;
  currentCompanyId?: string;
  currentCompanyName: string;
  currentDepartmentId?: string;
  currentDepartmentName: string;
  currentPositionId?: string;
  currentPositionName: string;
  startingAt: Date;
  timeZone: string;
}
