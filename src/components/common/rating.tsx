"use client";
import { STATIC_IMG } from "@/constants/static-image.constant";
import Image from "next/image";
import { useState } from "react";

export const StarRating = ({
  onRate,
  initialRating = 0,
  isReadOnly = false,
}: {
  onRate?: (rate: number) => void;
  initialRating?: number;
  isReadOnly?: boolean;
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (rate: number) => {
    if (!isReadOnly) {
      setRating(rate);
      if (onRate) onRate(rate);
    }
  };

  return (
    <div
      className={`flex gap-1 ${
        isReadOnly ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {[...Array(5)].map((_, index) => {
        const rate = index + 1;
        return (
          <div
            key={rate}
            onClick={() => handleClick(rate)}
            onMouseEnter={() => !isReadOnly && setHover(rate)}
            onMouseLeave={() => !isReadOnly && setHover(0)}
          >
            <Image
              src={
                rate <= (hover || rating)
                  ? STATIC_IMG.starYellow
                  : STATIC_IMG.starGray
              }
              alt={rate <= (hover || rating) ? "Filled Star" : "Empty Star"}
              width={24}
              height={24}
            />
          </div>
        );
      })}
    </div>
  );
};
