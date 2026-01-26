import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";
import { MapPin } from "lucide-react";

interface StopCardProps {
  title?: string;
  description?: string;
  price?: number;
  imageSrc?: string;
}

const StopCard: React.FC<StopCardProps> = ({
  title = "Title",
  description = "description",
  price = 0,
  imageSrc,
}) => {

  return (
    <Card className="relative w-full h-[22rem] overflow-hidden group">
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        src={imageSrc}
        alt={title}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top Right Badge */}
      <div className="absolute top-0 right-0 p-6 z-20 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="bg-green-700 rounded-full">
          <Badge variant="green" className="shadow-lg text-white">
          € {price}
        </Badge>
        </div>
        
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10 translate-y-[76px] transition-transform duration-500 ease-in-out group-hover:translate-y-0">

        <div className="space-y-1 mb-6 transition-all duration-300">
          <div className="flex items-center gap-2 transform transition-transform duration-300">
            <MapPin className="text-blue-400 drop-shadow-blue-500 drop-shadow-sm" size={20} strokeWidth={2.5} />
            <h1 className="font-bold text-3xl text-white tracking-tight drop-shadow-md">{title}</h1>
          </div>

          <p className="text-slate-300 font-medium leading-relaxed line-clamp-2 pl-1">
            {description}
          </p>
        </div>

        {/* Vote Button */}
        <div className="w-full opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 delay-100">
          <Button variant="primary" className="w-full justify-center shadow-lg shadow-blue-500/20 py-3">
            Vota questa tappa
          </Button>
        </div>

      </div>
    </Card>
  );
}

export default StopCard;
