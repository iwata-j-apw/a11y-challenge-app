"use client";

import { forwardRef, useId } from "react";
import { NoA11yError } from "./error";

interface Option {
  value: string | number;
  label: string;
}

interface NoA11ySelectProps extends React.ComponentPropsWithoutRef<"select"> {
  options: Option[];
  label?: string;
  errorText?: string;
}

export const NoA11ySelect = forwardRef<HTMLSelectElement, NoA11ySelectProps>(
  ({ options, label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const hasError = Boolean(errorText);

    return (
      <div className="mb-4">
        {/* htmlFor を削除（ラベルとselectの紐づけなし） */}
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <select
          {...rest}
          ref={ref}
          id={formId}
          // aria-invalid を削除
          // aria-describedby を削除
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${hasError ? "border-red-500" : "border-gray-300"} ${rest.className ?? ""}`}
        >
          <option value="">選択してください</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <NoA11yError errorText={errorText ?? ""} />
      </div>
    );
  }
);

NoA11ySelect.displayName = "NoA11ySelect";
