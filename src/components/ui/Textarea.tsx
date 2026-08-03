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
        px-3.5
        py-2.5
        text-[14.5px]
        text-slate-900
        outline-none
        transition-all
        duration-150
        placeholder:text-slate-400
        focus:border-navy-900
        focus:ring-4
        focus:ring-navy-900/5
        disabled:cursor-not-allowed
        disabled:bg-slate-50
        disabled:text-slate-400
        ${className}
      `}
    />
  );
};

export default Textarea;