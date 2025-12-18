"use client";

import { forwardRef, useId } from "react";
import { NoA11yError } from "./error";

interface NoA11yCheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  errorText?: string;
}

export const NoA11yCheckbox = forwardRef<HTMLInputElement, NoA11yCheckboxProps>(
  ({ label, errorText, ...rest }, ref) => {
    const autoId = useId();
    const formId = rest.id ?? autoId;
    const hasError = Boolean(errorText);

    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...rest}
            ref={ref}
            id={formId}
            // aria-invalid を削除
            // aria-describedby を削除
            className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${rest.className ?? ""}`}
          />
          {/* htmlFor を削除（ラベルとcheckboxの紐づけなし） */}
          {label && <label className="ml-2 text-sm text-gray-700">{label}</label>}
        </div>
        <NoA11yError errorText={errorText ?? ""} />
      </div>
    );
  }
);

NoA11yCheckbox.displayName = "NoA11yCheckbox";
