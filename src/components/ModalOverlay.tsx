import { ReactNode } from "react";
import "./Modal.scss";

interface ModalOverlayProps {
    children?: ReactNode
}

export default function ModalOverlay({ children }: ModalOverlayProps) {
    return (
        <div className="modal-overlay">
            {children}
        </div>
    )
}