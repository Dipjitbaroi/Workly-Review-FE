export interface ICreateRatingDto {
  userId: string;
  workRelation: "supervisor" | "peer";
  workedTogetherCompanyId: string;
  recommend: boolean;
  review: string;

  peerCommunication?: number;
  peerTechnicalSkills?: number;
  peerAccountability?: number;
  peerProblemSolving?: number;
  peerAdaptability?: number;
  peerProfessionalism?: number;
  supEmployeeDevelopment?: number;
  supCommunication?: number;
  supTransparency?: number;
  supKnowledge?: number;
  supLeaderShip?: number;
  supFairness?: number;
}

export interface ICreateReportDto {
  ratingId: string;
  reason: string;
}
