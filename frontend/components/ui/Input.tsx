import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        w-full
        rounded-xl
        bg-black/30
        border
        border-gray-700
        px-4
        py-3
        text-white
        outline-none
        focus:border-blue-500
        transition-all
        ${className}
      `}
      {...props}
    />
  );
}