"use client";

import { forwardRef } from "react";

interface NoA11yFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit: () => void;
  children: React.ReactNode;
}

export const NoA11yForm = forwardRef<HTMLDivElement, NoA11yFormProps>(
  ({ onSubmit, children, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        // role="form" を削除
        // aria-label を削除
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

NoA11yForm.displayName = "NoA11yForm";
