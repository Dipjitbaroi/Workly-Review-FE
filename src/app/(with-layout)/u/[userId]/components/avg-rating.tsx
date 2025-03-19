"use client";
import { ReviewRating } from "@/components/common/review-rating";
import { IAverageRating } from "@/services/profile/profile.dto";
import { useProfileController } from "../profile.controller";

export const AvgRating = () => {
  const { profile, isProfileLoading } = useProfileController();

  const ratings = profile?.averageRating;

  if (isProfileLoading) {
    return <div className="bg-gray-200 h-52 animate-pulse rounded-md"></div>;
  }
  return <ReviewRating ratings={ratings as IAverageRating} />;
};
