"use client";
import { queryClient, QueryKeys } from "@/config/query.config";
import { KeyConstant } from "@/constants/key.constant";
import {
  AddColleagueSchema,
  IAddColleagueSchema,
} from "@/services/employee/employee.schema";
import { EmployeeService } from "@/services/employee/employee.service";
import { ErrorUtil } from "@/utils/error.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useEmployeeController = () => {
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const { employeeId } = useParams<{ employeeId: string }>();

  const name = searchParams.get(KeyConstant.SEARCH);
  const companyId = searchParams.get(KeyConstant.COMPANY_ID);
  const departmentId = searchParams.get(KeyConstant.DEPARTMENT_ID);
  const positionId = searchParams.get(KeyConstant.POSITION_ID);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
  } = useForm<IAddColleagueSchema>({
    resolver: zodResolver(AddColleagueSchema),
  });

  const { data: employee, isLoading } = useQuery({
    queryKey: [
      QueryKeys.FIND_EMPLOYEE,
      companyId,
      departmentId,
      positionId,
      name,
    ],
    queryFn: () =>
      EmployeeService.findEmployee(
        name as string,
        companyId as string,
        departmentId as string,
        positionId as string
      ),
  });

  const { data: singleEmployee, isLoading: isSingleEmployeeLoading } = useQuery(
    {
      queryKey: [QueryKeys.SINGLE_EMPLOYEE, employeeId],
      queryFn: () => EmployeeService.getSingleEmployee(employeeId),
    }
  );

  const addColleagueOnSubmit = async (input: IAddColleagueSchema) => {
    try {
      await EmployeeService.addColleague(input);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QueryKeys.FIND_EMPLOYEE] }),
      ]);
      setIsOpen(false);
      toast.success("register successful");
      reset();
    } catch (error) {
      console.error("reg with email:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };
  return {
    employee,
    isLoading,
    singleEmployee,
    isSingleEmployeeLoading,
    control,
    handleSubmit: handleSubmit(addColleagueOnSubmit),
    isSubmitting,
    setValue,
    isOpen,
    setIsOpen,
  };
};
