interface ButtonProps {
    text: string;
    variant?: string;
    className?: string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    variant = "primary",
    className = "",
    handleClick,
}) => {

    const baseClasses = "rounded-full";

    return (
        <button
            onClick={handleClick}
            className={`btn btn-${variant} ${baseClasses} ${className}`}
        >
            {text}
        </button>
    );
}

export default Button;
