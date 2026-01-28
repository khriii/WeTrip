import React, { useState } from "react";
import { FaPlane, FaSearch, FaPlus } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { create as apiCreateGroup } from "../../api/group";

import Button from "../../components/Button"
import Input from "../../components/Input";
import Row from "../../components/Row";
import Card from "../../components/Card";
import Column from "../../components/Column";

const CreateJoinGroup = () => {
  const [_idGroup, setIdGroup] = useState('');

  {/* Method to handle btn click to create a new group */ }
  {/* TODO: manage handleCreateGroupClick() */ }
  const handleCreateGroupClick = async () => {
    const response = await apiCreateGroup("GroupName", "admin", "leader");
    console.log(response);
  }

  {/* Method to handle btn click to enter group */ }
  {/* TODO: manage handleEnterGroupClick() */ }
  const handleEnterGroupClick = () => {

  }


  return (
    <React.Fragment>

      <Navbar />

      <div className="bg-base-200 min-h-screen flex items-center justify-center">

        {/* Container */}
        <Column className="justify-center xs:min-w-200 -mt-24">

          {/* Plane icon */}

          <Row className="bg-blue-500 p-3 rounded-xl mb-5">
            <FaPlane className="rotate-315 ml-1 my-0.5 mr-6 text-white"
              size={50}
            />

            {/* Title and phrase */}
            <Column className="flex justify-center items-center">
              <h1 className="text-xl font-bold text-white">WeTrip</h1>
              <h2 className="text-md text-white">Pianifica ora il tuo viaggio!</h2>
            </Column>

          </Row>

          {/* Container Input */}
          <Card>

            <Column className="gap-3">

              {/* Button to create a new group */}
              <Button
                className="w-full py-7"
                variant="primary"

                iconPosition="right"
                icon={<FaPlus />}
                handleClick={handleCreateGroupClick}
              >
                Crea un Nuovo Gruppo
              </Button>



              {/* span "or" */}
              <span className="text-sm font-semibold font-thin flex justify-center">oppure</span>

              {/* Container */}
              <Row className="gap-2 w-full">

                {/* ID Group input + Enter button */}

                <Input
                  label=""
                  type="text"
                  placeholder="ID (Group)"
                  icon={<FaSearch />}
                  className="w-full"
                  onChange={(value) => {
                    setIdGroup(value);
                  }}
                />

                {/* Enter group button */}
                <Button
                  variant="primary"
                  handleClick={handleEnterGroupClick}
                >
                  Entra
                </Button>

              </Row>

            </Column>

          </Card>

        </Column>

      </div>

    </React.Fragment>
  );
}

export default CreateJoinGroup;
