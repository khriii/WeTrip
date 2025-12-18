interface ColumnProps {
    children?: React.ReactNode;
    className?: string;
}

const Column: React.FC<ColumnProps> = ({
    children,
    className = "",
}) => {

    return (
        <div className={`flex flex-col ${className}`}>
            {children}
        </div>
    );
}

export default Column;
