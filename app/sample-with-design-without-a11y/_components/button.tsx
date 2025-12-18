"use client";

import { forwardRef } from "react";

// onClickプロパティは必須プロパティとして定義したいため、Omitを使用してHTMLAttributes<HTMLDivElement>からonClickを除外
interface NoA11yButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const NoA11yButton = forwardRef<HTMLDivElement, NoA11yButtonProps>(
  ({ onClick, disabled = false, children, ...rest }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      onClick();
    };

    // キーボード操作のハンドラーを削除

    return (
      <div
        {...rest}
        ref={ref}
        // role='button' を削除
        // aria-disabled を削除
        // tabIndex を削除（キーボードでフォーカスできない）
        onClick={handleClick}
        // onKeyUp, onKeyDown を削除（キーボード操作不可）
        className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${rest.className ?? ""}`}
      >
        {children}
      </div>
    );
  }
);

NoA11yButton.displayName = "NoA11yButton";
