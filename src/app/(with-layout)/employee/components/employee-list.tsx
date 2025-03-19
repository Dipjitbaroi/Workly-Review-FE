"use client";
import { EmployeeCard } from "@/components/employee-card";
import { useEmployeeController } from "../employee.controller";

export const EmployeeList = () => {
  const { employee } = useEmployeeController();
  return (
    <div>
      {(employee?.length || 0) < 1 ? (
        <h1 className="text-center py-10 text-gray-500">No Employee Found</h1>
      ) : (
        <div className="space-y-6">
          {employee?.map((item) => (
            <EmployeeCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
