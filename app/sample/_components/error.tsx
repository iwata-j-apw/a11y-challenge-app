interface A11yErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errorText: string;
}

/** idプロパティを渡して、紐づけることを推奨する */
export const A11yError = ({ errorText, ...rest }: A11yErrorProps) => {
  return (
    <div
      {...rest}
      aria-live='polite'
      aria-atomic
    >
      {errorText && 
        <>
          <div aria-hidden>❗️</div>
          エラー：{errorText}
        </>
      }
    </div>
  );
};
