"use client";

import { forwardRef, useId } from "react";
import { A11yError } from "./error";

interface Option {
  value: string | number;
  label: string;
}

interface A11ySelectProps extends React.ComponentPropsWithoutRef<"select"> {
  options: Option[];
  label?: string;
  errorText?: string;
}

export const A11ySelect = forwardRef<HTMLSelectElement, A11ySelectProps>(
  ({ options, label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const errorId = `${formId}-error`;
    const hasError = Boolean(errorText);

    return (
      <div className="mb-4">
        {label && <label htmlFor={formId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <select
          {...rest}
          ref={ref}
          id={formId}
          aria-invalid={hasError || undefined}
          aria-describedby={errorText ? errorId : undefined}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${hasError ? "border-red-500" : "border-gray-300"} ${rest.className ?? ""}`}
        >
          <option value="">選択してください</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <A11yError id={errorId} errorText={errorText ?? ""} />
      </div>
    );
  }
);

A11ySelect.displayName = "A11ySelect";
