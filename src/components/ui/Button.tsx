import type { ButtonHTMLAttributes } from "react";

import { Spinner } from "@/components/ui";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
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
        transition-all
        duration-150
        active:scale-[0.98]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brass-400
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:active:scale-100
        ${className}
      `}
    >
      {loading && <Spinner size={18} className="text-current" />}

      {children}
    </button>
  );
};

export default Button;
