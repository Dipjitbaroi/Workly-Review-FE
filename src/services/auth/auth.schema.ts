import {
  ZodEmailString,
  ZodEmptyString,
  ZodNameString,
  ZodPasswordString,
  ZodSimpleString,
} from "@/utils/zod.util";
import { z } from "zod";

// * Request object with zod
export const LoginWithEmailSchema = z
  .object({
    email: ZodEmailString,
    password: ZodPasswordString,
  })
  .strict();

export type ILoginWithEmailSchema = z.infer<typeof LoginWithEmailSchema>;

// * Response object
export interface ICurrentUser {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  avatar?: string;
  isEmailVerified: boolean;
  lastLoggedIn: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export const RegisterSchema = z.object({
  firstName: ZodNameString,
  lastName: ZodNameString,
  linkedInUrl: z
    .string()
    .regex(
      /^https:\/\/www\.linkedin\.com\//,
      "URL must start with 'https://www.linkedin.com/'"
    )
    .transform((url) => url.replace(/\/$/, "")),
  email: ZodEmailString,
  password: ZodPasswordString,
  currentCompanyName: ZodSimpleString,
  currentCompanyId: ZodEmptyString,
  currentDepartment: ZodSimpleString,
  currentDepartmentId: ZodEmptyString,
  currentPosition: ZodSimpleString,
  currentPositionId: ZodEmptyString,
  startedAt: z.date(),
  termsCondition: z.boolean().refine((checked) => checked === true, {
    message: "Pleases confirm terms & condition",
  }),
});
export type IRegisterSchema = z.infer<typeof RegisterSchema>;

export const RegisterWithLinkedInSchema = RegisterSchema.omit({
  password: true,
});
export type IRegisterWithLinkedInSchema = z.infer<
  typeof RegisterWithLinkedInSchema
>;
