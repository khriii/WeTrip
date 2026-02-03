import { useState } from "react";
import CredentialsCard, { type CredentialsData } from "../components/features/auth/CredentialsCard";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (data: CredentialsData) => {
    setErrorMessage(null);

    if (!data.username || !data.password) {
      setErrorMessage("Inserisci username e password");
      return;
    }

    const isSuccess = await register(data.username, data.password);

    if (isSuccess) {
      console.log("Register successful");
      navigate('/login');
    } else {
      setErrorMessage("Errore durante la registrazione");
    }
  }

  return (
    <Row className=" min-h-screen bg-slate-950">
      {/* Left Side - Image */}
      <div className="w-1/2 relative hidden lg:block">
        <img
          src="background_register_light.jpg"
          alt="Register Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Register Form */}
      <Column center className=" w-1/2 p-8 relative z-10">
        {/* Background */}
        <div className="pointer-events-none absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />


        <Column className=" w-full max-w-[450px] gap-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-white mb-2">Crea Account</h1>
            <p className="text-gray-400">Unisciti alla nostra community</p>
          </div>

          <CredentialsCard
            btnConfirmLabel='Registrati'
            suggestionText="Hai già un account?"
            suggestionTextUnderlined="Accedi qui"
            suggestionRoute="/login"
            onBtnConfirmClick={handleRegister}
          />

          {errorMessage && (
            <div role="alert" className="alert alert-error bg-red-500/10 border-red-500/20 text-red-500 rounded-xl flex items-center gap-3 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
        </Column>
      </Column>
    </Row>
  );

}

export default Register;
