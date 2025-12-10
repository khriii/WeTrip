import React, { useState } from "react";
import { FaPlane, FaSearch, FaPlus } from "react-icons/fa";

const CreateJoinGroup = () => {
  const [idGroup, setIdGroup] = useState('');

  {/* Method to handle btn click to create a new group */ }
  {/* TODO: manage handleCreateGroupClick() */}
  const handleCreateGroupClick = () => {

  }

  {/* Method to handle btn click to enter group */ }
  {/* TODO: manage handleEnterGroupClick() */}
  const handleEnterGroupClick = () => {

  }


  return (
    <React.Fragment>
      <div className="bg-base-200 min-h-screen flex items-center justify-center">
        <div className="flex justify-center p-10">


          {/* Container */}
          <div className="flex-col flex items-center justify-center gap-3 w-100 lg:w-120">

            {/* Plane icon */}
            <div className="bg-blue-500 p-3 rounded-xl">
              <FaPlane className="rotate-315 ml-1 my-0.5"
                size={50}
              />
            </div>

            {/* Title and phrase */}
            <h1 className="text-xl font-bold">WeTrip</h1>
            <h2 className="text-md">Pianifica ora il tuo viaggio!</h2>

            {/* Container Input */}
            <div className="bg-base-300 p-7 rounded-xl flex-col flex items-center justify-center gap-5 mt-5 w-full">

              {/* Button to create a new group */}
              <button
                className="w-full btn btn-primary"
                onClick={handleCreateGroupClick}
              >
                Crea un nuovo gruppo {<FaPlus />}
              </button>

              {/* span "or" */}
              <span className="text-sm font-semibold font-thin">oppure</span>

              {/* Container */}
              <div className="flex items-center w-full gap-2">

                {/* ID Group input + Enter button */}
                <label className="input input-bordered flex items-center gap-2 grow">
                  <FaSearch className="opacity-70" />
                  <input
                    onChange={(e) => {
                      setIdGroup(e.target.value);
                    }}
                    type="text"
                    className="grow"
                    placeholder="ID gruppo"
                  />
                </label>

                {/* Enter group button */}
                <button
                  className="btn btn-primary"
                  onClick={handleEnterGroupClick}
                >
                  Entra
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateJoinGroup;
