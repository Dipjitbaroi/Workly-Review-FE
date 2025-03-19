import { queryClient, QueryKeys } from "@/config/query.config";
import { KeyConstant } from "@/constants/key.constant";
import {
  IRegisterSchema,
  IRegisterWithLinkedInSchema,
  RegisterSchema,
  RegisterWithLinkedInSchema,
} from "@/services/auth/auth.schema";
import { AuthService } from "@/services/auth/auth.service";
import { CompanyService } from "@/services/company/company.service";
import { ErrorUtil } from "@/utils/error.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useRegisterController = () => {
  const params = useSearchParams();
  const router = useRouter();
  const companyName = params.get(KeyConstant.COMPANY_NAME);
  const departmentName = params.get(KeyConstant.DEPARTMENT_NAME);
  const positionName = params.get(KeyConstant.POSITION_NAME);

  const { data: company, isLoading } = useQuery({
    queryKey: [QueryKeys.COMPANY_BY_NAME, companyName],
    queryFn: () => CompanyService.getCompanyByName(companyName as string),
    enabled: !!companyName,
  });

  const { data: department, isLoading: departmentLoading } = useQuery({
    queryKey: [QueryKeys.DEPARTMENT_BY_NAME, departmentName],
    queryFn: () => CompanyService.getDepartmentByName(departmentName as string),
    enabled: !!departmentName,
  });

  const { data: position, isLoading: positionLoading } = useQuery({
    queryKey: [QueryKeys.POSITION_BY_NAME, positionName],
    queryFn: () => CompanyService.getPositionByName(positionName as string),
    enabled: !!positionName,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (input: IRegisterSchema) => {
    try {
      await AuthService.registerUserWithEmail(input);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] }),
      ]);

      toast.success("register successful");
      reset();
      router.push("/");
    } catch (error) {
      console.error("reg with email:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };

  const {
    control: lnControl,
    handleSubmit: lnHandleSubmit,
    formState: { isSubmitting: lnIsSubmitting },
    setValue: lnSetValue,
    reset: lnReset,
  } = useForm<IRegisterWithLinkedInSchema>({
    resolver: zodResolver(RegisterWithLinkedInSchema),
  });

  const lnOnSubmit = async (input: IRegisterWithLinkedInSchema) => {
    try {
      await AuthService.registerUserWithLinkedIn(input);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] }),
      ]);

      toast.success("Registration successful");
      lnReset();
      router.push("/");
    } catch (error) {
      console.error("reg with linkedin:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };

  return {
    company,
    isLoading,
    department,
    departmentLoading,
    position,
    positionLoading,

    control,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    setValue,

    lnControl,
    lnHandleSubmit: lnHandleSubmit(lnOnSubmit),
    lnIsSubmitting,
    lnSetValue,
  };
};
