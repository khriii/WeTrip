import { MapPin } from "lucide-react";
import Button from "./Button";

interface CityCardProps {
  name: string;
}

const CityCard: React.FC<CityCardProps> = ({
  name,
}) => {
  return (
    <Button
      className="w-full text-left"
      icon={<MapPin size={20} className="text-blue-400" />}
      iconPosition="left"
      variant="ghost"
      justify="start"
    >
      <span className="text-lg text-white font-medium">{name}</span>
    </Button>
  );
}

export default CityCard;
