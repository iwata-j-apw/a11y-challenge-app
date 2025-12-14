"use client";

import { forwardRef } from "react";

interface A11yFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}

export const A11yForm = forwardRef<HTMLDivElement, A11yFormProps>(
  ({ onSubmit, children, ariaLabel, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        role="form"
        aria-label={ariaLabel}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.nativeEvent.isComposing &&
            (e.target instanceof HTMLInputElement ||
              e.target instanceof HTMLSelectElement)
          ) {
            onSubmit();
          }
          rest.onKeyDown?.(e);
        }}
        className={`space-y-4 ${rest.className ?? ""}`}
      >
        {children}
      </div>
    );
  }
);

A11yForm.displayName = "A11yForm";
