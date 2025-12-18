import * as z from "zod";

// バリデーションスキーマの定義
export const loginSchema = z.object({
  email: z
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .max(100, { message: "パスワードは100文字以内で入力してください" }),
  rememberMe: z.boolean().optional(),
  language: z
    .string()
    .min(1, { message: "言語を選択してください" }),
});

// 型定義のエクスポート
export type LoginFormValues = z.infer<typeof loginSchema>;
