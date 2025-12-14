"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { A11yButton } from "./button";

interface A11yDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const focusableSelector = [
  "[tabindex]:not([tabindex='-1'])",
  "input",
  "select",
  "textarea",
].join(",");

export const A11yDialog = ({
  title,
  open,
  onClose,
  children,
}: A11yDialogProps) => {
  const titleId = useId();
  // フォーカス管理のためのRef
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLDivElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  const handleEscKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      // 開く直前にフォーカスがあった要素を保存
      const active = document.activeElement;
      if (active instanceof HTMLElement) triggerRef.current = active;

      // タイトルにフォーカス
      titleRef.current?.focus();

      // フォーカストラップ用：最後のフォーカス可能要素を保存
      const root = dialogRef.current;
      if (root) {
        const focusableElements = Array.from(
          root.querySelectorAll<HTMLElement>(focusableSelector)
        ).filter(
          (el) =>
            !el.hasAttribute("disabled") &&
            el.getAttribute("aria-hidden") !== "true"
        );

        lastFocusableElementRef.current =
          focusableElements[focusableElements.length - 1] ?? null;
      } else {
        lastFocusableElementRef.current = null;
      }

      // Esc でダイアログを閉じることができるようにイベントリスナーを追加
      window.addEventListener("keydown", handleEscKeyDown);
      // クリーンアップ関数でイベントリスナーを削除
      return () => {
        window.removeEventListener("keydown", handleEscKeyDown);
      };
    } else {
      triggerRef.current?.focus();
      return;
    }
  }, [open, handleEscKeyDown]);

  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      {/* フォーカストラップ（閉じるボタンにフォーカスを渡す） */}
      <div
        onFocus={() => {
          lastFocusableElementRef.current?.focus();
        }}
        tabIndex={0}
      ></div>
      <div ref={dialogRef} role='dialog' aria-modal aria-labelledby={titleId} className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 z-10">
        <A11yButton
          ref={closeBtnRef}
          onClick={onClose}
          aria-label='ダイアログを閉じる'
          className="absolute top-3 right-3 p-2! bg-transparent! text-gray-500! hover:text-gray-700! hover:bg-gray-100!"
        >
          ×
        </A11yButton>
        <div
          id={titleId}
          ref={titleRef}
          role='heading'
          aria-level={2}
          tabIndex={-1}
          className='text-xl font-bold text-gray-800 mb-4 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0'
        >
          {title}
        </div>
        {children}
      </div>
      {/* フォーカストラップ（見出し要素にフォーカスを渡す） */}
      <div
        onFocus={() => {
          closeBtnRef.current?.focus();
        }}
        tabIndex={0}
      ></div>
    </div>
  );
};
