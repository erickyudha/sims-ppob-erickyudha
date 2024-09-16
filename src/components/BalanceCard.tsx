import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BalanceCard.scss";
import { useState } from "react";

export default function BalanceCard() {
    const [balanceHidden, setBalanceHidden] = useState(true);
    const [balance, setBalance] = useState(99000);

    const formatToIDR = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    return (
        <div className="balance-card">
            <div className="subtitle white">Saldo anda</div>
            <div className="title white">Rp <span>{balanceHidden ? "●●●●●●●" : `${formatToIDR(balance)},-`}</span></div>
            <button onClick={() => setBalanceHidden(!balanceHidden)} className="hide-balance-btn subtitle white">
                <span>{balanceHidden ? "Lihat" : "Sembunyikan"} Saldo</span>
                <FontAwesomeIcon icon={balanceHidden ? faEye : faEyeSlash} />
            </button>
        </div>
    )
}