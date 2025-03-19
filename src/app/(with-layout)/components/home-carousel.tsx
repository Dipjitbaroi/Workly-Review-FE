"use client";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Constant } from "@/constants/common.constant";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Darren Dunlap",
    job: "CEO & Founder at Flex.co",
    avatar: Constant.DEFAULT_AVATAR,
    content:
      "The best solution for anyone who wants to work a flexible schedule but still earn a full-time income.",
  },
  {
    id: 2,
    name: "Sofia Carter",
    job: "CEO & Founder",
    avatar: Constant.DEFAULT_AVATAR,
    content:
      "The best solution for anyone who wants to work a flexible schedule but still earn a full-time income.",
  },
];
export function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div className="bg-[#2A3342] rounded-xl mt-20">
      <Carousel
        plugins={[plugin.current]}
        className="w-2/3 mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {reviews.map((item) => (
            <CarouselItem key={item.id}>
              <div className="py-10 md:py-16 md:px-14 grid md:grid-cols-6 gap-4">
                <div className="md:col-span-3">
                  <div className="flex items-center justify-center md:justify-normal gap-5">
                    <div>
                      <Image
                        src={item.avatar}
                        alt="avatar"
                        width={70}
                        height={70}
                      />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-white">{item.name}</h2>
                      <p className="text-gray-400 text-sm">{item.job}</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="flex items-center h-full bg-[url('/img/quote.svg')] bg-no-repeat bg-cover bg-right-bottom">
                    <p className="text-white text-center md:text-left ">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#344052] border-none text-[#D5DAE1]" />
        <CarouselNext className="bg-[#344052] border-none text-[#D5DAE1]" />
      </Carousel>
    </div>
  );
}
