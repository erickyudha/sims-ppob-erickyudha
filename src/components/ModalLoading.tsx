import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalOverlay from "./ModalOverlay";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ModalLoading() {
    return (
        <ModalOverlay>
            <FontAwesomeIcon className="spinner" icon={faSpinner} />
        </ModalOverlay>
    )
}