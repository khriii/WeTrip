import { Crown, ArrowRight, Plane } from "lucide-react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getUserGroups, type UserGroup } from '../../api/group';
import { checkAuth } from "../../api/auth";
import Badge from "../../components/Badge";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const MyGroups: React.FC = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<UserGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const user = await checkAuth();
                
                if (user && user.id) {
                    const groupsResponse = await getUserGroups(user.id);
                    setGroups(groupsResponse);
                } else {
                    console.log("User not authenticated");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initData();
    }, []);

    return (
        <div className="relative flex justify-center w-full min-h-screen overflow-x-hidden bg-slate-950 text-white">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[0vh] left-[3vh] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
                <div className="absolute top-[30vh] left-[30vh] w-[300px] h-[300px] bg-emerald-600/30 rounded-full blur-[100px]" />
                <div className="absolute top-[0vh] right-[30vh] w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[100px]" />
                <div className="absolute top-[50vh] right-[90vh] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <Navbar />

            <div className="mt-32 w-full flex justify-center pb-10">
                <Card className="w-full max-w-2xl mx-4">

                    {isLoading ? (
                        <div className="flex justify-center p-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Header Section */}
                            <div className="flex flex-col justify-center items-center w-full gap-5 mt-5 mb-10">
                                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl shadow-lg shadow-emerald-500/20">
                                    <Plane size={48} className="text-white" />
                                </div>
                                <h1 className="font-bold text-4xl text-center">
                                    I tuoi Viaggi
                                </h1>
                                <Badge>
                                    Totale: {groups.length}
                                </Badge>
                            </div>

                            {/* Groups List */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-xl font-bold">Gruppi attivi</h3>
                                </div>

                                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {groups.length > 0 ? (
                                        groups.map((group) => (
                                            <div 
                                                key={group.id} 
                                                className="group cursor-pointer"
                                                onClick={() => navigate(`/group-dashboard/${group.id}`, { 
                                                    state: { groupName: group.name } 
                                                })}
                                            >
                                                <div className="flex flex-row gap-4 items-center p-4 hover:bg-white/10 w-full bg-white/5 transition-all duration-300 rounded-2xl border border-white/5 hover:border-white/20">

                                                    {/* Group Initial/Icon */}
                                                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-12 h-12 flex justify-center items-center shadow-lg shadow-blue-900/20 text-white font-bold text-lg">
                                                        {group.name.substring(0, 1).toUpperCase()}
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex flex-col flex-1">
                                                        <span className="font-semibold text-lg">{group.name}</span>
                                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                                            <span className="capitalize bg-white/10 px-2 py-0.5 rounded-md border border-white/5">
                                                                {group.role}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Admin Indicator */}
                                                    {group.role === 'admin' && (
                                                        <div className="p-2 bg-yellow-500/10 rounded-full" title="Sei Admin">
                                                            <Crown size={18} className="text-yellow-500" />
                                                        </div>
                                                    )}

                                                    {/* Arrow Icon */}
                                                    <ArrowRight size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 gap-4">
                                            <p className="text-center text-gray-400">Non fai parte di nessun gruppo.</p>
                                            <Button 
                                                handleClick={() => navigate('/create-group')}
                                                className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-900/20"
                                            >
                                                Crea un gruppo
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default MyGroups;