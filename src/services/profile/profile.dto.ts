export interface IProfile {
  id: string;
  linkedInId: string | null;
  linkedInUrl: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string;
  gender: string;
  avatar: string | null;
  isEmailVerified: boolean;
  createdBy: string | null;
  countryCode: string;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  address: string | null;
  timeZone: string;
  fcmToken: string | null;
  lastLoggedIn: string;
  createdAt: string;
  social: ISocial;
  companies: {
    id: string;
    userId: string;
    companyId: string;
    departmentId: string;
    positionId: string;
    startingAt: string;
    endAt: string | null;
    createdAt: string;
    company: {
      id: string;
      name: string;
      website: string | null;
      logo: string | null;
      createdAt: string;
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
  averageRating: IAverageRating;
}
export interface IAverageRating {
  peerRecommend: number;
  supRecommend: number;
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
}

export interface IProfileRatings {
  total: number;
  ratings: IRatings[];
}
export interface IRatings {
  id: string;
  userId: string;
  reviewerId: string;
  workRelation: string;
  workedTogetherCompanyId: string;
  recommend: boolean;
  review: string;
  supEmployeeDevelopment: number;
  supCommunication: number;
  supTransparency: number;
  supKnowledge: number;
  supLeaderShip: number;
  supFairness: number;
  peerCommunication: number;
  peerTechnicalSkills: number;
  peerAccountability: number;
  peerProblemSolving: number;
  peerAdaptability: number;
  peerProfessionalism: number;
  appreciateCount: number;
  doubtCount: number;
  createdAt: string;
  reviewer: {
    firstName: string;
    lastName: string;
    avatar: string | null;
    email: string;
    companies: {
      id: string;
      startingAt: string;
      endAt: string | null;
      createdAt: string;
      company: {
        id: string;
        name: string;
        website: string | null;
        logo: string | null;
        createdAt: string;
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
  };
}

export interface ISocial {
  id: string;
  userId: string;
  fbUrl?: string;
  linkedInUrl: string;
}

export interface ISocialDto {
  email?: string;
  linkedInUrl?: string;
  facebookUrl?: string;
}

export interface IChangePassDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
