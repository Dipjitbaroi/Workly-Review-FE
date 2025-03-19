"use client";
import { useProfileController } from "@/app/(with-layout)/u/[userId]/profile.controller";
import MyButton from "@/components/common/form/my-button";
import { MyLinkButton } from "@/components/common/my-link-button";
import MySpacer from "@/components/common/my-spacer";
import { SocialLink } from "@/components/social";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { ArrowRight, Bookmark, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEmployeeController } from "../../employee.controller";

export const UserInfo = () => {
  const params = useParams();
  const { singleEmployee } = useEmployeeController();
  const { isEmployeeSaving, saveEmployeeOnSubmit } = useProfileController();

  const employee = singleEmployee?.employee;
  const worksAt = employee?.companies.find((item) => item.endAt === null);
  const workedAt = employee?.companies?.find((item) => item.endAt !== null);

  // if (isSingleEmployeeLoading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (!singleEmployee) {
  //   return notFound();
  // }
  return (
    <>
      <div className=" bg-white p-4 rounded-md col-span-2">
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <div className="flex gap-4 items-center">
              <div className="w-32 h-32 ">
                <Image
                  src={employee?.avatar || STATIC_IMG.avatar}
                  alt="avatar"
                  className="object-cover w-32 h-32 rounded-md"
                  loading="lazy"
                  height={100}
                  width={100}
                />
              </div>
              <div className=" md:hidden">
                <div className="flex items-center gap-3">
                  <h1 className="font-bold text-2xl">
                    {employee?.firstName} {employee?.lastName}
                  </h1>
                  <MyButton
                    variant={"ghost"}
                    onClick={() => {
                      saveEmployeeOnSubmit(
                        singleEmployee?.employee.id as string
                      );
                    }}
                    className="h-fit  p-1"
                    disabled={isEmployeeSaving}
                  >
                    {isEmployeeSaving ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Bookmark size={22} />
                    )}
                  </MyButton>
                </div>
                <div>
                  <p className="text-sm">
                    Works at{" "}
                    <span className="font-semibold underline">
                      {worksAt?.company.name}
                    </span>{" "}
                    as{" "}
                    <span className="font-semibold underline">
                      {worksAt?.position.title}
                    </span>
                  </p>

                  {workedAt && (
                    <p className="text-sm">
                      worked at{" "}
                      <span className="font-semibold underline">
                        {workedAt?.company.name}
                      </span>{" "}
                      as{" "}
                      <span className="font-semibold underline">
                        {workedAt?.position.title}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <MySpacer className="h-6" />
            <div className="">
              <MyLinkButton
                href={`/rating/${params?.employeeId}`}
                className="flex items-center justify-center  gap-2 text-xs w-full"
              >
                Rate Now <ArrowRight size={18} />
              </MyLinkButton>
            </div>
          </div>

          <div className="text-center md:text-left md:space-y-2 w-full ">
            <div className="hidden md:block">
              <div className="flex items-center gap-3">
                <h1 className="font-bold text-2xl">
                  {" "}
                  {employee?.firstName} {employee?.lastName}
                </h1>
                <MyButton
                  variant={"ghost"}
                  onClick={() => {
                    saveEmployeeOnSubmit(singleEmployee?.employee.id as string);
                  }}
                  className="h-fit  p-1"
                  disabled={isEmployeeSaving}
                >
                  {isEmployeeSaving ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Bookmark size={22} />
                  )}
                </MyButton>
              </div>
              <div>
                <p className="text-sm">
                  Works at{" "}
                  <span className="font-semibold underline">
                    {worksAt?.company.name}
                  </span>{" "}
                  as{" "}
                  <span className="font-semibold underline">
                    {worksAt?.position.title}
                  </span>
                </p>

                {workedAt && (
                  <p className="text-sm">
                    worked at{" "}
                    <span className="font-semibold underline">
                      {workedAt?.company.name}
                    </span>{" "}
                    as{" "}
                    <span className="font-semibold underline">
                      {workedAt?.position.title}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-center md:justify-end w-full md:py-4">
              <div className="bg-gray-700 w-full md:w-fit py-3 px-5 rounded-lg">
                <p className="text-2xl font-bold text-white text-center">
                  {singleEmployee?.averageRating.supRecommend || 0}%
                </p>
                <p className="text-xs text-white text-center">
                  Would work again <br />
                  <span className="font-semibold">As Supervisor</span>
                </p>
              </div>
              <div className="bg-gray-700 w-full md:w-fit py-3 px-5 rounded-lg">
                <p className="text-2xl font-bold text-white text-center">
                  {singleEmployee?.averageRating.peerRecommend || 0}%
                </p>
                <p className="text-xs text-white text-center">
                  Would work again <br />
                  <span className="font-semibold">As Peer</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex gap-4 items-end my-6">
        <h4 className="font-semibold text-center md:text-left pb-2 md:pb-0">
          Visit Socials:
        </h4>
        <SocialLink data={employee?.social} />
      </div>
    </>
  );
};
