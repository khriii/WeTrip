import { MapPinned } from "lucide-react";
import Column from "../Column";
import IconWithBackground from "../IconWithBackground";
import Modal from "../Modal";
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";

interface Props {
  onClose: () => void;
  className?: string;
}

const CreateStopModal: React.FC<Props> = ({
  onClose,
  className,
}) => {
  const [stopName, setStopName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <Modal className={className} onClose={onClose}>
      <Column>
        <h2 className="text-2xl font-bold">
          <div className="flex flex-col items-center gap-4">
            <IconWithBackground icon={<MapPinned size={40} strokeWidth={2.5} className="text-white" />} />
            Crea una Nuova Tappa
          </div>
        </h2>

        <Input
          label="Nome Tappa"
          placeholder="Colosseo"
          className="w-full mt-7 text-left"
          onChange={(e) => setStopName(e)}
        />

         <Input
          label="Descrizione"
          placeholder="Il più grande anfiteatro del mondo."
          className="w-full mt-7 text-left"
          onChange={(e) => setDescription(e)}
        />

          <Input
          label="Prezzo Stimato"
          placeholder="25"
          type="number"
          className="w-full mt-7 text-left"
          onChange={(e) => setPrice(Number(e))}
        />

        <Button
          variant="primary"
          className="w-full mt-6"
          handleClick={() => console.log("Create stop")}
        >
          Crea Tappa
        </Button>
      </Column>
    </Modal >
  );
};

export default CreateStopModal;

