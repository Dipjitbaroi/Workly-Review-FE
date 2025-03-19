"use client";
import { useRegisterController } from "@/app/(auth)/registration/register.controller";
import { AutoCompleteInput } from "@/components/common/form/autocomplete-input";
import MyButton from "@/components/common/form/my-button";
import { MyInputWithRHF } from "@/components/common/form/my-input";
import { MyModal } from "@/components/common/my-modal";
import { KeyConstant } from "@/constants/key.constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEmployeeController } from "../employee.controller";

export const AddColleague = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [departmentSearchValue, setDepartmentSearchValue] = useState("");
  const [departmentSelectedValue, setDepartmentSelectedValue] = useState("");

  const [positionSearchValue, setPositionSearchValue] = useState("");
  const [positionSelectedValue, setPositionSelectedValue] = useState("");

  const { control, handleSubmit, isSubmitting, setValue, isOpen, setIsOpen } =
    useEmployeeController();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(KeyConstant.COMPANY_NAME, searchValue);
    params.set(KeyConstant.DEPARTMENT_NAME, departmentSearchValue);
    params.set(KeyConstant.POSITION_NAME, positionSearchValue);

    router.push(`?${params.toString()}`);
  }, [searchValue, departmentSearchValue, positionSearchValue]);

  useEffect(() => {
    setValue("currentCompanyId", selectedValue);
    setValue("currentCompanyName", searchValue);
    setValue("currentDepartment", departmentSearchValue);
    setValue("currentDepartmentId", departmentSelectedValue);
    setValue("currentPosition", positionSearchValue);
    setValue("currentPositionId", positionSelectedValue);
  }, [
    selectedValue,
    searchValue,
    departmentSearchValue,
    departmentSelectedValue,
    positionSearchValue,
    positionSelectedValue,
    setValue,
  ]);

  const {
    company,
    isLoading,
    department,
    departmentLoading,
    position,
    positionLoading,
  } = useRegisterController();

  const companyData = company?.response
    .map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    })
    .concat({
      label: searchValue,
      value: "",
    });

  const departmentData = department?.response
    .map((item) => {
      return {
        label: item.title,
        value: item.id,
      };
    })
    .concat({
      label: departmentSearchValue,
      value: "",
    });

  const positionData = position?.response
    .map((item) => {
      return {
        label: item.title,
        value: item.id,
      };
    })
    .concat({
      label: positionSearchValue,
      value: "",
    });

  return (
    <div className="bg-white p-5 space-y-4 rounded-md">
      <h1 className="md:text-xl lg:text-3xl font-semibold text-center mt-3">
        Don’t see <br /> your Colleague?
      </h1>
      <MyButton onClick={() => setIsOpen(true)} className="w-full">
        Add New
      </MyButton>

      {isOpen && (
        <MyModal modalFn={setIsOpen} variant="large">
          <h3 className="capitalize font-bold text-xl text-center mb-8">
            Add your colleague
          </h3>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4 items-center">
              <MyInputWithRHF
                control={control}
                name="firstName"
                placeholder="First name"
              />
              <MyInputWithRHF
                control={control}
                name="lastName"
                placeholder="Last name"
              />
            </div>
            <MyInputWithRHF
              control={control}
              name="linkedInUrl"
              placeholder="Linkedin URL"
            />
            <div className="grid grid-cols-2 gap-4 items-center">
              <AutoCompleteInput
                selectedValue={selectedValue}
                onSelectedValueChange={setSelectedValue}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
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

            <MyButton
              onClick={() => {
                handleSubmit();
              }}
              loading={isSubmitting}
              className="w-full"
            >
              Send
            </MyButton>
          </div>
        </MyModal>
      )}
    </div>
  );
};
