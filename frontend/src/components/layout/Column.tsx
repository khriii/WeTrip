interface ColumnProps {
    children?: React.ReactNode;
    className?: string;
    center?: boolean;
}

const Column: React.FC<ColumnProps> = ({
    children,
    className = "",
    center = false,
}) => {
    const centerClass = center ? "justify-center items-center" : "";

    return (
        <div className={`flex flex-col ${centerClass} ${className}`}>
            {children}
        </div>
    );
}

export default Column;
