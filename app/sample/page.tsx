"use client";

import { useState } from "react";
import { A11yDialog } from "./_components/dialog";
import { A11yButton } from "./_components/button";

export default function Sample() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div role='banner'></div>
      <div role='main'>
        <div tabIndex={0}>外</div>
        <A11yDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title='ダイアログ'
        >
          <div tabIndex={0}>中</div>
          <div tabIndex={0}>中</div>
          <div tabIndex={0}>中</div>
        </A11yDialog>
        <A11yButton onClick={() => setIsOpen(true)}>
          ダイアログを開く
        </A11yButton>
        <div tabIndex={0}>外</div>
      </div>
      <div role='contentinfo'></div>
    </div>
  );
}
