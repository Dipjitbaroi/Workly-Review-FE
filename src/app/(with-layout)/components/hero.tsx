"use client";

import MyInput from "@/components/common/form/my-input";
import { MyLinkButton } from "@/components/common/my-link-button";
import MySpacer from "@/components/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { Search } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-[url(/hero-bg.png)] bg-cover py-10 md:py-20 lg:py-28 rounded-3xl">
      <p className="bg-primary-500 px-2 py-0.5 rounded-full text-[10px] md:text-xs w-fit mx-auto text-white">
        Rate Your Colleague
      </p>

      <MySpacer className="h-5" />
      <div className="px-8 md:px-0 md:w-1/2 mx-auto">
        <h1 className="text-white text-lg md:text-3xl lg:text-6xl font-semibold text-center">
          Honest Ratings for Peers and Supervisors
        </h1>

        <MySpacer className="h-4 md:h-8" />
        <p className="text-gray-400 text-center text-xs md:text-lg">
          Gain insights on workplace dynamics through real reviews of peers and
          supervisors. Make informed choices about the teams and leaders you’ll
          work with.
        </p>

        <MySpacer className="h-6" />
        <div className="flex items-center gap-2 justify-between md:justify-center">
          <div className={`bg-white flex items-center rounded-md pl-2`}>
            <Search size={18} />
            <MyInput
              hideLabel
              placeholder="Enter your colleague name"
              className={`bg-transparent ring-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 w-40 md:w-72`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <MyLinkButton
            href={{
              pathname: "/employee",
              query: { [KeyConstant.SEARCH]: [search] },
            }}
            className="text-xs md:text-base w-fit"
          >
            Look Up Now
          </MyLinkButton>
        </div>
      </div>
    </div>
  );
};
