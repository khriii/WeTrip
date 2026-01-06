import { useState } from "react";
import CredentialsCard, { type CredentialsData } from "../components/CredentialsCard";
import { login as apiLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

 const handleLogin = async (data: CredentialsData) => {
  setErrorMessage(null);

  if (!data.username || !data.password) {
    setErrorMessage("Inserisci username e password");
    return;
  }

  try {
    const response = await apiLogin(data.username, data.password);

    if (response.success && response.user) {
      login(response.user);
      navigate('/', { replace: true });
    } else {
      setErrorMessage(response.error || "Username o password errati.");
    }

  } catch (error) {
    console.error(error);
    setErrorMessage("Errore di connessione al server.");
  }
};

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 min-w-md">

        <CredentialsCard
          btnConfirmLabel='Login'
          suggestionText="or"
          suggestionTextUnderlined="register here"
          suggestionRoute="/register"
          onBtnConfirmClick={handleLogin}
        />

        <div className="">
          {
            errorMessage && (
              <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}
        </div>

      </div>
    </div>
  );
}

export default Login;
