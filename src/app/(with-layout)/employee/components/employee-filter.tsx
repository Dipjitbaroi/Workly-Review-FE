"use client";

import { useRegisterController } from "@/app/(auth)/registration/register.controller";
import { AutoCompleteInput } from "@/components/common/form/autocomplete-input";
import MyInput from "@/components/common/form/my-input";
import MySpacer from "@/components/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEmployeeController } from "../employee.controller";
export const EmployeeFilter = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get(KeyConstant.SEARCH);
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>(search || "");

  const [companySearchValue, setCompanySearchValue] = useState("");
  const [selectedCompanyValue, setSelectedCompanyValue] = useState("");

  const [departmentSearchValue, setDepartmentSearchValue] = useState("");
  const [departmentSelectedValue, setDepartmentSelectedValue] = useState("");

  const [positionSearchValue, setPositionSearchValue] = useState("");
  const [positionSelectedValue, setPositionSelectedValue] = useState("");

  const { employee } = useEmployeeController();
  const {
    company,
    isLoading,
    department,
    departmentLoading,
    position,
    positionLoading,
  } = useRegisterController();

  const companyData = company?.response.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
  const departmentData = department?.response.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  const positionData = position?.response.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  useEffect(() => {
    // Initialize state from query parameters
    const params = new URLSearchParams(searchParams || "");

    setSearchValue(params.get(KeyConstant.SEARCH) || "");
    setCompanySearchValue(params.get(KeyConstant.COMPANY_NAME) || "");
    setDepartmentSearchValue(params.get(KeyConstant.DEPARTMENT_NAME) || "");
    setPositionSearchValue(params.get(KeyConstant.POSITION_NAME) || "");
    setSelectedCompanyValue(params.get(KeyConstant.COMPANY_ID) || "");
    setDepartmentSelectedValue(params.get(KeyConstant.DEPARTMENT_ID) || "");
    setPositionSelectedValue(params.get(KeyConstant.POSITION_ID) || "");
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchValue) params.set(KeyConstant.SEARCH, searchValue);
    if (companySearchValue)
      params.set(KeyConstant.COMPANY_NAME, companySearchValue);
    if (departmentSearchValue)
      params.set(KeyConstant.DEPARTMENT_NAME, departmentSearchValue);
    if (positionSearchValue)
      params.set(KeyConstant.POSITION_NAME, positionSearchValue);
    if (selectedCompanyValue)
      params.set(KeyConstant.COMPANY_ID, selectedCompanyValue);
    if (departmentSelectedValue)
      params.set(KeyConstant.DEPARTMENT_ID, departmentSelectedValue);
    if (positionSelectedValue)
      params.set(KeyConstant.POSITION_ID, positionSelectedValue);

    // Update the URL with the new search parameters
    router.push(`?${params.toString()}`);
  }, [
    searchValue,
    companySearchValue,
    departmentSearchValue,
    positionSearchValue,
    selectedCompanyValue,
    departmentSelectedValue,
    positionSelectedValue,
    router,
  ]);

  return (
    <div>
      <div>
        <h2 className="text-xl">
          <span className="font-semibold">{employee?.length}</span> Employee
          with <span className="font-semibold">“{search}”</span> in their name
        </h2>
      </div>

      <MySpacer className="h-8" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <MyInput
          placeholder="Search employee"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <AutoCompleteInput
          selectedValue={selectedCompanyValue}
          onSelectedValueChange={setSelectedCompanyValue}
          searchValue={companySearchValue}
          onSearchValueChange={setCompanySearchValue}
          items={companyData ?? []}
          // Optional props
          isLoading={isLoading}
          emptyMessage="No company found."
          placeholder="Current company"
        />
        <AutoCompleteInput
          selectedValue={departmentSelectedValue}
          onSelectedValueChange={setDepartmentSelectedValue}
          searchValue={departmentSearchValue}
          onSearchValueChange={setDepartmentSearchValue}
          items={departmentData ?? []}
          // Optional props
          isLoading={departmentLoading}
          emptyMessage="No department found."
          placeholder="Department"
        />
        <AutoCompleteInput
          selectedValue={positionSelectedValue}
          onSelectedValueChange={setPositionSelectedValue}
          searchValue={positionSearchValue}
          onSearchValueChange={setPositionSearchValue}
          items={positionData ?? []}
          // Optional props
          isLoading={positionLoading}
          emptyMessage="No position found."
          placeholder="Position"
        />
      </div>
    </div>
  );
};
