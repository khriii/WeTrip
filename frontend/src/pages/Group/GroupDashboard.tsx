import Navbar from "../../components/Navbar";
import StopCard from "../../components/StopCard";
import StopContainer from "../../components/StopsContainer";
import CitiesCard from "../../components/CitiesCard";
import City from "../../components/City";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import CreateStopModal from "../../components/Modals/CreateStopModal";
import CreateCityModal from "../../components/Modals/CreateCityModal";
import { useParams, useLocation } from "react-router-dom";
import { getGroupCities, type CityData } from "../../api/cities";
import { getCityStops, type StopData } from "../../api/stop";

interface GroupState {
  groupName: string;
}

interface StopItem {
  title: string;
  description: string;
  price: number;
  imageSrc: string;
}

const GroupDashboard = () => {
  const { groupId } = useParams();
  const { state } = useLocation() as { state: GroupState };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const [dbCities, setDbCities] = useState<CityData[]>([]);
  const [stops, setStops] = useState<StopItem[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const fetchCities = async () => {
    if (groupId) {
      const cities = await getGroupCities(groupId);
      setDbCities(cities);
      return cities;
    }
    return [];
  };

  const fetchStops = async (cityId: number) => {
    const cityStops = await getCityStops(cityId);
    const mappedStops = cityStops.map((s: StopData) => ({
      title: s.name,
      description: s.description,
      price: s.price,
      imageSrc: "background_login_light.jpg"
    }));
    setStops(mappedStops);
  };

  useEffect(() => {
    fetchCities().then((cities) => {
      if (cities.length > 0) {
        setSelectedCityId(cities[0].id);
        fetchStops(cities[0].id);
      } else {
        setStops([]);
      }
    });
  }, [groupId]);

  const handleCityClick = (cityId: number) => {
    setSelectedCityId(cityId);
    fetchStops(cityId);
  };

  const {
    groupName = "Default Group",
  } = state || {};

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const handleAddStop = (_name: string, _description: string, _price: number) => {
    window.location.reload();
  };

  const handleAddCity = (_name: string) => {
    window.location.reload();
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[0vh] left-[3vh] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-[30vh] left-[30vh] w-[300px] h-[300px] bg-emerald-600/30 rounded-full blur-[100px]" />
        <div className="absolute top-[0vh] right-[30vh] w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[50vh] right-[90vh] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <div className="relative w-full min-h-screen pt-35">
        <div className="flex px-6 lg:px-12 gap-15">
          <div className="w-md sticky top-32 h-fit">
            <CitiesCard title="Cities"
              cities={
                dbCities.map((city) => (
                  <City
                    key={city.id}
                    name={city.name}
                    onClick={() => handleCityClick(city.id)}
                    isSelected={selectedCityId === city.id}
                  />
                ))
              }
              onAddCity={() => setIsCityModalOpen(true)}
            />
          </div>

          <div className="w-full">
            <StopContainer>
              {stops.map((stop, index) => (
                <StopCard
                  key={index}
                  title={stop.title}
                  description={stop.description}
                  price={stop.price}
                  imageSrc={stop.imageSrc}
                />
              ))}
            </StopContainer>
          </div>

          <div className="fixed bottom-10 right-10">
            <button
              className="rounded-full w-16 h-16 justify-center font-semibold flex justify-center items-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-500 text-white hover:shadow-lg hover:shadow-green-500/25"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <Plus strokeWidth={3} />
            </button>
          </div>

          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 backdrop-blur-sm ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <CreateStopModal
              className={`w-md z-60 transition-transform duration-300 ease-out ${isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleAddStop}
              selectedCityId={selectedCityId}
            />
          </div>

          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 backdrop-blur-sm ${isCityModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <CreateCityModal
              className={`w-md z-60 transition-transform duration-300 ease-out ${isCityModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}
              onClose={() => setIsCityModalOpen(false)}
              onConfirm={handleAddCity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;