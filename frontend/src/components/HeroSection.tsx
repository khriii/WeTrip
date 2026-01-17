import Button from "./Button";
import { ChevronDown, Search, UsersRound } from "lucide-react";
import Input from "./Input";
import Row from "./Row";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center gap-2 mt-36">

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
        Scopri il Mondo,
      </h1>
      <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-l from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm pb-2">
        Vivi l'Avventura
      </h1>
      <div className="w-sm max-w-xl lg:w-xl md:w-xl">
        <p className="text-xl text-gray-400 p-4 leading-relaxed">
          Esperienze di viaggio uniche e indimenticabili. Pianifica il tuo prossimo viaggio con amici e crea ricordi che dureranno per sempre.
        </p>
      </div>


      {/* Title End */}
      <Row className="p-4 w-sm lg:w-xl md:w-lg items-center justify-center mt-8 gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[25px] shadow-2xl shadow-blue-500/10">

        <Input placeholder="Codice Gruppo" type="text" className="w-full" />

        {/* Search Button */}
        <Button>
          <Search size={20} strokeWidth={2.3} className="text-white" />
          <span className="hidden sm:inline">Cerca</span>
        </Button>
      </Row>

      <Button className="m-6" variant="primary" icon={<UsersRound size={18} strokeWidth={3} />}>
        Crea un Gruppo
      </Button>

      {/* Scroll Down Arrow */}
      <div className="mt-5">
        <Button variant="invisible" icon={<ChevronDown size={32} />} className="animate-bounce text-white/50" handleClick={() => {
          const howItWorksSection = document.getElementById('how-it-works-section');
          if (howItWorksSection) {
            howItWorksSection.scrollIntoView({ behavior: 'smooth' });
          }
        }} />
      </div>
    </div>
  );
};

export default HeroSection;

