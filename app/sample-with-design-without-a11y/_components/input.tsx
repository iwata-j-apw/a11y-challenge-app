"use client";

import { forwardRef, useId } from "react";
import { NoA11yError } from "./error";

interface NoA11yInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  errorText?: string;
}

export const NoA11yInput = forwardRef<HTMLInputElement, NoA11yInputProps>(
  ({ label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const hasError = Boolean(errorText);

    return (
      <div className="mb-4">
        {/* htmlFor を削除（ラベルとinputの紐づけなし） */}
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input
          {...rest}
          ref={ref}
          id={formId}
          // aria-invalid を削除
          // aria-describedby を削除
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? "border-red-500" : "border-gray-300"} ${rest.className ?? ""}`}
        />
        <NoA11yError errorText={errorText ?? ""} />
      </div>
    );
  }
);

NoA11yInput.displayName = "NoA11yInput";
