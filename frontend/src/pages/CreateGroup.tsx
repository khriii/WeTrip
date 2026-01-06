import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Column from "../components/Column";
import Row from "../components/Row";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');

  // TODO: createGroup()
  const createGroup = () => {
    // Call the api to create the group
    console.log("Group name:", groupName);
  };

  // TODO: searchForUser()
  const searchForUser = () => {
    // Call the api to search for a username
    console.log("Username:", username);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />

      <main className="flex-grow flex justify-center items-center p-6">
        <Card className="w-full max-w-lg shadow-2xl border border-gray-800">
          <Column className="p-8 gap-6">

            {/* Card title */}
            <h2 className="text-2xl font-bold mb-2">Crea un nuovo gruppo</h2>

            <Input
              label="Nome gruppo"
              placeholder="Esempio: Viaggio in Giappone"
              className="w-full"
              onChange={(e) => setGroupName(e)}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium ml-1">Partecipanti</label>
              <Row className="flex items-end gap-3">
                <div className="flex-grow">
                  <Input
                    placeholder="Nome utente"
                    onChange={(e) => setUsername(e)}
                  />
                </div>
                <Button
                  className="px-6 h-[42px] bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  text="Aggiungi"
                  handleClick={searchForUser}
                />
              </Row>
            </div>

            <hr className="border-gray-700 my-2" />

            <Button
              className="w-full py-4 text-lg font-semibold shadow-lg shadow-indigo-500/20"
              text="Crea Gruppo"
              handleClick={createGroup}
            />

          </Column>
        </Card>
      </main>
    </div>
  );
}

export default CreateGroup;
