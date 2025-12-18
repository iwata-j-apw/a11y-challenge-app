interface NoA11yErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errorText: string;
}

export const NoA11yError = ({ errorText, ...rest }: NoA11yErrorProps) => {
  return (
    <div
      {...rest}
      // aria-live を削除（スクリーンリーダーへの通知なし）
      // aria-atomic を削除
      className={`text-sm text-red-600 mt-1 ${rest.className ?? ""}`}
    >
      {errorText &&
        <>
          {/* aria-hidden を削除 */}
          <span className="mr-1">❗️</span>
          エラー：{errorText}
        </>
      }
    </div>
  );
};
