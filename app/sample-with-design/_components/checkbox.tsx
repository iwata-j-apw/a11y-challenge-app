"use client";

import { forwardRef, useId } from "react";
import { A11yError } from "./error";

interface A11yCheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  errorText?: string;
}

export const A11yCheckbox = forwardRef<HTMLInputElement, A11yCheckboxProps>(
  ({ label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const errorId = `${formId}-error`;
    const hasError = Boolean(errorText);

    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...rest}
            ref={ref}
            id={formId}
            aria-invalid={hasError || undefined}
            aria-describedby={errorText ? errorId : undefined}
            className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${rest.className ?? ""}`}
          />
          {label && <label htmlFor={formId} className="ml-2 text-sm text-gray-700">{label}</label>}
        </div>
        <A11yError id={errorId} errorText={errorText ?? ""} />
      </div>
    );
  }
);

A11yCheckbox.displayName = "A11yCheckbox";
