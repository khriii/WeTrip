import Navbar from "../../components/Navbar";
import StopCard from "../../components/StopCard";
import StopContainer from "../../components/StopsContainer";
import CitiesCard from "../../components/CitiesCard";
import City from "../../components/City";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateStopModal from "../../components/Modals/CreateStopModal";
import { useParams, useLocation } from "react-router-dom";

interface GroupState {
  groupName: string;
}

const GroupDashboard = () => {
  const { groupId } = useParams();
  const { state } = useLocation() as { state: GroupState };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    groupName = "Default Group",
  } = state || {};


  return (

    <div className="relative w-full min-h-screen overflow-x-hidden bg-slate-950">
      {/* Background */}
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
                [
                  <City name="New York" />,
                  <City name="Tokyo" />,
                  <City name="Paris" />,
                ]
              }
            />
          </div>


          <div className="w-full">

            <StopContainer>
              <StopCard
                title="New York"
                description="This is a simple description of New York City..."
                price={100}
                imageSrc="background_login_light.jpg"
              />

              <StopCard
                title="Tokyo"
                description="Exploring the vibrant streets of Tokyo..."
                price={150}
                imageSrc="background_login_light.jpg"
              />

              <StopCard
                title="Paris"
                description="Romantic getaway in the heart of France..."
                price={120}
                imageSrc="background_login_light.jpg"
              />

              <StopCard
                title="London"
                description="Visit the Big Ben and more..."
                price={130}
                imageSrc="background_login_light.jpg"
              />
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

          {/* Modal Create Stop */}

          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 backdrop-blur-sm ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <CreateStopModal
              className={`w-md z-60 transition-transform duration-300 ease-out ${isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}
              onClose={() => setIsModalOpen(false)}
            />
          </div>



        </div>

      </div>



    </div>
  );
};

export default GroupDashboard;
