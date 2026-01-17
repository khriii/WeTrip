import React from "react";
import Card from "./Card";

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, icon, title, description }) => {
  return (
    <Card className="relative p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group">
      <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 flex items-center justify-center font-bold text-white text-sm bg-gradient-to-r from-blue-500 to-blue-700 rounded-full w-8 h-8 shadow-lg shadow-blue-500/20">
        {number}
      </div>

      <div className="flex items-center justify-center w-15 h-15 mx-auto bg-gradient-to-r from-blue-500/10 to-blue-700/10 rounded-3xl mb-6 mt-2 group-hover:scale-110 transition-transform duration-300">
        <div className="text-blue-500">
          {icon}
        </div>
      </div>

      <h3 className="text-4xl font-bold text-white mb-2 leading-tight">{title}</h3>
      <p className="text-md text-gray-400 leading-relaxed px-2">{description}</p>
    </Card>
  );
};

export default StepCard;
