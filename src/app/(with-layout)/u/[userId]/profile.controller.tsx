"use client";
import { queryClient, QueryKeys } from "@/config/query.config";
import { useUserStore } from "@/hooks/user.store";
import {
  IPassChangeSchema,
  IProfileSchema,
  PassChangeSchema,
  ProfileSchema,
} from "@/services/profile/profile.schema";
import { ProfileService } from "@/services/profile/profile.service";
import { ErrorUtil } from "@/utils/error.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useProfileController = () => {
  const user = useUserStore((s) => s.user);

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: [QueryKeys.GET_PROFILE],
    queryFn: () => ProfileService.getProfileInfo(),
  });

  const { data: profileRatings, isLoading: isProfileRatingsLoading } = useQuery(
    {
      queryKey: [QueryKeys.GET_PROFILE_RATINGS],
      queryFn: () => ProfileService.getProfileRatings(),
    }
  );

  const { data: savedEmployee, isLoading: isSavedEmployeeLoading } = useQuery({
    queryKey: [QueryKeys.GET_SAVED_EMPLOYEE],
    queryFn: () => ProfileService.getSavedEmployee(),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    setValue,
  } = useForm<IProfileSchema>({
    mode: "onChange",
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: user?.email,
      linkedInUrl: profile?.social?.linkedInUrl,
      facebook: profile?.social?.fbUrl || "",
    },
  });

  const {
    control: passControl,
    handleSubmit: passHandleSubmit,
    formState: { isSubmitting: isPassSubmitting },
  } = useForm<IPassChangeSchema>({
    mode: "onChange",
    resolver: zodResolver(PassChangeSchema),
  });

  const onSubmit = async (input: IProfileSchema) => {
    try {
      await ProfileService.editSocial(input);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("updateProfile:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };

  const changePass = async (input: IPassChangeSchema) => {
    try {
      await ProfileService.changePassword(input);

      toast.success("Password updated successfully");
    } catch (error) {
      console.error("changePassword:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };

  const { mutate: saveEmployeeOnSubmit, isPending: isEmployeeSaving } =
    useMutation({
      mutationFn: (id: string) => ProfileService.saveEmployee(id),
      onSuccess: () => {
        toast.success("Employee save successful");

        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_SAVED_EMPLOYEE],
        });
      },
      onError: (error) => {
        console.error("saveEmployee:onSubmit:->", error);
        const message = ErrorUtil.getErrorMessage(error as Error).message;
        toast.error(message);
      },
    });

  return {
    control,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    isDirty,

    passControl,
    isPassSubmitting,
    passHandleSubmit: passHandleSubmit(changePass),

    profile,
    isProfileLoading,

    profileRatings,
    isProfileRatingsLoading,

    savedEmployee,
    isSavedEmployeeLoading,

    saveEmployeeOnSubmit,
    isEmployeeSaving,
  };
};
