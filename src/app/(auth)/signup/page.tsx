"use client";

import MyButton from "@/components/common/form/my-button";
import { MyLinkButton } from "@/components/common/my-link-button";
import MySpacer from "@/components/common/my-spacer";
import { StatusCode } from "@/constants/code.constant";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { AuthService } from "@/services/auth/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

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
        <div className="lg:w-1/2 mx-auto">
          <h2 className="text-xl md:text-3xl font-bold text-center lg:text-left">
            Hello, There 👋
          </h2>
          <p className="py-5 text-gray-500 text-sm md:text-base text-center lg:text-left">
            Today is a new day. It&apos;s your day. You shape it. <br />
            Sign in to start rating today.
          </p>

          <MySpacer className="h-6" />
          <div className="space-y-4">
            <MyButton
              title="Sign up with Linked In"
              startIcon={
                <Image src={STATIC_IMG.linkedInDark} alt="linkedin-icon" />
              }
              onClick={async () => {
                setLoading(true);
                const data = await AuthService.getLinkedInSessionLink();
                if (data.statusCode === StatusCode.OK) {
                  window.location.href = data.response.link;
                }
                setLoading(false);
              }}
              className="w-full bg-black"
              loading={loading}
            >
              Sign up with Linked In
            </MyButton>
            <MyLinkButton
              href={"/registration"}
              className="w-full flex items-center gap-2 justify-center bg-transparent border text-black border-gray-500 hover:bg-gray-200"
            >
              <Image src={STATIC_IMG.mail} alt="email-icon" />
              Sign up with Email
            </MyLinkButton>
          </div>

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
  );
}
