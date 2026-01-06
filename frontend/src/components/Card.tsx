interface CardProps {
    children?: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {

    const defaultStyle = "rounded-xl p-7 bg-base-300 shadow-md";

    return (
        <div
            className={`${defaultStyle} ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
