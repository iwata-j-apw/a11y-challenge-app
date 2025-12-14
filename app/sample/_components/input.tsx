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
      <div>
        {label && <label htmlFor={formId}>{label}</label>}
        <input
          {...rest}
          ref={ref}
          id={formId}
          aria-invalid={hasError || undefined}
          aria-describedby={errorText ? errorId : undefined}
        />
        <A11yError id={errorId} errorText={errorText ?? ""} />
      </div>
    );
  }
);

A11yInput.displayName = "A11yInput";
