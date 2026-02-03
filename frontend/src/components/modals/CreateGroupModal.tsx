import Modal from "../ui/Modal";
import Column from "../layout/Column";
import Input from "../ui/Input";
import { useState } from "react";
import Button from "../ui/Button";
import { UsersRound } from "lucide-react";
import IconWithBackground from "../ui/IconWithBackground";
import { create as apiCreateGroup } from "../../api/group";
import { checkAuth as apiCheckAuth } from "../../api/auth";
import { useNavigate } from 'react-router-dom';


interface CreateGroupModalProps {
  onClose: () => void;
  className?: string;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  onClose,
  className,
}) => {
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();


  // Method to handle the creation of the group
  // Accepts = groupname : string, creatorUsername : string
  // Returns = number | null
  const handleCreateGroup = async (groupName: string, creatorUsername: string): Promise<number | null> => {
    const groupId = await apiCreateGroup(groupName, creatorUsername);

    if (groupId == null) {
      // TODO: Message error
      return null;
    }

    return groupId;
  }



  return (
    <Modal className={className} onClose={onClose}>
      <Column>
        <h2 className="text-2xl font-bold">
          <div className="flex flex-col items-center gap-4">
            <IconWithBackground icon={<UsersRound size={40} strokeWidth={2.5} className="text-white" />} />
            Crea un Nuovo Gruppo
          </div>
        </h2>

        <Input
          label="Nome Gruppo"
          placeholder="Esempio: Viaggio in Giappone"
          className="w-full mt-7 text-left"
          onChange={(e) => setGroupName(e)}
        />

        <Button
          variant="primary"
          className="w-full mt-6"
          handleClick={async () => {
            const creatorUser = await apiCheckAuth();

            if (creatorUser == null) {
              return;
            }

            const creatorUsername = creatorUser.username;

            const groupId = await handleCreateGroup(groupName, creatorUsername);

            navigate(`/group-dashboard/${groupId}`)
          }}
        >
          Crea Gruppo
        </Button>
      </Column>
    </Modal >
  );
};

export default CreateGroupModal;

