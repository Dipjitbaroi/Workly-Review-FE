import {
  ZodEmailString,
  ZodEmptyString,
  ZodPasswordString,
  ZodSimpleString,
} from "@/utils/zod.util";
import { z } from "zod";

export const ProfileSchema = z.object({
  email: ZodEmailString,
  linkedInUrl: z
    .string()
    .regex(
      /^https:\/\/www\.linkedin\.com\//,
      "URL must start with 'https://www.linkedin.com/'"
    )
    .transform((url) => url.replace(/\/$/, "")),
  facebook: ZodEmptyString,
});
export type IProfileSchema = z.infer<typeof ProfileSchema>;

export const PassChangeSchema = z
  .object({
    crntPass: ZodSimpleString,
    newPass: ZodPasswordString,
    confirmPass: ZodPasswordString,
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
  });
export type IPassChangeSchema = z.infer<typeof PassChangeSchema>;
