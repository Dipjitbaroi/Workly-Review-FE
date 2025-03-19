"use client";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { useUserStore } from "@/hooks/user.store";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MyLinkButton } from "./my-link-button";

export const MyHeader = () => {
  const user = useUserStore((s) => s.user);

  return (
    <div className="bg-white mb-2">
      <div className="container mx-auto flex justify-between py-4 px-2">
        <Link href={"/"}>
          <div className="flex gap-1 items-center">
            <Image src={STATIC_IMG.logo} alt="logo" />
            <h1 className="font-bold text-base md:text-2xl capitalize">
              Meet My Colleague
            </h1>
          </div>
        </Link>

        {!user ? (
          <div className="flex gap-2 items-center">
            <MyLinkButton
              href="/login"
              className="bg-transparent text-gray-600 hover:bg-gray-100"
            >
              Log In
            </MyLinkButton>
            <MyLinkButton href="/signup">Sign Up</MyLinkButton>
          </div>
        ) : (
          <MyLinkButton
            href={`/u/${user?.id}`}
            className="bg-transparent hover:bg-gray-50"
          >
            <CircleUser className="text-black" size={30} />
          </MyLinkButton>
        )}
      </div>
    </div>
  );
};
