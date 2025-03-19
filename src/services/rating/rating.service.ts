import { IResponse } from "@/types/response.type";
import { ApiService } from "../api.service";
import { ICreateRatingDto, ICreateReportDto } from "./rating.dto";
import { ICreateRatingSchema, ICreateReportSchema } from "./rating.schema";

export const RatingService = {
  createRating: async (schema: ICreateRatingSchema) => {
    const dto: ICreateRatingDto = {
      userId: schema.employeeId, // who got rated
      workRelation: schema.workRelation,
      workedTogetherCompanyId: schema.workedTogetherCompanyId,
      recommend: schema.recommend,
      review: schema.review,
      peerCommunication: schema.peerCommunication,
      peerTechnicalSkills: schema.peerTechnicalSkills,
      peerAccountability: schema.peerAccountability,
      peerProblemSolving: schema.peerProblemSolving,
      peerAdaptability: schema.peerAdaptability,
      peerProfessionalism: schema.peerProfessionalism,
      supEmployeeDevelopment: schema.supEmployeeDevelopment,
      supCommunication: schema.supCommunication,
      supTransparency: schema.supTransparency,
      supKnowledge: schema.supKnowledge,
      supLeaderShip: schema.supLeaderShip,
      supFairness: schema.supFairness,
    };

    const { data } = await ApiService.post<IResponse>("/v1/rating/create", dto);
    return data;
  },

  appreciateRating: async (ratingId: string) => {
    const { data } = await ApiService.put<IResponse>(
      `/v1/rating/appreciate/${ratingId}`
    );
    return data.response;
  },
  doubtedRating: async (ratingId: string) => {
    const { data } = await ApiService.put<IResponse>(
      `/v1/rating/doubtful/${ratingId}`
    );
    return data.response;
  },

  reportRating: async (body: ICreateReportSchema) => {
    const dto: ICreateReportDto = {
      ratingId: body.ratingId,
      reason: body.reason,
    };
    const { data } = await ApiService.post<IResponse>(`/v1/rating/report`, dto);
    return data.response;
  },
};
