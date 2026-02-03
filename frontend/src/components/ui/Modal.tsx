import { X } from "lucide-react";
import Card from "./Card";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  className = "",
  onClose,
}) => {
  return (
    <Card className={`z-90 pt-15 px-10 relative ${className}`}>
      <button className="absolute top-5 right-5 cursor-pointer hover:text-red-700 transition-all duration-300 hover:rotate-90"
        onClick={onClose}><X size={25} strokeWidth={2.3} />
      </button>
      {children}
    </Card>
  );
}

export default Modal;
