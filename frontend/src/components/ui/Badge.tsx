interface BadgeProps {
  children?: React.ReactNode;
  variant?: "blue" | "green" | "red" | "yellow" | "orange" | "purple" | "pink" | "gray" | "black";
  width?: string | number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  width,
  className = "",
}) => {
  const baseLayout =
    "glass-card border-2 font-semibold rounded-full px-4 py-2 flex items-center justify-center w-fit";

  const variants = {
    blue: "bg-blue-900/20 border-blue-700 text-blue-500",
    green: "bg-green-500 border-green-600 text-green-500",
    red: "bg-red-900/20 border-red-700 text-red-500",
    yellow: "bg-yellow-900/20 border-yellow-700 text-yellow-500",
    orange: "bg-orange-900/20 border-orange-700 text-orange-500",
    purple: "bg-purple-900/20 border-purple-700 text-purple-500",
    pink: "bg-pink-900/20 border-pink-700 text-pink-500",
    gray: "bg-gray-900/20 border-gray-700 text-gray-500",
    black: "bg-black/20 border-black text-black-500",
  };

  return (
    <div
      className={`${baseLayout} ${variants[variant]} ${className}`}
      style={{ width: width }}
    >
      {children}
    </div>
  );
};

export default Badge;
