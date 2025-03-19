"use client";
import { ReviewCard } from "@/components/review-card";
import { useEmployeeController } from "../../employee.controller";

export const Reviews = () => {
  const { singleEmployee } = useEmployeeController();
  const reviews = singleEmployee?.employee.ratings;

  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-xl after:h-1 after:w-28 after:bg-black after:block pt-5">
        {singleEmployee?.averageRating.total} Reviews
      </h2>
      {reviews?.map((item) => {
        return <ReviewCard key={item.id} item={item} />;
      })}
    </div>
  );
};
