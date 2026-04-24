import React, { type MouseEventHandler, type ReactNode } from "react";
type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 fint-semibold rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 whitespace-nowrap";
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:shadow-emerald-500/30",

    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline:
      "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-5 text-sm",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[baseStyles, variantStyles[variant], sizeStyles[size]].join(
        " ",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
