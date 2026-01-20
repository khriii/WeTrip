import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";

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
    <Card className="w-md h-[20rem] overflow-hidden group">
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={imageSrc}
        alt={title}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-col h-full justify-end translate-y-20 transition-all duration-300 group-hover:translate-y-0">
        <Badge variant="green" className="mb-2">€ {price}</Badge>
        <h1 className="font-bold text-3xl mb-2">{title}</h1>
        <h2 className="font-medium text-gray-300 mb-6 line-clamp-2">{description}</h2>
        <Button variant="primary" className="transition-transform active:scale-102 duration-300">
          Vota questa tappa
        </Button>
      </div>
    </Card>
  );

}

export default StopCard;
