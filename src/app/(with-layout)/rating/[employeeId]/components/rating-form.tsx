"use client";

import { useRegisterController } from "@/app/(auth)/registration/register.controller";
import { useEmployeeController } from "@/app/(with-layout)/employee/employee.controller";
import { AutoCompleteInput } from "@/components/common/form/autocomplete-input";
import MyButton from "@/components/common/form/my-button";
import { MyInputWithRHF } from "@/components/common/form/my-input";
import { MyStarRatingInputWithRHF } from "@/components/common/form/my-star-rating-input";
import MyErrorInfo from "@/components/common/my-error-info";
import MySpacer from "@/components/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { CheckCircle2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRatingController } from "../rating.controller";

const RatingForm = () => {
  const [companySearchValue, setCompanySearchValue] = useState("");
  const [selectedCompanyValue, setSelectedCompanyValue] = useState("");
  const [workRelation, setWorkRelation] = useState<"peer" | "supervisor">();
  const [recommend, setRecommend] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const params = useParams<{ employeeId: string }>();
  const router = useRouter();

  const { singleEmployee } = useEmployeeController();
  const { company, isLoading } = useRegisterController();
  const { control, handleSubmit, isSubmitting, setValue, errors } =
    useRatingController();

  const currentCompany = singleEmployee?.employee?.companies.find(
    (company) => company.endAt === null
  );

  const companyData = company?.response.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (companySearchValue) {
      params.set(KeyConstant.COMPANY_NAME, companySearchValue);
    } else {
      params.delete(KeyConstant.COMPANY_NAME);
    }

    router.push(`?${params.toString()}`);
  }, [companySearchValue]);

  useEffect(() => {
    setValue("employeeId", params.employeeId);
    setValue("workedTogetherCompanyId", selectedCompanyValue);

    if (workRelation) {
      setValue("workRelation", workRelation);
      setValue("recommend", recommend);
    }
  }, [selectedCompanyValue, setValue, workRelation, recommend]);
  return (
    <div className="lg:grid grid-cols-3">
      <div className="lg:col-span-2">
        <div>
          <span className="text-sm text-gray-700">Rate</span>
          <h1 className="font-bold text-2xl">
            {singleEmployee?.employee.firstName}{" "}
            {singleEmployee?.employee.lastName}
          </h1>
          <p className="text-sm">
            <span className="font-semibold ">
              {currentCompany?.position.title}
            </span>{" "}
            at{" "}
            <span className="font-semibold ">
              {currentCompany?.company.name}
            </span>
          </p>
        </div>

        <MySpacer className="h-10" />
        <div>
          <div className="space-y-5">
            <h3 className="text-lg font-semibold underline">Questions</h3>
            <div className="bg-white p-4 rounded-md space-y-2">
              <h3 className="md:text-lg font-semibold">
                Q1. Define Work Relationship *
              </h3>
              <div className="flex items-center gap-4">
                <MyButton
                  variant={workRelation === "peer" ? "default" : "secondary"}
                  onClick={() => {
                    setWorkRelation("peer");
                  }}
                  className="w-fit px-3 h-fit py-0.5"
                >
                  Peer
                </MyButton>
                <MyButton
                  variant={
                    workRelation === "supervisor" ? "default" : "secondary"
                  }
                  onClick={() => {
                    setWorkRelation("supervisor");
                  }}
                  className="w-fit px-3 h-fit py-0.5"
                >
                  Supervisor
                </MyButton>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md space-y-2">
              <h3 className="md:text-lg font-semibold">
                Q2. Company Worked Together *
              </h3>

              <AutoCompleteInput
                selectedValue={selectedCompanyValue}
                onSelectedValueChange={setSelectedCompanyValue}
                searchValue={companySearchValue}
                onSearchValueChange={setCompanySearchValue}
                items={companyData ?? []}
                // Optional props
                isLoading={isLoading}
                emptyMessage="No company found."
                placeholder="Quick search for a company"
                hideLabel
              />
              {errors.workedTogetherCompanyId && (
                <MyErrorInfo message={errors.workedTogetherCompanyId.message} />
              )}
            </div>

            <div className="bg-white p-4 rounded-md space-y-2">
              <h3 className="md:text-lg font-semibold">
                Q3. Would You Recommend working with this person *
              </h3>
              <div className="flex items-center gap-4">
                <MyButton
                  variant={recommend ? "default" : "secondary"}
                  onClick={() => {
                    setRecommend(true);
                  }}
                  className="w-fit px-3 h-fit py-0.5"
                >
                  Yes
                </MyButton>
                <MyButton
                  variant={!recommend ? "default" : "secondary"}
                  onClick={() => {
                    setRecommend(false);
                  }}
                  className="w-fit px-3 h-fit py-0.5"
                >
                  No
                </MyButton>
              </div>
            </div>
            {workRelation === "peer" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q4. Communication *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="peerCommunication"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q5. Technical Skills *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="peerTechnicalSkills"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q6. Accountability *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="peerAccountability"
                  />
                </div>

                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q7. Problem-Solving *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="peerProblemSolving"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q8. Adaptability *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="peerAdaptability"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q9. Professionalism *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="peerProfessionalism"
                  />
                </div>
              </div>
            )}
            {workRelation === "supervisor" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q4. Employee Development *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="supEmployeeDevelopment"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q5. Communication *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="supCommunication"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q6. Transparency *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="supTransparency"
                  />
                </div>

                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q7. Knowledge *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="supKnowledge"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q8. Leadership *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="supLeaderShip"
                  />
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                  <h3 className="text-xs md:text-lg font-semibold">
                    Q9. Fairness *
                  </h3>
                  <MyStarRatingInputWithRHF
                    control={control}
                    name="supFairness"
                  />
                </div>
              </div>
            )}

            <div className="bg-white p-4 rounded-md space-y-5">
              <h3 className="text-xs md:text-lg font-semibold">
                Write a review *
              </h3>
              <p className="text-xs text-gray-500">
                Discuss the professor&apos;s professional abilities including
                teaching style and ability to convey the material clearly
              </p>

              <div className="bg-gray-100 p-3 rounded-md space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <CheckCircle2 size={18} />
                  <h3>Guidelines</h3>
                </div>
                <p className="text-xs text-gray-900">
                  Aww yeah, you successfully read this important alert message.
                  This example text is going to run a bit longer so that you can
                  see how spacing within an alert works with this kind of
                  content.
                </p>
              </div>
              <MyInputWithRHF
                control={control}
                name="review"
                placeholder="Write text here..."
                isTextArea
                hideLabel
              />
            </div>

            <div className="bg-white p-4 rounded-md space-y-5 text-center">
              <p className="text-xs text-gray-900">
                By clicking the &quot;Submit&quot; button, I acknowledge that I
                have read and agreed to the Meet My Colleague{" "}
                <span className="text-blue-500 underline">
                  Site Guidelines, Terms of Use,
                </span>{" "}
                and{" "}
                <span className="text-blue-500 underline">Privacy Policy.</span>{" "}
                Submitted data becomes the property of Meet My Colleague.
              </p>

              <MyButton onClick={() => handleSubmit()} loading={isSubmitting}>
                Submit Now
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
