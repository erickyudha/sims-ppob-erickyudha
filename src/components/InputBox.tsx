import { faEye, faEyeSlash, faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "./InputBox.scss"

interface InputBoxProps {
    name: string,
    type: string,
    value: any,
    onchange: React.ChangeEventHandler<HTMLInputElement>,
    logo?: IconDefinition,
    placeholder?: string,
    disabled?: boolean,
}

export default function InputBox({ name, type, value, onchange, logo = faUser, placeholder, disabled = false }: InputBoxProps) {
    const [hidePass, setHidePass] = useState(true);

    return (
        <div className="input-box">
            <FontAwesomeIcon className={value ? "black" : ""} icon={logo} />
            <input placeholder={placeholder} type={hidePass ? type : "text"} name={name} id={name} value={value} onChange={onchange} disabled={disabled}/>
            <span onClick={() => setHidePass(!hidePass)} className="hide-btn" hidden={type !== "password"} >
                <FontAwesomeIcon icon={hidePass ? faEye : faEyeSlash} />
            </span>
        </div>
    )
}