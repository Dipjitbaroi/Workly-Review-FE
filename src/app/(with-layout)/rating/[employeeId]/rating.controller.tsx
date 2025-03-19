"use client";

import { queryClient, QueryKeys } from "@/config/query.config";
import {
  CreateRatingSchema,
  CreateReportSchema,
  ICreateRatingSchema,
  ICreateReportSchema,
} from "@/services/rating/rating.schema";
import { RatingService } from "@/services/rating/rating.service";
import { ErrorUtil } from "@/utils/error.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useRatingController = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<ICreateRatingSchema>({
    mode: "onChange",
    resolver: zodResolver(CreateRatingSchema),
  });

  const onSubmit = async (input: ICreateRatingSchema) => {
    try {
      await RatingService.createRating(input);

      toast.success("Rating successful");
    } catch (error) {
      console.error("Incidents:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };

  const { mutate: appreciateRatingOnSubmit, isPending: isAppreciating } =
    useMutation({
      mutationFn: (id: string) => RatingService.appreciateRating(id),
      onSuccess: () => {
        toast.success("Appreciate successful");

        queryClient.invalidateQueries({
          queryKey: [QueryKeys.SINGLE_EMPLOYEE],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_PROFILE_RATINGS],
        });
      },
      onError: (error) => {
        console.error("appreciateRating:onSubmit:->", error);
        const message = ErrorUtil.getErrorMessage(error as Error).message;
        toast.error(message);
      },
    });

  const { mutate: doubtedRatingOnSubmit, isPending: isDoubting } = useMutation({
    mutationFn: (id: string) => RatingService.doubtedRating(id),
    onSuccess: () => {
      toast.success("Doubted successful");

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SINGLE_EMPLOYEE],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_PROFILE_RATINGS],
      });
    },
    onError: (error) => {
      console.error("doubtedRating:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    },
  });

  const {
    control: reportControl,
    handleSubmit: reportHandleSubmit,
    formState: { isSubmitting: reportIsSubmitting },
    setValue: reportSetValue,
  } = useForm<ICreateReportSchema>({
    mode: "onChange",
    resolver: zodResolver(CreateReportSchema),
  });

  const reportOnSubmit = async (input: ICreateReportSchema) => {
    try {
      await RatingService.reportRating(input);

      toast.success("Rating successful");
    } catch (error) {
      console.error("Incidents:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };

  return {
    control,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,

    appreciateRatingOnSubmit,
    isAppreciating,
    doubtedRatingOnSubmit,
    isDoubting,

    reportControl,
    reportHandleSubmit: reportHandleSubmit(reportOnSubmit),
    reportSetValue,
    reportIsSubmitting,
  };
};
