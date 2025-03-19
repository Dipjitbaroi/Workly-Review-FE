"use client";

import { RuleType } from "@/types/form.type";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "../../ui/input";
import ErrorInfo from "../error-info";

type TypeInputAndTextArea = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface IMyInput extends TypeInputAndTextArea {
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myRef?: any;
  isTextArea?: boolean;
  hideLabel?: boolean;
}

export default function MyInput({
  myRef,
  error,
  hideLabel = false,
  isTextArea = false,
  className,
  ...others
}: IMyInput) {
  return (
    <div
      className={`flex flex-col text-slate-600 dark:text-slate-400 ${className}`}
    >
      {others.placeholder && !hideLabel && (
        <label
          htmlFor={others.name}
          className="cursor-pointer mb-1 text-sm text-slate-600 dark:text-slate-400"
        >
          {others.placeholder}
        </label>
      )}
      {isTextArea ? (
        <textarea
          id={others.name}
          rows={4}
          ref={myRef}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(others as any)}
          //focus:ring-2 focus:ring-primary-light
          className={`flex w-full rounded-md border  border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300  ${
            error ? "ring-2 ring-red-600/80" : ""
          }`}
        ></textarea>
      ) : (
        <>
          <Input
            ref={myRef}
            id={others.name}
            placeholder={others.placeholder}
            {...others}
            className={`${
              error ? "ring-2 ring-red-600/80 ring-offset-2" : ""
            } ${className}`}
          />
        </>
      )}

      {error && <ErrorInfo message={error} />}
    </div>
  );
}

interface IMyInputWithRHF<T extends FieldValues>
  extends Omit<IMyInput, "mRef"> {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType;
}

export function MyInputWithRHF<T extends FieldValues>({
  name,
  control,
  hideLabel,
  rules,
  ...others
}: IMyInputWithRHF<T>) {
  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rules={rules as any}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => {
        let updatedValue = value ? value + "".toString() : "";
        if (others.type === "number") {
          updatedValue = value ? (value as number).toString() : ""; //  use z.number() in zod
        } else if (others.type === "date") {
          updatedValue = value
            ? (value as Date).toISOString().split("T")[0]
            : ""; // Format as "YYYY-MM-DD" use z.date() in zod
        }

        return (
          <MyInput
            name={name}
            myRef={ref}
            value={updatedValue}
            onChange={(e) => {
              if (others.type === "number") {
                onChange(e.target.valueAsNumber);
              } else if (others.type === "date") {
                onChange(e.target.valueAsDate);
              } else {
                onChange(e);
              }
            }}
            onBlur={onBlur}
            error={error?.message}
            hideLabel={hideLabel}
            {...others}
          />
        );
      }}
    />
  );
}
