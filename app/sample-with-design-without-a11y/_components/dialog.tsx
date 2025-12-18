"use client";

import { useId, useRef } from "react";
import { NoA11yButton } from "./button";

interface NoA11yDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const NoA11yDialog = ({
  title,
  open,
  onClose,
  children,
}: NoA11yDialogProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLDivElement | null>(null);

  // フォーカス管理を削除（triggerRef, lastFocusableElementRef）
  // Escキーのハンドラーを削除
  // useEffectでのフォーカス制御を削除

  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      {/* フォーカストラップを削除 */}
      <div ref={dialogRef} className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 z-10">
        {/* role='dialog', aria-modal, aria-labelledby を削除 */}
        <NoA11yButton
          ref={closeBtnRef}
          onClick={onClose}
          // aria-label を削除
          className="absolute top-3 right-3 p-2! bg-transparent! text-gray-500! hover:text-gray-700! hover:bg-gray-100!"
        >
          ×
        </NoA11yButton>
        <div
          id={titleId}
          // role='heading', aria-level, tabIndex を削除
          className='text-xl font-bold text-gray-800 mb-4 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0'
        >
          {title}
        </div>
        {children}
      </div>
      {/* フォーカストラップを削除 */}
    </div>
  );
};
