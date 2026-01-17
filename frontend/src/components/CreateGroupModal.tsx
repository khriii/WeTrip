import Modal from "./Modal";
import Column from "./Column";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import { UsersRound } from "lucide-react";
import IconWithBackground from "./IconWithBackground";

interface CreateGroupModalProps {
  onClose: () => void;
  className?: string;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  onClose,
  className,
}) => {
  const [groupName, setGroupName] = useState("");

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
          handleClick={() => console.log("Create group")}
        >
          Crea Gruppo
        </Button>
      </Column>
    </Modal >
  );
};

export default CreateGroupModal;

