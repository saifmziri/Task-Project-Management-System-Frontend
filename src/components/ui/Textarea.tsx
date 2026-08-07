import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = ({
  id,
  label,
  error,
  className = "",
  ...props
}: TextareaProps) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-[14px] font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full
          rounded-lg
          border
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-300 focus:border-navy-900 focus:ring-navy-900/5"
          }
          bg-white
          px-3.5
          py-2.5
          text-[14.5px]
          text-slate-900
          outline-none
          transition-all
          duration-150
          placeholder:text-slate-400
          focus:ring-4
          disabled:cursor-not-allowed
          disabled:bg-slate-50
          disabled:text-slate-400
          ${className}
        `}
      />

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
