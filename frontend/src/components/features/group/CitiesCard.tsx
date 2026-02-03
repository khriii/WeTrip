import type { ReactElement } from "react";
import CityCard from "./City";
import Card from "../../ui/Card";
import { Plus } from "lucide-react";
import Button from "../../ui/Button";

interface CityBarProps {
  title?: string;
  cities: ReactElement<typeof CityCard>[];
  onAddCity?: () => void;
}

const CityBar: React.FC<CityBarProps> = ({
  title = "",
  cities,
  onAddCity,
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-white mb-2">
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          {cities}



          {/* Add City Button */}
          <Button
            className="h-14 transition-all duration-300 hover:scale-103"

            handleClick={onAddCity}
          >
            <div className="flex flex-row gap-3">
              <Plus className="ml-[-10px]" />
              Aggiungi Città
            </div>
          </Button>


        </div>
      </div>
    </Card>
  );
}

export default CityBar;
