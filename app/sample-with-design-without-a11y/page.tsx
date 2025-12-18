"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoA11yDialog } from "./_components/dialog";
import { NoA11yButton } from "./_components/button";
import { NoA11yInput } from "./_components/input";
import { NoA11ySelect } from "./_components/select";
import { NoA11yCheckbox } from "./_components/checkbox";
import { NoA11yForm } from "./_components/form";
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
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex justify-between items-center">
        <NoA11yButton onClick={() => setIsOpen(true)}>
          ログインダイアログを開く
        </NoA11yButton>
      </div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
      <NoA11yDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="ログイン"
      >
        <LoginForm onSubmit={handleLogin} />
      </NoA11yDialog>
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
    <NoA11yForm onSubmit={handleSubmit(onSubmit)}>
      <NoA11yInput
        label="メールアドレス"
        type="email"
        errorText={errors.email?.message}
        {...register("email")}
      />
      <NoA11yInput
        label="パスワード"
        type="password"
        errorText={errors.password?.message}
        {...register("password")}
      />
      <NoA11ySelect
        label="言語"
        options={languageOptions}
        errorText={errors.language?.message}
        {...register("language")}
      />
      <NoA11yCheckbox
        label="ログイン状態を保持する"
        {...register("rememberMe")}
      />
      <NoA11yButton onClick={handleSubmit(onSubmit)}>
        ログイン
      </NoA11yButton>
    </NoA11yForm>
  );
}
