import Navbar from "../../components/layout/Navbar";
import StopCard from "../../components/features/group/StopCard";
import StopContainer from "../../components/features/group/StopsContainer";
import CitiesCard from "../../components/features/group/CitiesCard";
import City from "../../components/features/group/City";
import { Plus, UserRoundPlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CreateStopModal from "../../components/modals/CreateStopModal";
import CreateCityModal from "../../components/modals/CreateCityModal";
import { useParams, useNavigate } from "react-router-dom";
import { getGroupCities, type CityData } from "../../api/cities";
import { getCityStops, type StopData } from "../../api/stop";
import Button from "../../components/ui/Button";
import AddUserModal from "../../components/modals/AddUserModal";
import Footer from "../../components/layout/Footer";
import { checkMembership } from "../../api/group";

interface StopItem {
    title: string;
    description: string;
    price: number;
    imageSrc: string;
}

const GroupDashboard = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
    const [isCheckingAccess, setIsCheckingAccess] = useState(true);

    const [dbCities, setDbCities] = useState<CityData[]>([]);
    const [stops, setStops] = useState<StopItem[]>([]);
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

    const [buttonsBottomOffset, setButtonsBottomOffset] = useState(40);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const verifyAccess = async () => {
            if (!groupId) return;
            
            setIsCheckingAccess(true);
            const isMember = await checkMembership(Number(groupId));
            
            if (!isMember) {
                navigate('/error'); 
            } else {
                setIsCheckingAccess(false);
            }
        };

        verifyAccess();
    }, [groupId, navigate]);

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
        if (!isCheckingAccess) {
            fetchCities().then((cities) => {
                if (cities.length > 0) {
                    setSelectedCityId(cities[0].id);
                    fetchStops(cities[0].id);
                } else {
                    setStops([]);
                }
            });
        }
    }, [groupId, isCheckingAccess]);

    useEffect(() => {
        const handleScroll = () => {
            if (!footerRef.current) return;
            const footerRect = footerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (footerRect.top < windowHeight) {
                const overlap = windowHeight - footerRect.top;
                setButtonsBottomOffset(40 + overlap);
            } else {
                setButtonsBottomOffset(40);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCityClick = (cityId: number) => {
        setSelectedCityId(cityId);
        fetchStops(cityId);
    };

    const handleAddStop = (_name: string, _description: string, _price: number) => {
        window.location.reload();
    };

    const handleAddCity = (_name: string) => {
        window.location.reload();
    };

    if (isCheckingAccess) {
        return (
            <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

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
                        <div className="flex flex-col gap-5">
                            <h1 className="text-white font-bold text-3xl w-full text-left ml-5">Città</h1>
                            <CitiesCard title=""
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
                    </div>

                    <div className="flex flex-col gap-5 w-full">
                        <h1 className="text-white font-bold text-3xl w-full text-left ml-5">Tappe</h1>
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
                        <div className="h-10"></div>
                    </div>

                    <div 
                        className="fixed right-10 z-40 transition-all duration-75 ease-out"
                        style={{ bottom: `${buttonsBottomOffset}px` }}
                    >
                        <div className="flex flex-row gap-5">
                            <Button
                                variant="outline"
                                className="h-16 transition-all hover:scale-105 backdrop-blur-md"
                                handleClick={() => setIsAddPeopleModalOpen(true)}
                            >
                                <UserRoundPlus strokeWidth={3} />
                                Aggiungi Utenti
                            </Button>

                            <div
                                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 backdrop-blur-sm ${isAddPeopleModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                            >
                                <AddUserModal
                                    className={`w-md z-60 transition-transform duration-300 ease-out ${isAddPeopleModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}
                                    onClose={() => setIsAddPeopleModalOpen(false)}
                                    groupId={Number(groupId)}
                                />
                            </div>

                            <Button
                                className="h-16 transition-all hover:scale-105"
                                handleClick={() => setIsModalOpen(true)}
                            >
                                <Plus strokeWidth={3} />
                                Aggiungi Tappa
                            </Button>
                        </div>
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

            <div ref={footerRef}>
                <Footer />
            </div>
        </div>
    );
};

export default GroupDashboard;