"use client";
import MySpacer from "@/components/common/my-spacer";
import { ReviewCard } from "@/components/review-card";
import { useProfileController } from "../../profile.controller";

export const MyRating = () => {
  const { profileRatings } = useProfileController();
  return (
    <div>
      <h2 className="font-semibold text-xl after:h-1 after:w-28 after:bg-black after:block pt-5">
        {profileRatings?.total} Reviews
      </h2>

      <MySpacer className="h-4" />
      <div className="space-y-5 md:w-5/6">
        {profileRatings?.ratings?.map((item) => {
          return <ReviewCard key={item.id} item={item || {}} />;
        })}
      </div>
    </div>
  );
};
