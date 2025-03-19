"use client";

import { RuleType } from "@/types/form.type";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import ErrorInfo from "../error-info";
import { StarRating } from "../rating";

interface IMyStarRatingWithRHF<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType;
}

export function MyStarRatingInputWithRHF<T extends FieldValues>({
  name,
  control,
  rules,
}: IMyStarRatingWithRHF<T>) {
  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rules={rules as any}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <>
            <StarRating initialRating={value} onRate={onChange} />
            {error && <ErrorInfo message={error.message} />}
          </>
        );
      }}
    />
  );
}
