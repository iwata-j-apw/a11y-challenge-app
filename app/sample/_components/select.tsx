interface Option {
  value: string | number;
  label: string;
}

interface A11ySelectProps<T extends Option> {
  options: T[];
  onChange: (value: T["value"]) => void;
}

export const Select = <T extends Option>(props: A11ySelectProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };
  return (
    <select onChange={handleChange}>
      <option value=''>選択してください</option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
