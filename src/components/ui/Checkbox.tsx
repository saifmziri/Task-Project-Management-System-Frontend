import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
}

const Checkbox = ({ id, label, className = "", ...props }: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 text-[13.5px] text-slate-600 transition-colors hover:text-slate-900"
    >
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 cursor-pointer rounded border-slate-300 text-brass-600 transition focus:ring-2 focus:ring-brass-400 focus:ring-offset-1 ${className}`}
        {...props}
      />

      <span>{label}</span>
    </label>
  );
};

export default Checkbox;