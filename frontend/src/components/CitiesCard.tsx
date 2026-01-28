import type { ReactElement } from "react";
import CityCard from "./City";
import Card from "./Card";
import { Plus } from "lucide-react";

interface CityBarProps {
  title?: string;
  cities: ReactElement<typeof CityCard>[];
}

const CityBar: React.FC<CityBarProps> = ({
  title = "Cities",
  cities,
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
          <button 
          className="rounded-full justify-center font-semibold px-6 py-3 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-500 text-white hover:shadow-lg hover:shadow-green-500/25"
          
          onClick={() => {}}
          >
            <div className="flex flex-row gap-3">
              <Plus className="ml-[-10px]" />
              Add City
            </div>
          </button>


        </div>
      </div>
    </Card>
  );
}

export default CityBar;
