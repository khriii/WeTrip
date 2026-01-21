import type { ReactElement } from "react";
import CityCard from "./City";
import Card from "./Card";

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
        </div>
      </div>
    </Card>
  );
}

export default CityBar;
