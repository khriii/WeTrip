import { MapPin } from "lucide-react";
import Button from "./Button";

interface CityCardProps {
  name: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({
  name,
  onClick,
  isSelected = false,
}) => {
  return (
    <Button
      className="w-full text-left"
      icon={<MapPin size={20} className="text-blue-400" />}
      iconPosition="left"
      variant={isSelected ? "primary" : "ghost"}
      justify="start"
      handleClick={onClick}
    >
      <span className="text-lg text-white font-medium">{name}</span>
    </Button>
  );
}

export default CityCard;
