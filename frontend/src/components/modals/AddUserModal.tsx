import { Trash2, UserRoundPlus, UserPlus } from "lucide-react";
import Column from "../layout/Column";
import IconWithBackground from "../ui/IconWithBackground";
import Modal from "../ui/Modal";
import { useState } from "react";
import Button from "../ui/Button"; // Using your specific Button component
import Input from "../ui/Input";
import Row from "../layout/Row";
import { findUsers, type UserSearchResult } from "../../api/users";
import { addUser } from "../../api/group";

interface Props {
    onClose: () => void;
    className?: string;
    groupId: number; 
}

const AddUserModal: React.FC<Props> = ({
    onClose,
    className,
    groupId
}) => {
    const [username, setUsername] = useState("");
    const [usersToAdd, setUsersToAdd] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = async (e: any) => {
        const value = e.target ? e.target.value : e;
        setUsername(value);

        if (value.trim().length > 0) {
            const results = await findUsers(value);
            // Filter out users already in the "To Add" list to avoid duplicates
            const filteredResults = results.filter(u => !usersToAdd.includes(u.username));
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    const selectUser = (selectedUsername: string) => {
        setUsersToAdd((prev) => {
            if (prev.includes(selectedUsername)) return prev;
            return [...prev, selectedUsername];
        });
        setUsername("");
        setSearchResults([]);
    };

    const handleConfirmAdd = async () => {
        if (usersToAdd.length === 0) return;

        setIsLoading(true);
        
        const promises = usersToAdd.map(user => addUser(groupId, user, "default"));
        await Promise.all(promises);
        
        setIsLoading(false);
        setUsersToAdd([]);
        onClose();
    };

    return (
        <Modal className={className} onClose={onClose}>
            <Column>
                <h2 className="text-2xl font-bold">
                    <div className="flex flex-col items-center gap-4">
                        <IconWithBackground icon={<UserRoundPlus size={40} strokeWidth={2.5} className="text-white" />} />
                        Aggiungi Utenti al Gruppo
                    </div>
                </h2>

                <Row className="gap-2 relative">
                    <Input
                        label="Cerca Utente"
                        placeholder="Inizia a scrivere..."
                        className="w-full mt-7 text-left"
                        value={username} 
                        onChange={handleInputChange}
                    />

                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                        <div className="absolute left-0 top-full w-full z-20 px-1">
                            <div className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl mt-2 overflow-hidden shadow-xl max-h-40 overflow-y-auto">
                                {searchResults.map((user) => (
                                    <div 
                                        key={user.id}
                                        onClick={() => selectUser(user.username)}
                                        className="flex items-center justify-between p-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                                                {user.username.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="text-white text-sm">{user.username}</span>
                                        </div>
                                        <UserPlus size={16} className="text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Row>

                <div className="mt-4">
                    <label className="text-xs text-gray-400 font-medium ml-1">
                        Utenti da Aggiungere
                    </label>

                    <div className="flex flex-col backdrop-blur-xl rounded-xl px-3 py-3 gap-2 min-h-[100px]">
                        {usersToAdd.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center mt-2 italic">Nessun utente selezionato</p>
                        ) : (
                            usersToAdd.map((user) => (
                                <div key={user} className="flex items-center justify-between transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-lg p-2 px-3 border border-white/5">
                                    <span className="font-medium">{user}</span>
                                    <button
                                        className="flex items-center justify-center w-8 h-8 hover:bg-red-500/20 text-red-400 hover:text-red-500 transition-all duration-300 rounded-full"
                                        onClick={() =>
                                            setUsersToAdd((prev) => prev.filter((u) => u !== user))
                                        }
                                    >
                                        <Trash2 strokeWidth={1.5} size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <Button
                    variant="primary"
                    className="w-full mt-6"
                    handleClick={handleConfirmAdd}
                    disabled={isLoading || usersToAdd.length === 0}
                >
                    {isLoading ? "Aggiunta in corso..." : "Conferma Aggiunta"}
                </Button>
            </Column>
        </Modal >
    );
};

export default AddUserModal;