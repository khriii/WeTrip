import { Plane } from "lucide-react";

const LogoTitle = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-2">
        <Plane className="text-white fill-white" size={28} />
      </div>
      <span className="text-2xl font-bold text-white tracking-tight pl-3">We
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Trip</span>
      </span>
    </div>
  );
};

export default LogoTitle;
