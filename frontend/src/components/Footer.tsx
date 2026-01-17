import { Link } from "react-router-dom";
import LogoTitle from "./LogoTitle";
import Row from "./Row";
import { Github, CircleQuestionMark } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full px-4 md:px-12 lg:px-24 xl:px-32 border-t border-white/10 mt-20">
      <div className="w-full px-8 py-10">

        <Row className="gap-10">
          <div>
            <Link className="" to="/">
              <LogoTitle />
            </Link>

            <div className="w-xs mt-6">
              <p className="text-gray-400 text-md mb-6 font-semibold">Il modo più semplice per organizzare viaggi di gruppo indimenticabili.</p>
            </div>


          </div>

          <div className="pl-10 flex w-full justify-evenly gap-10">
            <div>
              <h1 className="text-3xl font-bold">Navigazione</h1>
              <ul className="text-gray-400 text-md font-medium mt-4">
                <li className="mb-2 hover:text-white cursor-pointer" onClick={() => {
                  const howItWorksSection = document.getElementById('how-it-works-section');
                  if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  <span className="inline-flex gap-2 items-center">
                    <CircleQuestionMark size={20} strokeWidth={2.5} className="inline" />
                    Come Funziona
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-3xl font-bold">Autori</h1>
              <ul className="text-gray-400 text-md font-medium mt-4">
                <li className="mb-2">
                  <Link className="inline-flex gap-2 items-center group cursor-pointer" to="https://github.com/edocaruso" target="_blank">
                    <Github size={20} strokeWidth={2.5} className="group-hover:text-white" />

                    <span className="group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-blue-700 group-hover:bg-clip-text group-hover:text-transparent">
                      Caruso Edoardo
                    </span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="inline-flex gap-2 items-center group cursor-pointer" to="https://github.com/khriii" target="_blank">
                    <Github size={20} strokeWidth={2.5} className="group-hover:text-white" />
                    <span className="group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-blue-700 group-hover:bg-clip-text group-hover:text-transparent">
                      Stelluti Christian
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>



        </Row>

        <div className="w-full h-[1px] bg-white/10 my-6" />

        <p className="text-gray-500 text-md font-medium">© 2026 WeTrip. Tutti i diritti riservati.</p>

      </div>
    </footer >
  );
};

export default Footer;
