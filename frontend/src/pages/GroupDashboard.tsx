import React from "react";
import Navbar from "../components/Navbar";
import StopCard from "../components/StopCard";
import StopContainer from "../components/StopsContainer";

const GroupDashboard = () => {
  return (
    <React.Fragment>

      <Navbar />

      <div className="relative w-full min-h-screen bg-slate-950 pb-20">

        <div className="w-full px-6 lg:px-12 pt-35">

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

    </React.Fragment>
  );
};

export default GroupDashboard;
