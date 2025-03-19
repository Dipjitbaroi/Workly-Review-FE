"use client";

import MyButton from "@/components/common/form/my-button";
import { MyInputWithRHF } from "@/components/common/form/my-input";
import MySpacer from "@/components/common/my-spacer";
import { StatusCode } from "@/constants/code.constant";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { useUserStore } from "@/hooks/user.store";
import { AuthService } from "@/services/auth/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLoginController } from "../login.controller";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, isSubmitting } = useLoginController();
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user?.id) {
      return router.push("/");
    }
  }, [router, user]);

  return (
    <div className="p-4 md:p-10 flex items-center justify-center h-screen w-full">
      <div className="lg:grid grid-cols-2 items-center">
        <div className="lg:w-1/2 mx-auto">
          <h2 className="text-xl md:text-3xl font-bold text-center lg:text-left">
            Welcome Back 👋
          </h2>
          <p className="py-5 text-gray-500 text-sm md:text-base text-center lg:text-left">
            Today is a new day. It&apos;s your day. You shape it. <br />
            Sign in to start rating today.
          </p>

          <MySpacer className="h-10" />
          <div className="space-y-4">
            <MyInputWithRHF
              control={control}
              name="email"
              placeholder="Enter your email"
              hideLabel
            />
            <MyInputWithRHF
              control={control}
              name="password"
              placeholder="Enter your password"
              hideLabel
            />
            <MyButton
              onClick={() => {
                handleSubmit();
              }}
              loading={isSubmitting}
              className="w-full bg-[#0F2029] hover:bg-black/80"
            >
              Login
            </MyButton>
          </div>

          <div className="flex items-center justify-center gap-1 my-10">
            <div className="h-0.5 bg-gray-300 w-full"></div>
            <span className="text-gray-600">OR</span>
            <div className="h-0.5 bg-gray-300 w-full"></div>
          </div>
          <MyButton
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
            loading={loading}
            className="w-full bg-[#0F2029] hover:bg-black/80"
          >
            Sign in with Linked In
          </MyButton>

          <MySpacer className="h-10" />
          <p className="text-sm text-center">
            Don&apos;t you have an account?{" "}
            <Link href={"/signup"} className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
        </div>
        <div className="h-[calc(100vh-80px)] object-cover hidden lg:block">
          <Image
            src={STATIC_IMG.loginArt}
            alt="login image"
            className="h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
