import { DateString } from "@/types/common.type";

export interface ICompany {
  id: string;
  name: string;
  website?: string;
  logo?: string;
  createdAt: DateString;
}

export interface IDepartment {
  id: string;
  title: string;
}

export interface IPosition {
  id: string;
  title: string;
}
