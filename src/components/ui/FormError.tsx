import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div
      className="mb-5 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[13.5px] text-rose-700"
      role="alert"
    >
      <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-500" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
