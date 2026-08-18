import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        w-full
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        transition-all
        duration-300
        py-3
        font-semibold
        text-white
        shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}