interface InputProps {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    value?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    onChange?: (value: string) => void;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    label = "",
    type = "text",
    value,
    placeholder,
    icon,
    onChange,
    className = "",
}) => {

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {
                label && (
                    <label className="text-md">
                        {label}
                    </label>
                )
            }

            <label className="input w-full flex items-center gap-2">
                {icon}
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    className={className}
                    onChange={(e) => {
                      if (onChange != null) {
                        onChange(e.target.value)
                      }
                    }}
                />
            </label>

        </div>
    );
}

export default Input;
