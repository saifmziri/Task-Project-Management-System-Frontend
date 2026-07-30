import type { ButtonHTMLAttributes } from "react";

import { Spinner } from "@/components/ui";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button = ({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg
        px-4
        py-2
        font-medium
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {loading && <Spinner size={18} className="text-current" />}

      {children}
    </button>
  );
};
