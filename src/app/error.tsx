"use client";

import MyButton from "@/components/common/form/my-button";
import MySpacer from "@/components/common/my-spacer";

export default function MainError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container grid place-content-center py-5 md:py-10">
      <p>{error.message}</p>
      <MySpacer />
      <MyButton onClick={reset}>Try again</MyButton>
    </div>
  );
}
