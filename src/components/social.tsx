"use client";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { ISocial } from "@/services/profile/profile.dto";
import Image from "next/image";
import Link from "next/link";
import MyButton from "./common/form/my-button";

export const SocialLink = ({ data }: { data?: ISocial }) => {
  return (
    <div className="flex items-center justify-center md:justify-normal gap-4">
      {data?.linkedInUrl && (
        <Link href={data.linkedInUrl} target="_blank">
          <MyButton
            variant={"outline"}
            onClick={() => {}}
            className="py-2 px-5 h-fit"
          >
            <Image
              src={STATIC_IMG.linkedInWhite}
              alt="linkedin-icon"
              loading="lazy"
              className="object-cover w-6 h-6 rounded-md"
            />
          </MyButton>
        </Link>
      )}
      {data?.fbUrl && (
        <Link href={data.fbUrl} target="_blank">
          <MyButton
            variant={"outline"}
            onClick={() => {}}
            className="py-2 px-5 h-fit"
          >
            <Image
              src={STATIC_IMG.facebookDark}
              alt="linkedin-icon"
              loading="lazy"
              className="object-cover w-6 h-6 rounded-md"
            />
          </MyButton>
        </Link>
      )}
    </div>
  );
};
