"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { A11yDialog } from "./_components/dialog";
import { A11yButton } from "./_components/button";
import { A11yInput } from "./_components/input";
import { A11ySelect } from "./_components/select";
import { A11yCheckbox } from "./_components/checkbox";
import { A11yForm } from "./_components/form";
import { loginSchema, type LoginFormValues } from "./schema";

const languageOptions = [
  { value: "ja", label: "日本語" },
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
];

export default function Sample() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/sample-complete");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div role="banner" className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex justify-between items-center">
        <A11yButton onClick={() => setIsOpen(true)}>
          ログインダイアログを開く
        </A11yButton>
      </div>
      <div role="main" className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
      {/* <div role="contentinfo">フッターはここ</div> */}
      <A11yDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="ログイン"
      >
        <LoginForm onSubmit={handleLogin} />
      </A11yDialog>
    </div>
  );
}

const LoginForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <A11yForm onSubmit={handleSubmit(onSubmit)} ariaLabel="ログインフォーム">
      <A11yInput
        label="メールアドレス"
        type="email"
        errorText={errors.email?.message}
        {...register("email")}
      />
      <A11yInput
        label="パスワード"
        type="password"
        errorText={errors.password?.message}
        {...register("password")}
      />
      <A11ySelect
        label="言語"
        options={languageOptions}
        errorText={errors.language?.message}
        {...register("language")}
      />
      <A11yCheckbox
        label="ログイン状態を保持する"
        {...register("rememberMe")}
      />
      <A11yButton onClick={handleSubmit(onSubmit)}>
        ログイン
      </A11yButton>
    </A11yForm>
  );
}