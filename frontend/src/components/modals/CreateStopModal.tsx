import { MapPinned } from "lucide-react";
import Column from "../layout/Column";
import IconWithBackground from "../ui/IconWithBackground";
import Modal from "../ui/Modal";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { createStop } from "../../api/stop";

interface Props {
  onClose: () => void;
  className?: string;
  onConfirm: (name: string, description: string, price: number) => void;
  selectedCityId: number | null;
}

const CreateStopModal: React.FC<Props> = ({
  onClose,
  className,
  onConfirm,
  selectedCityId,
}) => {
  const [stopName, setStopName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleCreateStop = async () => {
    if (!selectedCityId) {
      console.error("No city selected");
      return;
    }
    const stopId = await createStop(stopName, description, price, selectedCityId);

    if (stopId != null) {
      onConfirm(stopName, description, price);
      onClose();
    }
  };

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
          handleClick={() => handleCreateStop()}
        >
          Crea Tappa
        </Button>
      </Column>
    </Modal >
  );
};

export default CreateStopModal;