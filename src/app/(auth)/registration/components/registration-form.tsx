"use client";

import { AutoCompleteInput } from "@/components/common/form/autocomplete-input";
import MyButton from "@/components/common/form/my-button";
import { MyCheckBoxWithRHF } from "@/components/common/form/my-checkbox";
import { MyInputWithRHF } from "@/components/common/form/my-input";
import MySpacer from "@/components/common/my-spacer";
import { TermsCondition } from "@/components/common/terms-condition";
import { KeyConstant } from "@/constants/key.constant";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { useUserStore } from "@/hooks/user.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRegisterController } from "../register.controller";
import { RegisterWithLinkedIn } from "./register-with-linkedin";

export const RegistrationForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [departmentSearchValue, setDepartmentSearchValue] = useState("");
  const [departmentSelectedValue, setDepartmentSelectedValue] = useState("");

  const [positionSearchValue, setPositionSearchValue] = useState("");
  const [positionSelectedValue, setPositionSelectedValue] = useState("");
  const [terms, setTerms] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  const {
    company,
    isLoading,
    department,
    departmentLoading,
    position,
    positionLoading,
    control,
    handleSubmit,
    isSubmitting,
    setValue,
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

  useEffect(() => {
    if (user?.id && user?.linkedInUrl) {
      return router.push("/");
    }
  }, [router, user]);

  return (
    <div className="p-4 md:p-10 flex items-center justify-center h-screen w-full">
      <div className="lg:grid grid-cols-2 items-center">
        <div className="h-[calc(100vh-80px)] object-cover hidden lg:block">
          <Image
            src={STATIC_IMG.signUpArt}
            alt="login image"
            className="h-full object-cover rounded-xl"
          />
        </div>
        <div className="h-screen place-content-center overflow-y-auto py-10 px-2 no-scrollbar w-full">
          <div className="lg:w-1/2 mx-auto">
            <h2 className="text-xl md:text-3xl font-bold text-center lg:text-left">
              Almost There 👋
            </h2>
            <p className="py-5 text-gray-500 text-sm md:text-base text-center lg:text-left">
              Tell us little-bit about you, it will help us to find you more
              easily...
            </p>
            <MySpacer className="h-6" />
            {user?.linkedInId && user.companies.length < 1 ? (
              <RegisterWithLinkedIn />
            ) : (
              <div className="space-y-2">
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
                <MyInputWithRHF
                  control={control}
                  name="email"
                  placeholder="Email"
                />
                <MyInputWithRHF
                  control={control}
                  name="linkedInUrl"
                  placeholder="Linkedin URL"
                />
                <MyInputWithRHF
                  control={control}
                  name="password"
                  placeholder="Enter your password"
                />
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

                <MyInputWithRHF
                  type="date"
                  control={control}
                  name="startedAt"
                  placeholder="Started at"
                />

                <MyCheckBoxWithRHF
                  control={control}
                  name="termsCondition"
                  content={
                    <p>
                      I Agree with{" "}
                      <span
                        onClick={() => setTerms(true)}
                        className="hover:underline text-blue-500"
                      >
                        Terms and Conditions
                      </span>
                    </p>
                  }
                />
                <MyButton
                  onClick={() => {
                    handleSubmit();
                  }}
                  loading={isSubmitting}
                  className="w-full bg-[#0F2029] hover:bg-black/80"
                >
                  All Done
                </MyButton>
              </div>
            )}

            <MySpacer className="h-10" />
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link href={"/login"} className="text-blue-500 underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {terms && <TermsCondition setTerms={setTerms} />}
    </div>
  );
};
