import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  roundness?: number;
  textSize?: number;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "invisible" | "red" | "white";
  justify?: "start" | "center" | "end" | "between";
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  roundness = 25,
  textSize = 16,
  className = "",
  icon,
  iconPosition = "left",
  variant = "primary",
  justify = "center",
  handleClick,
  disabled = false,
}) => {
  const baseLayout =
    "font-semibold px-6 py-3 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const justifyClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  }[justify];

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25",
    secondary:
      "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md shadow-lg shadow-black/5",
    outline:
      "bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    ghost:
      "bg-transparent text-white hover:bg-white/10 border border-transparent",
    invisible:
      "bg-transparent text-white",
    red:
      "border border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-500/25",
    white:
      "bg-white text-black mix-blend-screen hover:bg-gray-300",
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseLayout} ${justifyClass} ${variants[variant]} ${className}`}
      style={{
        borderRadius: `${roundness}px`,
        fontSize: `${textSize}px`
      }}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;