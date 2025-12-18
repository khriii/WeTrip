import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Column from "./Column";


export interface CredentialsData {
    username?: string;
    password?: string;
}

interface CredentialsCardProps {
    btnConfirmLabel?: string;
    suggestionText?: string;
    suggestionRoute?: string;
    suggestionTextUnderlined?: string;
    onBtnConfirmClick?: (data: CredentialsData) => void;
}

const CredentialsCard = (props: CredentialsCardProps) => {
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');


    const handleSubmit = () => {
        if (props.onBtnConfirmClick) {
            props.onBtnConfirmClick({ username: localUsername, password: localPassword });
        }
    }

    return (

        <Card>

            <Column className="gap-2">

                <Input
                    label="Username"
                    type="text"
                    icon={<FaUser />}
                    placeholder="Jhon"
                    onChange={(value) => {
                        setLocalUsername(value);
                    }}
                />

                <Input
                    label="Password"
                    type="password"
                    icon={<FaLock />}
                    placeholder="Password1234!"
                    onChange={(value) => {
                        setLocalPassword(value);
                    }}
                />

                <Button
                    text={props.btnConfirmLabel || "Confirm"}
                    variant="primary"
                    className="my-4"
                    handleClick={handleSubmit}
                />


                <div className="flex justify-center text-sm">
                    {
                        props.suggestionText && props.suggestionRoute && props.suggestionTextUnderlined
                            ?
                            (
                                <span>{props.suggestionText} <Link to={props.suggestionRoute} className="text-blue-500 underline"> {props.suggestionTextUnderlined}</Link></span>
                            ) : null
                    }
                </div>

            </Column>
        </Card>
    );
}

export default CredentialsCard;
