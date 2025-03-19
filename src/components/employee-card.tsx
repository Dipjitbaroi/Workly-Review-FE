"use client";
import { useProfileController } from "@/app/(with-layout)/u/[userId]/profile.controller";
import MyButton from "@/components/common/form/my-button";
import MySpacer from "@/components/common/my-spacer";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { IEmployee } from "@/services/employee/employee.dto";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const EmployeeCard = ({ item }: { item: IEmployee }) => {
  const { isEmployeeSaving, saveEmployeeOnSubmit } = useProfileController();

  const currentCompany = item?.companies.find(
    (company) => company.endAt === null
  );
  const prevCompany = item?.companies.filter(
    (company) => company.endAt !== null
  )[0];
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center bg-white p-4 rounded-md hover:shadow-md">
      <Link key={item.id} href={`/employee/${item.id}`} className="w-full">
        <div
          className="flex flex-col md:flex-row items-center gap-6"
          key={item.id}
        >
          <div className="bg-gray-200 w-40 h-40 ">
            <Image
              src={item.avatar || STATIC_IMG.avatar}
              alt="avatar"
              className="object-cover w-40 h-40 rounded-md"
              loading="lazy"
              height={160}
              width={160}
            />
          </div>

          <div className="md:flex items-center w-full justify-between space-y-5">
            <div className="text-center md:text-left space-y-1">
              <div className="space-y-2">
                <h1 className="font-bold text-xl">
                  {item.firstName} {item.lastName}
                </h1>
                <p>
                  Works at{" "}
                  <span className="font-semibold">
                    {currentCompany?.company.name}
                  </span>{" "}
                  as{" "}
                  <span className="font-semibold">
                    {currentCompany?.position.title}
                  </span>
                </p>
                {prevCompany && (
                  <p>
                    worked at{" "}
                    <span className="font-semibold">
                      {prevCompany.company.name}
                    </span>{" "}
                    as{" "}
                    <span className="font-semibold">
                      {prevCompany.position.title}
                    </span>
                  </p>
                )}
              </div>

              <p>
                <span className="font-semibold">
                  {item.ratings.recommend || 0}%
                </span>{" "}
                Would work again | Known for{" "}
                <span className="font-semibold">{item.ratings.knownFor}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex md:flex-col items-center md:items-end justify-between">
        <div className="">
          <div className="bg-green-500 flex gap-1 w-fit items-center px-4 py-2 rounded-md">
            <span className="text-white font-semibold text-2xl">
              {item.ratings.overallRating}
            </span>{" "}
            <Image src={STATIC_IMG.star} alt="star" className="h-5 w-5" />
          </div>
        </div>
        <p className="text-right">{item.ratings.total} Reviews</p>
        <div className="text-right">
          <MySpacer className="md:h-6" />
          <MyButton
            onClick={() => saveEmployeeOnSubmit(item.id)}
            loading={isEmployeeSaving}
            variant={"ghost"}
            startIcon={<Bookmark />}
            className="bg-gray-100 hover:bg-gray-50"
          >
            Save
          </MyButton>
        </div>
      </div>
    </div>
  );
};
