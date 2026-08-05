import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      id,
      className = "",
      startAdornment,
      endAdornment,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {startAdornment}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`
              w-full rounded-lg border bg-white py-2.5 text-[14.5px] text-slate-900
              outline-none transition-all duration-150
              placeholder:text-slate-400
              disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400
              ${startAdornment ? "pl-10" : "pl-3.5"}
              ${endAdornment ? "pr-12" : "pr-3.5"}
              ${
                error
                  ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                  : "border-slate-300 focus:border-navy-900 focus:ring-4 focus:ring-navy-900/5"
              }
              ${className}
            `}
            {...props}
          />

          {endAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {endAdornment}
            </div>
          )}
        </div>

        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-[13px] text-rose-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
