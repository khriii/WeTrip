import { useAuth } from '../../context/AuthContext';
import Button from "../ui/Button";
import { LogOut, QrCode, UsersRound, User as UserIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import LogoTitle from "../ui/LogoTitle";
import { useEffect, useState } from "react";
import { getGroupName, getGroupMembers } from '../../api/group'; 
import { checkAuth, type User } from '../../api/auth';

const Navbar = () => {
    const { groupId } = useParams();
    const [groupName, setGroupName] = useState("");
    
    const [memberCount, setMemberCount] = useState<number>(0); 
    
    const [user, setUser] = useState<User | null>(null);
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const id = Number(groupId);
            if (!id || isNaN(id)) return;

            const [name, members] = await Promise.all([
                getGroupName(id),
                getGroupMembers(id)
            ]);

            if (name) setGroupName(name);
            if (members) setMemberCount(members.length);
        };

        fetchData();
    }, [groupId]);

    // Fetch dati utente
    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                const userData = await checkAuth();
                setUser(userData);
            } else {
                setUser(null);
            }
        };
        fetchUser();
    }, [isAuthenticated]);

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <div className="navbar fixed top-0 w-full z-50 backdrop-blur-md bg-gradient-to-b from-slate-950 to-transparent border-b border-white/10">
            <div className="flex-1">
                <Button variant="ghost" handleClick={() => navigate('/landing-page')}>
                    <LogoTitle />
                </Button>
            </div>

            <div className='absolute left-1/2 -translate-x-1/2 flex justify-center'>
                {groupName && (
                    <button className='flex flex-col justify-center items-center text-white text-2xl font-bold hover:cursor-pointer px-10 hover:bg-white/10 rounded-full py-2 transition-all duration-300 border-2 border-gray-500/50'>
                        <span>{groupName}</span>
                        {/* Qui mostriamo il numero dinamico */}
                        <span className="text-xs inline-flex items-center gap-1">
                            <UsersRound size={20} /> {memberCount}
                        </span>
                    </button>
                )}
            </div>

            <div className="flex gap-4 items-center px-2">
                {/* Group Details */}
                {groupName && (
                    <Button
                        icon={<QrCode />}
                        variant="outline"
                        handleClick={() =>
                            navigate(`/group-details/${groupId}`)
                        }
                    >
                        Dettagli Gruppo
                    </Button>
                )}

                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        
                        {/* Username */}
                        {user && (
                            <Button
                                variant='outline'
                                className='h-13'
                                handleClick={() => navigate('/my-groups')}
                            >
                                <UserIcon size={16} />
                                <span className="font-medium text-sm">{user.username}</span>
                            </Button>
                        )}

                        <Button
                            variant="red"
                            handleClick={handleLogout}
                            icon={<LogOut size={20} strokeWidth={2.5} />}
                        />
                    </div>
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
        </div>
    );
};

export default Navbar;