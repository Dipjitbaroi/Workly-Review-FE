import { DateString } from "@/types/common.type";
import { IAverageRating, IRatings, ISocial } from "../profile/profile.dto";

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string;
  avatar: string | null;
  companies: {
    id: string;
    userId: string;
    companyId: string;
    departmentId: string;
    positionId: string;
    startingAt: DateString;
    endAt: DateString | null;
    createdAt: DateString;
    company: {
      id: string;
      name: string;
      website: string | null;
      logo: string | null;
      createdAt: DateString;
    };
    department: {
      id: string;
      title: string;
    };
    position: {
      id: string;
      title: string;
    };
  }[];
  ratings: {
    recommend: number;
    knownFor: string;
    total: number;
    overallRating: string;
    peer: {
      peerCommunication: string;
      peerTechnicalSkills: string;
      peerAccountability: string;
      peerProblemSolving: string;
      peerAdaptability: string;
      peerProfessionalism: string;
    };
    supervisor: {
      supEmployeeDevelopment: string;
      supCommunication: string;
      supTransparency: string;
      supKnowledge: string;
      supLeaderShip: string;
      supFairness: string;
    };
  };
}

export interface ISingleEmployee {
  employee: {
    id: "01JFJMCGDMEV7X1R5EM7A97QQA";
    firstName: "Test";
    lastName: "aa";
    email: "test@g.com";
    phone: null;
    avatar: null;
    companies: {
      startingAt: DateString;
      endAt: DateString | null;
      createdAt: DateString;
      company: {
        id: string;
        name: string;
        website: string | null;
        logo: string | null;
        createdAt: DateString;
      };
      department: {
        id: string;
        title: string;
      };
      position: {
        id: string;
        title: string;
      };
    }[];
    social: ISocial;
    ratings: IRatings[];
  };
  averageRating: IAverageRating;
}

export interface IAddColleagueDto {
  firstName: string;
  lastName: string;
  linkedInUrl: string;
  currentCompanyId?: string;
  currentCompanyName: string;
  currentDepartmentId?: string;
  currentDepartmentName: string;
  currentPositionId?: string;
  currentPositionName: string;
}
