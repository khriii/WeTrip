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
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs text-gray-400 font-medium ml-1">
          {label}
        </label>
      )}

      <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 focus-within:border-blue-500/50 focus-within:bg-white/10 focus-within:shadow-lg focus-within:shadow-blue-500/10 transition-all duration-300">
        {icon && (
          <span className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none text-sm font-medium"
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;
