interface IconWithBackgroundProps {
  icon: React.ReactNode;
}

const IconWithBackground: React.FC<IconWithBackgroundProps> = ({ icon }) => {
  return (
    <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-2">
      {icon}
    </div>
  );
}

export default IconWithBackground;
