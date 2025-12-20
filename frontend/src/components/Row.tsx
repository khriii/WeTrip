interface RowProps {
    children?: React.ReactNode;
    className?: string;
    center?: boolean;
}

const Row: React.FC<RowProps> = ({
    children,
    className = "",
    center = false,
}) => {
    const centerClass = center ? "justify-center items-center" : "";

    return (
        <div className={`flex flex-row ${centerClass}${className}`}>
            {children}
        </div>
    );
}

export default Row;
