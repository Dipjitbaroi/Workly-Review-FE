"use client";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { useUserStore } from "@/hooks/user.store";
import Image from "next/image";
import Link from "next/link";
import MyButton from "./form/my-button";
import { MyLinkButton } from "./my-link-button";

export const Footer = () => {
  const user = useUserStore((s) => s.user);
  return (
    <>
      <div className="bg-[#EBEBEB] py-8">
        <div className="space-y-4">
          <h1 className="font-bold text-base md:text-2xl text-center capitalize">
            Start Your Search
          </h1>
          <p className="text-gray-500 text-center text-sm">
            Need to know about your future colleague? See what millions of
            people are saying about their colleague today.
          </p>

          {user ? (
            <MyLinkButton href="/employee" className="mx-auto">
              Search
            </MyLinkButton>
          ) : (
            <MyLinkButton href="/signup" className="mx-auto">
              Sign Up Now
            </MyLinkButton>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto md:px-0 px-6">
          <div className="grid lg:grid-cols-5 gap-10 py-12">
            <div className="lg:col-span-2">
              <Link href={"/"}>
                <div className="flex gap-1 items-center">
                  <Image src={STATIC_IMG.logo} alt="logo" />
                  <h1 className="font-bold text-base md:text-2xl capitalize">
                    Meet My Colleague
                  </h1>
                </div>
              </Link>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <h1 className="font-bold text-base md:text-lg capitalize mb-2">
                    Meet My Colleague
                  </h1>
                  <ul className="space-y-2 text-[#556987]">
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Help
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Guides
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h1 className="font-bold text-base md:text-lg capitalize mb-2">
                    Policy
                  </h1>
                  <ul className="space-y-2 text-[#556987]">
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Copyright Policy
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Site Guidelines
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Updates
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h1 className="font-bold text-base md:text-lg capitalize mb-2">
                    Work With Us
                  </h1>
                  <ul className="space-y-2 text-[#556987]">
                    <li>
                      <Link href={"/"} className="hover:underline">
                        CA Notice at Collection
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        CA Do not sell
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        CA do not share Personal Information
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Advertisers
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} className="hover:underline">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t py-5 text-center border-black">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <Link href={"/"} target="_blank">
              <MyButton
                variant={"outline"}
                onClick={() => {}}
                className="py-2 px-4 h-fit border-black"
              >
                <Image
                  src={STATIC_IMG.facebookDark}
                  alt="linkedin-icon"
                  loading="lazy"
                  className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
                />
              </MyButton>
            </Link>
            <Link href={"/"} target="_blank">
              <MyButton
                variant={"outline"}
                onClick={() => {}}
                className="py-2 px-4 h-fit border-black"
              >
                <Image
                  src={STATIC_IMG.instagram}
                  alt="linkedin-icon"
                  loading="lazy"
                  className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
                />
              </MyButton>
            </Link>
            <Link href={"/"} target="_blank">
              <MyButton
                variant={"outline"}
                onClick={() => {}}
                className="py-2 px-4 h-fit border-black"
              >
                <Image
                  src={STATIC_IMG.linkedInWhite}
                  alt="linkedin-icon"
                  loading="lazy"
                  className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
                />
              </MyButton>
            </Link>
            <Link href={"/"} target="_blank">
              <MyButton
                variant={"outline"}
                onClick={() => {}}
                className="py-2 px-4 h-fit border-black"
              >
                <Image
                  src={STATIC_IMG.tiktok}
                  alt="linkedin-icon"
                  loading="lazy"
                  className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
                />
              </MyButton>
            </Link>
            <Link href={"/"} target="_blank">
              <MyButton
                variant={"outline"}
                onClick={() => {}}
                className="py-2 px-4 h-fit border-black"
              >
                <Image
                  src={STATIC_IMG.youtubeDark}
                  alt="linkedin-icon"
                  loading="lazy"
                  className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
                />
              </MyButton>
            </Link>
            <Link href={"/"} target="_blank">
              <MyButton
                variant={"outline"}
                onClick={() => {}}
                className="py-2 px-4 h-fit border-black"
              >
                <Image
                  src={STATIC_IMG.twitter}
                  alt="linkedin-icon"
                  loading="lazy"
                  className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
                />
              </MyButton>
            </Link>
          </div>
          <p className="text-gray-500 pt-3 text-xs">
            © 2024 Meet my colleague. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
