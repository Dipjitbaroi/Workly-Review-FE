"use client";
import MySpacer from "@/components/common/my-spacer";
import { SocialLink } from "@/components/social";
import { STATIC_IMG } from "@/constants/static-image.constant";
import Image from "next/image";
import { useProfileController } from "../profile.controller";
import { UserEditForm } from "./user-edit-form";

export const UserInfo = () => {
  const { profile, isProfileLoading } = useProfileController();
  const currentCompany = profile?.companies.find(
    (company) => company.endAt === null
  );
  const prevCompany = profile?.companies.filter(
    (company) => company.endAt !== null
  )[0];

  if (isProfileLoading) {
    return <div className="bg-gray-200 h-72 animate-pulse rounded-md"></div>;
  }
  return (
    <div className=" bg-white p-4 rounded-md col-span-2">
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <div className="flex gap-4 items-center">
            <div className="w-32 h-32 ">
              <Image
                src={profile?.avatar || STATIC_IMG.avatar}
                alt="avatar"
                className="object-cover w-32 h-32 rounded-md"
                loading="lazy"
                height={100}
                width={100}
              />
            </div>
            {/* MOBILE  */}
            <div className=" md:hidden">
              <div className="flex items-center gap-3">
                <h1 className="font-bold text-2xl">
                  {profile?.firstName} {profile?.lastName}
                </h1>
              </div>
              <div>
                <p className="text-sm">
                  Works at{" "}
                  <span className="font-semibold underline">
                    {currentCompany?.company.name}
                  </span>{" "}
                  as{" "}
                  <span className="font-semibold underline">
                    {currentCompany?.position.title}
                  </span>
                </p>

                {prevCompany?.id && (
                  <p className="text-sm">
                    worked at{" "}
                    <span className="font-semibold underline">
                      {prevCompany.company.name}
                    </span>{" "}
                    as{" "}
                    <span className="font-semibold underline">
                      {prevCompany.position.title}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP  */}
        <div className="md:text-left md:space-y-2 w-full ">
          <div className="hidden md:block">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-2xl">
                {profile?.firstName} {profile?.lastName}
              </h1>
            </div>
            <div>
              <p className="text-sm">
                Works at{" "}
                <span className="font-semibold underline">
                  {currentCompany?.company.name}
                </span>{" "}
                as{" "}
                <span className="font-semibold underline">
                  {currentCompany?.position.title}
                </span>
              </p>

              {prevCompany?.id && (
                <p className="text-sm">
                  worked at{" "}
                  <span className="font-semibold underline">
                    {prevCompany?.company.name}
                  </span>{" "}
                  as{" "}
                  <span className="font-semibold underline">
                    {prevCompany?.position.title}
                  </span>
                </p>
              )}
            </div>
          </div>

          <MySpacer className="h-3" />
          <SocialLink data={profile?.social} />

          <div>
            <UserEditForm />
          </div>
        </div>
      </div>
    </div>
  );
};
