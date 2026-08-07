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
  loading?: boolean;
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
  loading = false,
  onChange,
}: ComboboxProps) => {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <Select
        inputId={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        value={selectedOption}
        options={options}
        isDisabled={disabled}
        isLoading={loading}
        isSearchable
        placeholder={placeholder}
        noOptionsMessage={() => "No results found"}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        onChange={(option: SingleValue<Option>) => {
          if (option) {
            onChange(option.value);
          }
        }}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        className="text-sm"
        classNames={{
          control: (state) =>
            [
              "min-h-[46px]",
              "rounded-lg",
              "border",
              "shadow-none",
              "hover:border-navy-900",
              error
                ? "border-rose-400"
                : state.isFocused
                  ? "border-navy-900"
                  : "border-slate-300",
            ].join(" "),
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

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Combobox;
