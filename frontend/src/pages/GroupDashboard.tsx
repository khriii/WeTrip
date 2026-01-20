import React from "react";
import Navbar from "../components/Navbar";
import StopCard from "../components/StopCard";

const GroupDashboard = () => {

  return (
    <React.Fragment>

      <Navbar />

      <div className="relative w-full min-h-screen overflow-x-hidden bg-slate-950">

        <div className="mt-40">
          <StopCard title="New York" description="This is a simple description sssssssssssssssssss s   s ssadasdgasdgh asf ghdfasghd faghsdf ghasdf ghasfd hgasfdhg  of New York City" price={100} imageSrc="background_login_light.jpg"/>

        </div>


      </div>

    </React.Fragment>
  );

}

export default GroupDashboard;
