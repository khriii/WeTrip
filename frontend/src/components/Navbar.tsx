import { useAuth } from '../context/AuthContext';
import Button from "./Button";
import { LogOut, QrCode, UserRoundPlus } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import LogoTitle from "./LogoTitle";
import { useState } from "react";
import ModalPortal from './Modals/ModalPortal';
import AddUserModal from './Modals/AddUserModal';

const Navbar = () => {
    {/* TODO: Fix the group id and isInGroup */ }
    {/* I put these 2 useStates here so I can TEMPORARILY set the group */ }
    {/* It Should be managed better in the future */ }
    const [isInGroup, setIsInGroup] = useState(true);
    const [idGroup, setIdGroup] = useState("1");


    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="navbar fixed top-0 w-full z-50 backdrop-blur-md bg-gradient-to-b from-slate-950 to-transparent border-b border-white/10">
            <div className="flex-1">
                <Button variant="ghost">
                    <LogoTitle />
                </Button>
            </div>

            <div className="flex gap-4 items-center px-2">


                {/* Group Details */}
                <Button
                    icon={<QrCode />}
                    variant="ghost"
                    handleClick={() =>
                        navigate(`/group-details/${idGroup}`, {
                            state: {
                                groupName: 'Study Group',
                                groupDescription: 'Group for telecom revision',
                                groupMembers: ['Christian', 'Edoardo'],
                            },
                        })
                    }
                >
                    Group Details
                </Button>


                <Button
                    handleClick={() => {
                        setIsModalAddOpen(true);
                    }}
                >
                    <UserRoundPlus strokeWidth={3} />
                </Button>

                {isModalAddOpen && (
                    <ModalPortal>
                        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                            <AddUserModal
                                className={`w-md z-60 transition-transform duration-300 ease-out ${isModalAddOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}
                                onClose={() => setIsModalAddOpen(false)}
                            />
                        </div>
                    </ModalPortal>
                )}




                {isAuthenticated ? (
                    <Button
                        variant="red"
                        handleClick={handleLogout}
                        icon={<LogOut size={20} strokeWidth={2.5} />}
                    />

                ) : (
                    <div className="flex items-center gap-4">
                        <Button variant="secondary" handleClick={() => navigate("/login")}>
                            Accedi
                        </Button>
                        <Button variant="primary" handleClick={() => navigate("/register")}>
                            Registrati
                        </Button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Navbar;
