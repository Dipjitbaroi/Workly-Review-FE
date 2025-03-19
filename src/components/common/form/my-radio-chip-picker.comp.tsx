import { RuleType } from "@/types/form.type";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import ErrorInfo from "../error-info";
import MySpacer from "../my-spacer";

interface IMyRadioChipPickerWithRHF<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType;
  options: { label: string; value: string }[];
  hideLabe?: boolean;
}

export function MyRadioChipPickerWithRHF<T extends FieldValues>({
  label,
  name,
  options,
  control,
  rules,
  hideLabe = false,
}: IMyRadioChipPickerWithRHF<T>) {
  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rules={rules as any}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        return (
          <>
            {!hideLabe && (
              <label
                htmlFor={name}
                className="cursor-pointer mb-1 text-sm text-slate-600 dark:text-slate-400"
              >
                {label}
              </label>
            )}
            <MySpacer />
            <div className="">
              <RadioGroup
                ref={ref}
                onValueChange={onChange}
                value={value}
                className="flex flex-wrap gap-2"
              >
                {options.map((item) => {
                  return (
                    <div
                      key={item.value}
                      className="flex flex-row gap-2 items-center"
                    >
                      <RadioGroupItem
                        id={item.value}
                        value={item.value}
                        className="sr-only"
                      />
                      <label
                        htmlFor={item.value}
                        className={
                          value === item.value
                            ? "bg-blue-500 text-white px-4 py-0.5 rounded-md cursor-pointer select-none text-sm"
                            : "bg-gray-200 text-black px-4 py-0.5 rounded-md cursor-pointer select-none tex-sm"
                        }
                      >
                        {item.label}
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            {error && <ErrorInfo message={error.message} />}
          </>
        );
      }}
    />
  );
}
