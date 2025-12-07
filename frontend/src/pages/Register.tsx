import { useState } from "react";
import CredentialsInputCard, { type CredentialsData } from "../components/CredentialsInputCard";
import { register } from "../api/auth";

const Register = () => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleRegister = async (data: CredentialsData) => {

    setErrorMessage(null);

    if (!data.username || !data.password) {
      setErrorMessage("Type your username and password");
      return;
    }

    let message = null;

    const isSuccess = await register(data.username, data.password);

    if (isSuccess) {
      console.log("Register succesfull")
    } else {
      setErrorMessage("Error");
    }

    setErrorMessage(message);
  }


  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center">


      <div className="flex flex-col gap-5">

        <CredentialsInputCard
          btnConfirmLabel='Register'
          suggestionText="or"
          suggestionTextUnderlined="login here"
          suggestionRoute="/login"
          onBtnConfirmClick={handleRegister}
        />


        <div className="">
          {
            errorMessage &&
            (
              <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )

          }
        </div>


      </div>


    </div>
  );

}

export default Register;
