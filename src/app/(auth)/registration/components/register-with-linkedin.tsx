import { AutoCompleteInput } from "@/components/common/form/autocomplete-input";
import MyButton from "@/components/common/form/my-button";
import { MyCheckBoxWithRHF } from "@/components/common/form/my-checkbox";
import { MyInputWithRHF } from "@/components/common/form/my-input";
import { TermsCondition } from "@/components/common/terms-condition";
import { KeyConstant } from "@/constants/key.constant";
import { useUserStore } from "@/hooks/user.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRegisterController } from "../register.controller";

export const RegisterWithLinkedIn = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [departmentSearchValue, setDepartmentSearchValue] = useState("");
  const [departmentSelectedValue, setDepartmentSelectedValue] = useState("");

  const [positionSearchValue, setPositionSearchValue] = useState("");
  const [positionSelectedValue, setPositionSelectedValue] = useState("");
  const [terms, setTerms] = useState(false);
  const user = useUserStore((s) => s.user);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    company,
    isLoading,
    department,
    departmentLoading,
    position,
    positionLoading,
    lnControl,
    lnHandleSubmit,
    lnIsSubmitting,
    lnSetValue,
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
    lnSetValue("firstName", user?.firstName || "");
    lnSetValue("lastName", user?.lastName || "");
    lnSetValue("email", user?.email || "");
    lnSetValue("currentCompanyId", selectedValue);
    lnSetValue("currentCompanyName", searchValue);
    lnSetValue("currentDepartment", departmentSearchValue);
    lnSetValue("currentDepartmentId", departmentSelectedValue);
    lnSetValue("currentPosition", positionSearchValue);
    lnSetValue("currentPositionId", positionSelectedValue);
  }, [
    selectedValue,
    searchValue,
    departmentSearchValue,
    departmentSelectedValue,
    positionSearchValue,
    positionSelectedValue,
    lnSetValue,
    user,
  ]);
  return (
    <div>
      <div className="space-y-2">
        <MyInputWithRHF
          control={lnControl}
          name="firstName"
          placeholder="First name"
        />
        <MyInputWithRHF
          control={lnControl}
          name="lastName"
          placeholder="Last name"
        />
        <MyInputWithRHF control={lnControl} name="email" placeholder="Email" />
        <MyInputWithRHF
          control={lnControl}
          name="linkedInUrl"
          placeholder="Linkedin URL"
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
          control={lnControl}
          name="startedAt"
          placeholder="Started at"
        />

        <MyCheckBoxWithRHF
          control={lnControl}
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
            lnHandleSubmit();
          }}
          loading={lnIsSubmitting}
          className="w-full"
        >
          All Done
        </MyButton>
      </div>

      {terms && <TermsCondition setTerms={setTerms} />}
    </div>
  );
};
