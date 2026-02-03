interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {

  const defaultStyle = "rounded-[25px] p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 text-white";

  return (
    <div
      className={`${defaultStyle} ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
