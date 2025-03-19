import {
  ZodEmptyString,
  ZodNameString,
  ZodSimpleString,
} from "@/utils/zod.util";
import { z } from "zod";

export const AddColleagueSchema = z.object({
  firstName: ZodNameString,
  lastName: ZodNameString,
  linkedInUrl: z
    .string()
    .regex(
      /^https:\/\/www\.linkedin\.com\//,
      "URL must start with 'https://www.linkedin.com/'"
    )
    .transform((url) => url.replace(/\/$/, "")),
  currentCompanyName: ZodSimpleString,
  currentCompanyId: ZodEmptyString,
  currentDepartment: ZodSimpleString,
  currentDepartmentId: ZodEmptyString,
  currentPosition: ZodSimpleString,
  currentPositionId: ZodEmptyString,
});
export type IAddColleagueSchema = z.infer<typeof AddColleagueSchema>;
