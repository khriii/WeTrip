import { Search, Trash2, UserRoundPlus } from "lucide-react";
import Column from "../Column";
import IconWithBackground from "../IconWithBackground";
import Modal from "../Modal";
import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Row from "../Row";

interface Props {
    onClose: () => void;
    className?: string;
}

const AddUserModal: React.FC<Props> = ({
    onClose,
    className,
}) => {
    const [username, setUsername] = useState("");
    const [usersToAdd, setUsersToAdd] = useState<string[]>([]);


    return (
        <Modal className={className} onClose={onClose}>
            <Column>
                <h2 className="text-2xl font-bold">
                    <div className="flex flex-col items-center gap-4">
                        <IconWithBackground icon={<UserRoundPlus size={40} strokeWidth={2.5} className="text-white" />} />
                        Aggiungi Utenti al Gruppo
                    </div>
                </h2>

                <Row className="gap-2">


                    <Input
                        label="Nome Utente"
                        placeholder="Jhon Pano"
                        className="w-full mt-7 text-left"
                        onChange={(e) => setUsername(e)}
                    />

                    <div className="flex flex-col justify-end">

                        <Button
                            handleClick={() => {
                                if (!username.trim()) return;

                                setUsersToAdd((prev) => {
                                    if (prev.includes(username)) return prev;
                                    return [...prev, username];
                                });

                                setUsername("");
                            }}

                            className="h-1/2" icon={<Search />}>

                        </Button>
                    </div>


                </Row>

                <div>

                    <label className="text-xs text-gray-400 font-medium ml-1">
                        Utenti da Aggiungere
                    </label>

                    <div className="flex flex-col backdrop-blur-xl rounded-xl px-3 py-3 gap-2">
                        {usersToAdd.length === 0 ? (
                            <p className="text-sm text-gray-400">Nessun utente aggiunto</p>
                        ) : (
                            usersToAdd.map((user) => (
                                <div key={user} className="flex items-center justify-between transition-all duration-300 hover:bg-gray-500/10 rounded-full p-2">
                                    <span>{user}</span>
                                    <button
                                        className="flex items-center justify-center w-12 h-8 bg-red-500/10 hover:bg-red-500 transition-all duration-300 backdrop-blur-xl rounded-full border border-red-500"
                                        onClick={() =>
                                            setUsersToAdd((prev) => prev.filter((u) => u !== user))
                                        }
                                    >
                                        <Trash2 strokeWidth={1.5} size={20} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                </div>


                <Button
                    variant="primary"
                    className="w-full mt-6"
                    handleClick={() => console.log("Create stop")}
                >
                    Aggiungi
                </Button>
            </Column>
        </Modal >
    );
};

export default AddUserModal;

