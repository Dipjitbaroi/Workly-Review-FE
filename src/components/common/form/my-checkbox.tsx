import { RuleType } from "@/types/form.type";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import MyErrorInfo from "../my-error-info";
import { MyLabel } from "../my-label";

export interface IMyCheckBox {
  name: string;
  checked: boolean;
  onChange: (ck: boolean) => void;
  content: React.ReactNode;
  error?: string;
  myRef?: React.LegacyRef<HTMLInputElement>;
}

export default function MyCheckBox({
  name,
  content,
  checked,
  onChange,
  error,
  myRef,
  ...props
}: IMyCheckBox) {
  return (
    <>
      <div>
        <div className="flex items-center">
          <input
            ref={myRef}
            {...props}
            id={name}
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            className="accent-primary-600 text-white w-4 h-4 mr-1 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 mb-1"
          />
          <MyLabel htmlFor={name} label={content} />
        </div>
        {error && <MyErrorInfo message={error} />}
      </div>
    </>
  );
}

interface IMyCheckBoxWithRHF<T extends FieldValues>
  extends Omit<IMyCheckBox, "mRef" | "checked" | "onChange"> {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType;
}

export function MyCheckBoxWithRHF<T extends FieldValues>({
  content,
  name,
  control,
  rules,
}: IMyCheckBoxWithRHF<T>) {
  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rules={rules as any}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        return (
          <MyCheckBox
            name={name}
            content={content}
            myRef={ref}
            checked={value || false}
            onChange={onChange}
            error={error?.message}
          />
        );
      }}
    />
  );
}
