const variantClasses: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    ghost: "btn-ghost",
};

interface ButtonProps {
    text: string;
    variant?: string;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    variant = "primary",
    className = "",
    icon,
    iconPosition = "left",
    handleClick,
}) => {

    const baseClasses = "rounded-xl flex items-center gap-2";

    const variantClass = variantClasses[variant] || "btn-primary";

    return (
        <button
            onClick={handleClick}
            className={`btn ${variantClass} ${baseClasses} ${className}`}
        >
            {icon && iconPosition === "left" && icon}
            {text}
            {icon && iconPosition === "right" && icon}
        </button>
    );
}

export default Button;
