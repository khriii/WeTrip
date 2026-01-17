import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from '../context/AuthContext';
import Button from "./Button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoTitle from "./LogoTitle";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="navbar fixed top-0 w-full z-50 backdrop-blur-md bg-gradient-to-b from-slate-950 to-transparent border-b border-white/10">
      <div className="flex-1">
        <Button variant="ghost">
          <LogoTitle />
        </Button>
      </div>

      <div className="flex gap-4 items-center px-2">
        {/* Theme Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-white/10 text-white">
          <input
            type="checkbox"
            className="theme-controller"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <FaSun className="swap-off h-5 w-5 fill-current" />
          <FaMoon className="swap-on h-5 w-5 fill-current" />
        </label>

        {isAuthenticated ? (
          <Button
            variant="red"
            handleClick={handleLogout}
            icon={<LogOut size={20} strokeWidth={2.5} />}
          />

        ) : (
          <div className="flex items-center gap-4">
            <Button variant="secondary" handleClick={() => navigate("/login")}>
              Accedi
            </Button>
            <Button variant="primary" handleClick={() => navigate("/register")}>
              Registrati
            </Button>
          </div>
        )}
      </div>
    </div >
  );
};

export default Navbar;
