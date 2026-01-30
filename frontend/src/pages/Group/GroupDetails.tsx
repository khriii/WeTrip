import { UserRound, UsersRound } from "lucide-react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useParams, useLocation } from "react-router-dom";

interface GroupState {
  groupName: string;
  groupDescription: string;
  groupMembers: string[];
}

const GroupDetails: React.FC = () => {
  const { groupId } = useParams();
  const { state } = useLocation() as { state: GroupState };

  const {
    groupName = "Default Group",
    groupDescription = "This is a Default Description.",
    groupMembers = [],
  } = state || {};

  return (
    <div className="relative flex justify-center w-full min-h-screen overflow-x-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[0vh] left-[3vh] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-[30vh] left-[30vh] w-[300px] h-[300px] bg-emerald-600/30 rounded-full blur-[100px]" />
        <div className="absolute top-[0vh] right-[30vh] w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[50vh] right-[90vh] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <div className="m-35 w-full flex justify-center">
        <Card className="w-xl">

          {/* Group Name */}
          <div className="flex flex-col justify-center items-center w-full gap-5 mt-10 mb-10">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl transition-transform duration-300">
              <UsersRound size={40} />
            </div>
            <h1 className="font-bold text-4xl">


              {groupName}
            </h1>
          </div>


          {/* Group Description */}
          <div className="m-13">
            <h3>
              {groupDescription}
            </h3>
          </div>


          {/* Group Members */}
          <div className="flex flex-col gap-2">

            <h3>Partecipanti</h3>
            {
              groupMembers.map(member => (
                /* User */
                <div
                  key={member}
                >


                  <div className="flex flex-row gap-3 items-center p-2 hover:bg-blue-500/10 w-full font-semibold bg-gray-500/10 transition-all duration-300 rounded-full">
                    <div className="bg-blue-500 rounded-full w-10 h-10 flex justify-center items-center">
                      <UserRound />
                    </div>

                    {member}
                  </div>


                </div>

              ))
            }
          </div>

        </Card>
      </div>


    </div>
  );
}

export default GroupDetails;
