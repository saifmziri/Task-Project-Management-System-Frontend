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
      className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
    >
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 ${className}`}
        {...props}
      />

      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
