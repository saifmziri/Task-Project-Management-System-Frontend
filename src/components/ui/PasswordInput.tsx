import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui";

import type { InputHTMLAttributes } from "react";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

const PasswordInput = ({ label, error, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      label={label}
      error={error}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};

export default PasswordInput;
