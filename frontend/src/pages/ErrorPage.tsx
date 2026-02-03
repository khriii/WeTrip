import { AlertTriangle } from "lucide-react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-10 flex flex-col items-center max-w-md text-center backdrop-blur-md">
                <AlertTriangle className="text-red-500 mb-4" size={64} strokeWidth={1.5} />
                
                <h1 className="text-3xl font-bold text-white mb-2">Accesso Negato</h1>
                <p className="text-gray-300 mb-8">
                    Non fai parte di questo gruppo o non hai i permessi necessari per visualizzare questa pagina.
                </p>

                <Button 
                    variant="white" 
                    handleClick={() => navigate('/landing-page')} // o dove vuoi tu
                >
                    Torna alla Home
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;