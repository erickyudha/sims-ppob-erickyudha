import ModalOverlay from "./ModalOverlay";
import logoImg from "../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

interface ModalMessageProps {
    type: string,
    line1?: string,
    line2?: string,
    line3?: string,
    proceedText?: string,
    cancelText?: string,
    onproceed: React.MouseEventHandler<HTMLButtonElement>,
    oncancel?: React.MouseEventHandler<HTMLButtonElement>,
}

export default function ModalMessage({ type, line1 = "", line2, line3, proceedText = "Confirm", cancelText = "Cancel", onproceed, oncancel = () => {}}: ModalMessageProps) {
    return (
        <ModalOverlay>
            <div className="modal-msg">
                <div className={`modal-img ${type === "success" ? "green-bg" : "red-bg"}`}>
                    {type === "confirm" ? <img src={logoImg} alt="" /> : <FontAwesomeIcon icon={type === "success" ? faCheck : faX} />}
                </div>
                <div className="modal-text">
                    <div>{line1}</div>
                    <div className="special-line">{line2}</div>
                    <div>{line3}</div>
                </div>
                <div className="modal-buttons">
                    <button onClick={onproceed} className="proceed-btn">{proceedText}</button>
                    {type === "confirm" ? <button onClick={oncancel} className="cancel-btn">{cancelText}</button> : ""}
                </div>

            </div>
        </ModalOverlay>
    )
}