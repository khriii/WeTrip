import { Plane, UsersRound, Map, Calendar1 } from "lucide-react";
import Badge from "../ui/Badge";
import StepCard from "../ui/StepCard";


interface HowItWorksProps {
  badgeText?: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({
  badgeText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <Badge variant="blue">{badgeText}</Badge>

      <div className="text-center max-w-4xl mx-auto w-full">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-white">Viaggiare Non È Mai Stato</span>
          <span className="block md:inline md:pl-3 bg-gradient-to-l from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            Così Semplice
          </span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Quattro semplici passaggi per organizzare il viaggio dei vostri sogni.
        </p>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full px-4 md:px-12 lg:px-24 xl:px-32 mt-12 gap-6">
        <StepCard
          number={1}
          icon={<UsersRound size={24} strokeWidth={2.5} />}
          title="Crea un Gruppo"
          description="Unisci i tuoi amici e inizia a pianificare il tuo prossimo viaggio."
        />
        <StepCard
          number={2}
          icon={<Map size={24} strokeWidth={2.5} />}
          title="Vota le Destinazioni"
          description="Scopri le migliori destinazioni e vota le tue preferite."
        />
        <StepCard
          number={3}
          icon={<Calendar1 size={24} strokeWidth={2.5} />}
          title="Pianifica i Dettagli"
          description="Organizza le date e i dettagli per il tuo viaggio."
        />
        <StepCard
          number={4}
          icon={<Plane size={24} strokeWidth={2.5} />}
          title="Parti all'Avventura"
          description="Vivi un'esperienza unica con ricordi che dureranno per sempre."
        />
      </div>
    </div>
  );
};

export default HowItWorks;
