"use client";

import { forwardRef } from "react";

// onClickプロパティは必須プロパティとして定義したいため、Omitを使用してHTMLAttributes<HTMLDivElement>からonClickを除外
interface A11yButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const A11yButton = forwardRef<HTMLDivElement, A11yButtonProps>(
  ({ onClick, disabled = false, children, ...rest }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      onClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter") {
        e.preventDefault();
        onClick();
      } else if (e.key === " ") {
        // スペースキーの場合はKeyUpでクリックイベントを発火させるので、ここではデフォルトの動作を防ぐだけ
        e.preventDefault();
      }
      rest.onKeyDown?.(e);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === " ") {
        onClick();
      }
      rest.onKeyUp?.(e);
    };

    return (
      <div
        {...rest}
        ref={ref}
        role='button'
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  }
);

A11yButton.displayName = "A11yButton";
