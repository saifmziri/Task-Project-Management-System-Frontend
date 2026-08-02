import type { TextareaHTMLAttributes } from "react";

const Textarea = ({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      className={`
        w-full
        rounded-lg
        border
        border-slate-300
        bg-white
        px-3
        py-2
        text-slate-900
        outline-none
        transition
        placeholder:text-slate-400
        focus:border-slate-900
        disabled:cursor-not-allowed
        disabled:bg-slate-100
        disabled:opacity-70
        ${className}
      `}
    />
  );
};

export default Textarea;
