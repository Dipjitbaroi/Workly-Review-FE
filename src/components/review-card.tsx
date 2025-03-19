"use client";
import { useRatingController } from "@/app/(with-layout)/rating/[employeeId]/rating.controller";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { IRatings } from "@/services/profile/profile.dto";
import { DateUtil } from "@/utils/date.util";
import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  MessageSquareWarning,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyButton from "./common/form/my-button";
import { MyInputWithRHF } from "./common/form/my-input";
import MySpacer from "./common/my-spacer";
import { StarRating } from "./common/rating";

export const ReviewCard = ({ item }: { item: IRatings }) => {
  const [reportModal, setReportModal] = useState(false);
  const {
    appreciateRatingOnSubmit,
    doubtedRatingOnSubmit,
    isAppreciating,
    isDoubting,
    reportControl,
    reportHandleSubmit,
    reportSetValue,
    reportIsSubmitting,
  } = useRatingController();

  const currentCompany = item.reviewer.companies.find(
    (company) => company.endAt === null
  );
  const {
    workRelation,
    supCommunication,
    supEmployeeDevelopment,
    supFairness,
    supKnowledge,
    supLeaderShip,
    supTransparency,
    peerAccountability,
    peerAdaptability,
    peerCommunication,
    peerProblemSolving,
    peerProfessionalism,
    peerTechnicalSkills,
  } = item;

  const totalSup =
    supCommunication +
    supEmployeeDevelopment +
    supFairness +
    supKnowledge +
    supLeaderShip +
    supTransparency;

  const totalPeer =
    peerAccountability +
    peerAdaptability +
    peerCommunication +
    peerProblemSolving +
    peerProfessionalism +
    peerTechnicalSkills;

  const avgRating =
    workRelation === "supervisor"
      ? (totalSup / 6).toFixed(1)
      : (totalPeer / 6).toFixed(1);

  useEffect(() => {
    reportSetValue("ratingId", item.id);
  }, [item.id, reportSetValue]);

  return (
    <div className="bg-white p-4 rounded-md" key={item.id}>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <div className="flex flex-row gap-4">
            <div className="w-20 h-20">
              <Image
                src={item.reviewer.avatar || STATIC_IMG.avatar}
                alt="avatar"
                className="object-cover w-20 h-20 rounded-md"
                loading="lazy"
                width={80}
                height={80}
              />
            </div>
            <div className="md:hidden w-full">
              <div>
                <div className="flex w-full items-center justify-between">
                  <h1 className="font-bold text-2xl hover:underline">
                    {item.reviewer.firstName} {item.reviewer.lastName}
                  </h1>
                  <p className="text-sm font-semibold">
                    {DateUtil.formatOnlyDate(item.createdAt)}
                  </p>
                </div>
                <p className="text-sm font-semibold">{item.workRelation}</p>
              </div>

              <MySpacer />
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
              </div>
            </div>
          </div>
          <MySpacer className="h-3" />

          <div className="bg-green-500 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 py-2">
              <span className="text-white font-semibold text-lg">
                {avgRating}
              </span>{" "}
              <Image src={STATIC_IMG.star} alt="star" className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className=" space-y-2 w-full ">
          <div className="hidden md:block">
            <div>
              <div className="flex w-full items-center justify-between">
                <Link href={`/employee/${item.reviewerId}`}>
                  <h1 className="font-bold text-2xl hover:underline">
                    {item.reviewer.firstName} {item.reviewer.lastName}
                  </h1>
                </Link>
                <p className="text-sm font-semibold">
                  {" "}
                  {DateUtil.formatOnlyDate(item.createdAt)}
                </p>
              </div>
              <p className="text-sm font-semibold capitalize">
                {item.workRelation}
              </p>
            </div>

            <MySpacer />
            <div>
              <p className="text-sm">
                Works at{" "}
                <span className="font-semibold underline">
                  {item.reviewer.companies[0].company.name}
                </span>{" "}
                as{" "}
                <span className="font-semibold underline">
                  {item.reviewer.companies[0].position.title}
                </span>
              </p>
            </div>
          </div>

          <div>
            {item.workRelation === "peer" && (
              <div className="grid grid-cols-2 md:flex flex-wrap gap-4 w-full my-3 md:my-6">
                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.peerCommunication}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.peerCommunication || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Communication
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.peerAccountability}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.peerAccountability || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Accountability
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.peerAdaptability}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.peerAdaptability || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Adaptability
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.peerProblemSolving}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.peerProblemSolving || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Problem Solving
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.peerProfessionalism}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.peerProfessionalism || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Professionalism
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.peerTechnicalSkills}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.peerTechnicalSkills || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Technical Skills
                  </p>
                </div>
              </div>
            )}

            {item.workRelation === "supervisor" && (
              <div className="grid grid-cols-2 md:flex flex-wrap gap-4 w-full my-3 md:my-6">
                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.supCommunication}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.supCommunication || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Communication
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.supEmployeeDevelopment}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.supEmployeeDevelopment || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Employee Development
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.supFairness}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.supFairness || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Fairness
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.supKnowledge}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.supKnowledge || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Knowledge
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.supLeaderShip}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.supLeaderShip || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Leadership
                  </p>
                </div>

                <div className="bg-gray-200 py-3 px-2 md:px-5 rounded-lg space-y-1">
                  <p className="text-lg font-bold  text-center">
                    {item.supTransparency}
                  </p>
                  <div className="w-fit mx-auto">
                    <StarRating
                      initialRating={item.supTransparency || 0}
                      isReadOnly
                    />
                  </div>
                  <p className="text-xs text-gray-600 text-center font-semibold">
                    Transparency
                  </p>
                </div>
              </div>
            )}

            <p className="text-sm font-medium text-gray-500 py-5">
              {item.review}
            </p>

            <div className="flex justify-between items-center">
              <div>
                <MyButton
                  variant={"ghost"}
                  onClick={() => appreciateRatingOnSubmit(item.id)}
                  className="text-gray-500"
                  loading={isAppreciating}
                >
                  <ArrowBigUpDash /> Appreciate ({item.appreciateCount})
                </MyButton>
                <MyButton
                  variant={"ghost"}
                  onClick={() => doubtedRatingOnSubmit(item.id)}
                  loading={isDoubting}
                  className="text-gray-500"
                >
                  <ArrowBigDownDash /> Doubtful ({item.doubtCount})
                </MyButton>
              </div>
              <div>
                <MyButton
                  variant={"ghost"}
                  onClick={() => setReportModal(true)}
                  className="text-gray-500"
                >
                  <MessageSquareWarning />
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {reportModal && (
        <div className="fixed top-0 left-0 flex flex-1 w-full bg-gray-500/50 p-2 md:p-5 lg:p-10 h-screen z-50">
          <div className="bg-gray-50 w-full lg:w-6/12 mx-auto rounded-lg pb-0 relative p-4 h-fit">
            <div>
              <div className="text-right">
                <MyButton
                  onClick={() => {
                    setReportModal(false);
                  }}
                  variant="ghost"
                  className=""
                >
                  <X />
                </MyButton>
              </div>
              <p className="text-xl text-center">
                Report a Rating for{" "}
                <span className="font-bold ">
                  {item.reviewer.firstName} {item.reviewer.lastName}
                </span>
              </p>

              <MySpacer className="h-10" />
              <div className="bg-white p-5 space-y-5">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-sm">You&apos;re reporting</p>
                  <p className="text-xs text-gray-600">
                    Aww yeah, you successfully read this important alert
                    message. This example text is going to run a bit longer so
                    that you can see how spacing within an alert works with this
                    kind of content.
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-sm">
                    What&apos;s the problem?
                  </p>
                  <p className="text-xs text-gray-600">
                    If you think this comment is inconsistent with Meet My
                    Colleague Site Guidelines, report it and tell us why.
                  </p>
                </div>

                <div>
                  <MyInputWithRHF
                    control={reportControl}
                    name="reason"
                    isTextArea
                    placeholder="Tell us whats wrong with this comments ...."
                    hideLabel
                  />
                </div>

                <MyButton
                  onClick={() => reportHandleSubmit()}
                  className="w-full"
                  loading={reportIsSubmitting}
                >
                  Submit Report
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
