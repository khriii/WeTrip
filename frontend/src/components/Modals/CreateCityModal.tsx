import { MapPinned } from "lucide-react";
import Column from "../Column";
import IconWithBackground from "../IconWithBackground";
import Modal from "../Modal";
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { createCity } from "../../api/cities";
import { useParams } from "react-router-dom";

interface Props {
    onClose: () => void;
    className?: string;
    onConfirm: (name: string) => void;
}

const CreateCityModal: React.FC<Props> = ({
    onClose,
    className,
    onConfirm,
}) => {
    const { groupId } = useParams();
    const [cityName, setCityName] = useState("");

    const handleCreateCity = async () => {
        if (!groupId) {
            console.error("Group ID is missing");
            return;
        }

        const cityId = await createCity(cityName, groupId);

        if (cityId != null) {
            onConfirm(cityName);
            onClose();
        }
    };

    return (
        <Modal className={className} onClose={onClose}>
            <Column>
                <h2 className="text-2xl font-bold">
                    <div className="flex flex-col items-center gap-4">
                        <IconWithBackground icon={<MapPinned size={40} strokeWidth={2.5} className="text-white" />} />
                        Aggiungi Città
                    </div>
                </h2>

                <Input
                    label="Nome Città"
                    placeholder="New York"
                    className="w-full mt-7 text-left"
                    onChange={(e) => setCityName(e)}
                />

                <Button
                    variant="primary"
                    className="w-full mt-6"
                    handleClick={() => handleCreateCity()}
                >
                    Aggiungi Città
                </Button>
            </Column>
        </Modal >
    );
};

export default CreateCityModal;
