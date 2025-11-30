import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface CredentialsData {
    username?: string;
    password?: string;
}

interface CredentialsInputCardProps {
    btnConfirmLabel?: string;
    suggestionText?: string;
    suggestionRoute?: string;
    suggestionTextUnderlined?: string;
    onBtnConfirmClick?: (data: CredentialsData) => void;
}

const CredentialsInputCard = (props: CredentialsInputCardProps) => {
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');


    const handleSubmit = () => {
        if (props.onBtnConfirmClick) {
            props.onBtnConfirmClick({ username: localUsername, password: localPassword });
        }
    }

    return (

        <div className="flex justify-center bg-base-300 p-8 rounded-xl">

            <div className="flex flex-col gap-2 min-w-sm">
                <div className="flex flex-col gap-2">
                    <label>Username</label>
                    <label className="input w-full">
                        <FaUser />
                        <input
                            onChange={(e) => {
                                setLocalUsername(e.target.value);
                            }}
                            type="text" className="grow" placeholder="Jhon" />
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <label className="input w-full">
                        <FaLock />
                        <input
                            onChange={(e) => {
                                setLocalPassword(e.target.value);
                            }}
                            type="password" className="grow" placeholder="Password1234!" />
                    </label>
                </div>

                <div className="flex justify-center my-3">
                    <button className="btn btn-primary w-full"
                        onClick={handleSubmit}
                    >{props.btnConfirmLabel || "Confirm"}</button>
                </div>


                <div className="flex justify-center text-sm">
                    {
                        props.suggestionText && props.suggestionRoute && props.suggestionTextUnderlined
                            ?
                            (
                                <span>{props.suggestionText} <Link to={props.suggestionRoute} className="text-blue-500 underline"> {props.suggestionTextUnderlined}</Link></span>
                            ) : null
                    }
                </div>
            </div>

        </div>


    );
}

export default CredentialsInputCard;