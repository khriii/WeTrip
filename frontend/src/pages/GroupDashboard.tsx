import Navbar from "../components/Navbar";
import StopCard from "../components/StopCard";
import StopContainer from "../components/StopsContainer";
import CitiesCard from "../components/CitiesCard";
import City from "../components/City";

const GroupDashboard = () => {
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
        </div>

      </div>



    </div>
  );
};

export default GroupDashboard;
