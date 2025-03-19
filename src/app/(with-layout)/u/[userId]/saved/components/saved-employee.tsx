"use client";
import { EmployeeCard } from "@/components/employee-card";
import { useProfileController } from "../../profile.controller";

export const SavedEmployee = () => {
  const { savedEmployee } = useProfileController();
  return (
    <div className="space-y-5">
      {(savedEmployee?.length || 0) < 1 ? (
        <h1 className="text-center py-10 text-gray-500">
          No Saved Employee Found
        </h1>
      ) : (
        <>
          {savedEmployee?.map((item) => (
            <EmployeeCard key={item.id} item={item} />
          ))}
        </>
      )}
    </div>
  );
};
