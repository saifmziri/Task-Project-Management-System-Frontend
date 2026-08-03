import Select, { type SingleValue } from "react-select";

interface Option {
  value: number | string;
  label: string;
}

interface ComboboxProps {
  id: string;
  label: string;
  value?: number | string;
  options: Option[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: number | string) => void;
}

const Combobox = ({
  id,
  label,
  value,
  options,
  placeholder = "Select...",
  error,
  disabled = false,
  onChange,
}: ComboboxProps) => {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <Select
        inputId={id}
        options={options}
        value={selectedOption}
        isDisabled={disabled}
        placeholder={placeholder}
        isSearchable
        onChange={(option: SingleValue<Option>) => {
          if (option) {
            onChange(option.value);
          }
        }}
        className="text-sm"
        classNames={{
          control: (state) =>
            `min-h-[46px] rounded-lg border ${
              error
                ? "border-rose-400"
                : state.isFocused
                  ? "border-navy-900"
                  : "border-slate-300"
            } shadow-none hover:border-navy-900`,
          valueContainer: () => "px-2",
          input: () => "text-slate-900",
          placeholder: () => "text-slate-400",
          singleValue: () => "text-slate-900",
          menu: () =>
            "mt-1 overflow-hidden rounded-lg border border-slate-200 shadow-lg",
          menuList: () => "max-h-60",
          option: (state) =>
            `cursor-pointer px-3 py-2 ${
              state.isFocused ? "bg-slate-100" : "bg-white"
            } ${
              state.isSelected ? "bg-navy-900 text-white" : "text-slate-900"
            }`,
        }}
      />

      {error && <p className="text-[13px] text-rose-600">{error}</p>}
    </div>
  );
};

export default Combobox;
