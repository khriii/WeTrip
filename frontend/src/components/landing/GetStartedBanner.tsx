import Button from "../ui/Button";
import Card from "../ui/Card";
import Column from "../layout/Column";

const GetStartedBanner = () => {
  return (
    <div className="w-full px-4 md:px-12 lg:px-24 xl:px-32">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-700 w-full p-20">
        <Column className="items-center justify-center items-center">
          <h1 className="text-white text-4xl font-bold">Pronto per la Tua Prossima Avventura?</h1>
          <div className="text-center">
            <p className="text-gray-200 text-lg p-5 max-w-2xl">Scopri le esperienze di viaggio uniche e indimenticabili. Pianifica il tuo prossimo viaggio con amici e crea ricordi che dureranno per sempre.</p>
          </div>
          <div className="flex flex-row gap-4 p-4">
            <Button variant="white" textSize={20} roundness={50} className="transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl active:scale-95">
              Inizia Ora
            </Button>
            <Button variant="secondary" textSize={20} roundness={50} className="transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl active:scale-95">
              Scopri di più
            </Button>
          </div>
        </Column>
      </Card>
    </div>
  );
};

export default GetStartedBanner;
