import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  options: Option[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, error, options, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={`
              w-full
              appearance-none
              rounded-lg
              border
              bg-white
              px-3.5
              py-2.5
              pr-10
              text-[14.5px]
              text-slate-900
              outline-none
              transition-all
              duration-150
              disabled:cursor-not-allowed
              disabled:bg-slate-50
              disabled:text-slate-400

              ${
                error
                  ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                  : "border-slate-300 focus:border-navy-900 focus:ring-4 focus:ring-navy-900/5"
              }

              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {error && <p className="text-[13px] text-rose-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;