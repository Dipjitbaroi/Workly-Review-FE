import { ZodSimpleString } from "@/utils/zod.util";
import { z } from "zod";

export const CreateRatingSchema = z
  .object({
    employeeId: ZodSimpleString,
    workRelation: z.enum(["peer", "supervisor"]),
    workedTogetherCompanyId: ZodSimpleString,
    recommend: z.boolean(),
    review: ZodSimpleString,
    // Supervisor-related properties
    supEmployeeDevelopment: z.number().min(0).max(5).optional(),
    supCommunication: z.number().min(0).max(5).optional(),
    supTransparency: z.number().min(0).max(5).optional(),
    supKnowledge: z.number().min(0).max(5).optional(),
    supLeaderShip: z.number().min(0).max(5).optional(),
    supFairness: z.number().min(0).max(5).optional(),
    // Peer-related properties
    peerCommunication: z.number().min(0).max(5).optional(),
    peerTechnicalSkills: z.number().min(0).max(5).optional(),
    peerAccountability: z.number().min(0).max(5).optional(),
    peerProblemSolving: z.number().min(0).max(5).optional(),
    peerAdaptability: z.number().min(0).max(5).optional(),
    peerProfessionalism: z.number().min(0).max(5).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.workRelation === "supervisor") {
      const peerFields = [
        "supEmployeeDevelopment",
        "supCommunication",
        "supTransparency",
        "supKnowledge",
        "supLeaderShip",
        "supFairness",
      ];
      peerFields.forEach((field) => {
        if (data[field as keyof typeof data] === undefined) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: `${field} is required when workRelation is "supervisor"`,
          });
        }
      });
    }

    if (data.workRelation === "peer") {
      const supFields = [
        "peerCommunication",
        "peerTechnicalSkills",
        "peerAccountability",
        "peerProblemSolving",
        "peerAdaptability",
        "peerProfessionalism",
      ];
      supFields.forEach((field) => {
        if (data[field as keyof typeof data] === undefined) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: `${field} is required when workRelation is "peer"`,
          });
        }
      });
    }
  });

export type ICreateRatingSchema = z.infer<typeof CreateRatingSchema>;

export const CreateReportSchema = z.object({
  ratingId: ZodSimpleString,
  reason: ZodSimpleString,
});
export type ICreateReportSchema = z.infer<typeof CreateReportSchema>;
