"use client";

import { forwardRef, useId } from "react";
import { A11yError } from "./error";

interface A11yInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  errorText?: string;
}

export const A11yInput = forwardRef<HTMLInputElement, A11yInputProps>(
  ({ label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const errorId = `${formId}-error`;
    const hasError = Boolean(errorText);

    return (
      <div className="mb-4">
        {label && <label htmlFor={formId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input
          {...rest}
          ref={ref}
          id={formId}
          aria-invalid={hasError || undefined}
          aria-describedby={errorText ? errorId : undefined}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? "border-red-500" : "border-gray-300"} ${rest.className ?? ""}`}
        />
        <A11yError id={errorId} errorText={errorText ?? ""} />
      </div>
    );
  }
);

A11yInput.displayName = "A11yInput";
