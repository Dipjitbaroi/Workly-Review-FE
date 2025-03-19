"use client";
import { ReviewRating } from "@/components/common/review-rating";
import { IAverageRating } from "@/services/profile/profile.dto";
import { useEmployeeController } from "../../employee.controller";

export const EmployeeAvgRating = () => {
  const { singleEmployee, isSingleEmployeeLoading } = useEmployeeController();

  const ratings = singleEmployee?.averageRating;

  if (isSingleEmployeeLoading) {
    return <div className="bg-gray-200 h-52 animate-pulse rounded-md"></div>;
  }
  return <ReviewRating ratings={ratings as IAverageRating} />;
};
