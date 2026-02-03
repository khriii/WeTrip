import { UsersRound, Crown } from "lucide-react";
import Card from "../../components/ui/Card";
import Navbar from "../../components/layout/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGroupName, getGroupMembers, type GroupMember } from '../../api/group';
import Badge from "../../components/ui/Badge";

const GroupDetails: React.FC = () => {
	const { groupId } = useParams();

	const [groupName, setGroupName] = useState("");
	const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			if (!groupId) {
				console.error("Invalid Group ID");
				return;
			}

			const numGroupId = Number(groupId);
			setIsLoading(true);

			try {
				const [nameResponse, membersResponse] = await Promise.all([
					getGroupName(numGroupId),
					getGroupMembers(numGroupId)
				]);

				if (nameResponse) setGroupName(nameResponse);
				if (membersResponse) setGroupMembers(membersResponse);

			} catch (error) {
				console.error("Errore nel caricamento dati:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [groupId]);

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
							{/* Group Name Header */}
							<div className="flex flex-col justify-center items-center w-full gap-5 mt-5 mb-10">
								<div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl shadow-lg shadow-blue-500/20">
									<UsersRound size={48} className="text-white" />
								</div>
								<h1 className="font-bold text-4xl text-center">
									{groupName}
								</h1>
								<Badge>
									ID Gruppo: {groupId}
								</Badge>
							</div>



							{/* Group Members List */}
							<div className="flex flex-col gap-4">
								<div className="flex items-center justify-between px-2">
									<h3 className="text-xl font-bold">Partecipanti</h3>
									<span className="text-sm text-gray-400">{groupMembers.length} membri</span>
								</div>

								<div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
									{groupMembers.length > 0 ? (
										groupMembers.map((member) => (
											<div key={member.id} className="group">
												<div className="flex flex-row gap-4 items-center p-3 hover:bg-white/10 w-full bg-white/5 transition-all duration-300 rounded-2xl border border-white/5 hover:border-white/10">

													{/* Avatar */}
													<div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-12 h-12 flex justify-center items-center shadow-lg shadow-blue-900/20 text-white font-bold">
														{member.username.substring(0, 2).toUpperCase()}
													</div>

													{/* Info */}
													<div className="flex flex-col flex-1">
														<span className="font-semibold text-lg">{member.username}</span>
														<span className="text-xs text-gray-400 capitalize">{member.role}</span>
													</div>

													{/* Role Icon (Optional) */}
													{member.role === 'admin' && (
														<div className="p-2 bg-yellow-500/10 rounded-full mr-2" title="Admin">
															<Crown size={18} className="text-yellow-500" />
														</div>
													)}
												</div>
											</div>
										))
									) : (
										<p className="text-center text-gray-500 py-4">Nessun partecipante trovato.</p>
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

export default GroupDetails;